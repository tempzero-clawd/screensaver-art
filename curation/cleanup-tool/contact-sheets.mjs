// Living Art Screensaver — build labeled contact sheets of flagged pieces
//
// Extracts the first frame of every flagged piece — both "undesirable" (what to
// avoid) and "great" / want-more (what to make more of) — and tiles them into
// labeled contact sheets, so Claude can review dozens of frames in a handful of
// images (vision can't take dozens of stills one at a time). Pure ffmpeg — no deps.
//
//   node curation/cleanup-tool/contact-sheets.mjs
//
// Outputs under curation/cleanup-tool/.analysis/:
//   frames/<reason>/NNN.png    one labeled FULL-RESOLUTION frame per flagged piece
//                              — read these when a note turns on fine detail
//   sheets/<reason>_NN.png     frames tiled 2x2 (4 per sheet), index burned in
//                              — the overview; see the TILE_W note on why 2 cols
//   index.json                 { undesirable:[…], great:[…] } -> {n, sheet, src, title, note, prompts}
//   index.md                   same mapping, human/Claude-readable, grouped by reason

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const GALLERY = join(ROOT, 'gallery.json');
const SELECTIONS = join(HERE, 'selections.json');
const LAST_REMOVED = join(HERE, 'last-removed.json');
const LAST_LOVED = join(HERE, 'last-loved.json');
const OUT = join(HERE, '.analysis');
const FRAMES = join(OUT, 'frames');
const SHEETS = join(OUT, 'sheets');

// Sheet tiles. Vision downsamples any image to ~1568px on its long edge, so a
// tile's *effective* resolution is 1568/COLS regardless of what we render here —
// rendering 1280px tiles would just double the file for no extra detail. Keeping
// the sheet ~1568 wide at 2 columns is therefore the most detail a grid can carry
// (~768px/tile). At the old 4x4 @ 480 tiles arrived ~390px, far too coarse to
// check a note like "too much dirt / cracks on the faces".
// For real detail, read frames/<reason>/NNN.png (full-res) instead of the sheet.
const TILE_W = 768, TILE_H = 432;     // 16:9 tile
const COLS = 2, ROWS = 2;             // 4 frames per sheet
// Full-resolution frames are written alongside the sheets (frames/<reason>/NNN.png)
// at the video's native size, capped here. The sheet is the overview; when a
// reviewer note turns on fine detail, read the full-res frame instead.
const FRAME_MAX_W = 1920;
const CONCURRENCY = 6;
const FONT = [
  '/System/Library/Fonts/Supplemental/Arial.ttf',
  '/Library/Fonts/Arial.ttf',
].find(existsSync);

const norm = (r) => (r === 'ugly' ? 'undesirable' : r);

// The two flag kinds we build sheets for, with their markdown section headings.
const REASONS = ['undesirable', 'great'];
const SECTION = {
  undesirable: '## ✕ Undesirable (what to avoid)',
  great: '## ★ Great — want more (what to make more of)',
};

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => { err += d; });
    p.on('close', (code) => code === 0 ? resolve() : reject(new Error(err.slice(-500))));
  });
}

async function pool(items, n, fn) {
  const results = [];
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx).then(() => true).catch((e) => { console.warn(`  frame ${idx} failed: ${e.message}`); return false; });
    }
  }));
  return results;
}

// --- gather flagged pieces by reason (join selections -> item records for prompts) ---
if (!existsSync(SELECTIONS)) { console.error('No curation/cleanup-tool/selections.json. Run the tool first.'); process.exit(1); }
const sel = JSON.parse(await readFile(SELECTIONS, 'utf8'));

// Prompt lookup. This normally runs *after* apply.mjs, which has already deleted
// the undesirable pieces from gallery.json — so looking them up there yields
// nothing, blanking the prompts for exactly the pieces we most need to analyse.
// apply.mjs's records keep the full items (prompts + note), so read those first
// and fall back to the live gallery (covers a standalone run before apply).
const readItems = async (path) =>
  existsSync(path) ? (JSON.parse(await readFile(path, 'utf8')).items || []) : [];

const bySrc = new Map(
  [
    JSON.parse(await readFile(GALLERY, 'utf8')),
    await readItems(LAST_LOVED),
    await readItems(LAST_REMOVED),
  ].flat().map((g) => [g.src, g]),
);

const buckets = {};
for (const reason of REASONS) {
  buckets[reason] = (sel.flagged || [])
    .filter((f) => norm(f.reason) === reason)
    .map((f) => {
      const g = bySrc.get(f.src) || {};
      return { src: f.src, title: g.title || f.title || '', note: f.note || '', image_prompt: g.image_prompt || '', video_prompt: g.video_prompt || '' };
    });
}

const total = REASONS.reduce((n, r) => n + buckets[r].length, 0);
if (!total) { console.log('No flagged pieces. Nothing to do.'); process.exit(0); }

// --- fresh output dirs ---
await rm(OUT, { recursive: true, force: true });
await mkdir(SHEETS, { recursive: true });

const pad = (n) => String(n).padStart(3, '0');
const drawtext = (label, fontsize = '34') => {
  const base = `text='${label}':x=8:y=6:fontsize=${fontsize}:fontcolor=yellow:box=1:boxcolor=black@0.65:boxborderw=8`;
  return FONT ? `drawtext=fontfile='${FONT}':${base}` : `drawtext=${base}`;
};

// Extract + label the first frame of each piece, tile into sheets prefixed by reason.
async function buildBucket(reason, pieces) {
  if (!pieces.length) return [];
  console.log(`Building contact sheets for ${pieces.length} ${reason} piece(s)…`);
  const framesDir = join(FRAMES, reason);
  await mkdir(framesDir, { recursive: true });

  const tilesDir = join(OUT, '.tiles', reason);
  await mkdir(tilesDir, { recursive: true });

  const ok = await pool(pieces, CONCURRENCY, async (p, idx) => {
    // 1. Full-resolution frame, for reading a single piece up close. Labelled at a
    //    size relative to the frame so it stays unobtrusive at native resolution.
    const fullVf = [
      `scale='min(${FRAME_MAX_W},iw)':-2`,
      drawtext(idx, 'h/28'),
    ].join(',');
    // -frames:v 1 from the start: ffmpeg reads only enough of the remote stream to
    // decode the first frame, so this does not download the whole MP4.
    await run('ffmpeg', ['-y', '-i', p.src, '-frames:v', '1', '-vf', fullVf, join(framesDir, `${pad(idx)}.png`)]);

    // 2. Downscaled tile for the contact sheet, labelled after the downscale so the
    //    index stays readable in the grid.
    const tileVf = [
      `scale=${TILE_W}:${TILE_H}:force_original_aspect_ratio=decrease`,
      `pad=${TILE_W}:${TILE_H}:(ow-iw)/2:(oh-ih)/2:color=black`,
      drawtext(idx, '34'),
    ].join(',');
    await run('ffmpeg', ['-y', '-i', join(framesDir, `${pad(idx)}.png`), '-vf', tileVf, join(tilesDir, `${pad(idx)}.png`)]);
  });
  console.log(`  ${reason}: extracted ${ok.filter(Boolean).length}/${pieces.length} frames.`);

  // The tile filter packs consecutive input frames into a grid and emits one image
  // per full grid; trailing cells on the last sheet are filled with the pad color.
  // ffmpeg's image2 muxer numbers sheets from 01, so +1 below to match <reason>_NN.png.
  await run('ffmpeg', [
    '-y', '-framerate', '1', '-start_number', '0', '-i', join(tilesDir, '%03d.png'),
    '-vf', `tile=${COLS}x${ROWS}:padding=10:margin=10:color=0x1d2029`,
    join(SHEETS, `${reason}_%02d.png`),
  ]);

  return pieces.map((p, n) => ({ n, sheet: Math.floor(n / (COLS * ROWS)) + 1, ...p }));
}

const index = {};
for (const reason of REASONS) index[reason] = await buildBucket(reason, buckets[reason]);

// --- mapping files ---
await writeFile(join(OUT, 'index.json'), JSON.stringify({ generatedAt: new Date().toISOString(), tiling: `${COLS}x${ROWS}`, ...index }, null, 2) + '\n');

const md = ['# Flagged pieces — contact-sheet index', '',
  `Tiles are numbered (burned into each frame). ${COLS}×${ROWS} per sheet. Sheet files are prefixed by reason (e.g. \`undesirable_01.png\`, \`great_01.png\`).`, ''];
for (const reason of REASONS) {
  if (!index[reason].length) continue;
  md.push(SECTION[reason], '');
  for (const p of index[reason]) {
    md.push(`### ${p.n} — ${p.title || '(untitled)'}  _(${reason}_${String(p.sheet).padStart(2, '0')}.png)_`);
    if (p.note) md.push(`- **reviewer note: ${p.note}**`);
    md.push(`- image_prompt: ${p.image_prompt || '(none)'}`);
    md.push(`- video_prompt: ${p.video_prompt || '(none)'}`);
    md.push('');
  }
}
await writeFile(join(OUT, 'index.md'), md.join('\n'));

console.log(`\nSheets:  curation/cleanup-tool/.analysis/sheets/  (undesirable_*.png, great_*.png)`);
console.log(`Index:   curation/cleanup-tool/.analysis/index.json  +  index.md`);
