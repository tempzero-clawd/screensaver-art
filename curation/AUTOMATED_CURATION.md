# Living Art Screensaver Automated Curation

You are building a screensaver app that showcases classic and modern artworks brought to life using AI animation (Google Veo 3.1). You are working on an automated task to curate a new art collection.

Instructions below assume the git repo is the current working directory.

## Prerequisites & credentials

Secrets live in **`curation/.env`** (gitignored; template `curation/.env.example`).
Run every command that needs a secret through **`curation/with-secrets.sh`**, which
loads `curation/.env`, **verifies the named secret(s) are present**, and errors out
if any is missing — so each call names exactly what it depends on:
- **`GEMINI_API_KEY`** — the image/video skills. They're invoked as
  `bash curation/with-secrets.sh GEMINI_API_KEY -- python .claude/skills/<skill>/scripts/generate.py …`
  (see each skill's `SKILL.md`).
- **`CLOUDFLARE_API_TOKEN`** — the R2 upload (below).

If a required secret is missing, **abort** and report it rather than proceeding.

You must use the **nano-banana-pro** and **veo3-video-gen** skills. If you can't find them, abort.

## Steps to execute

1.  **Gain Context:** Read "README.md". **Also read `curation/PROMPT_GUIDANCE.md`** — it holds prompt-quality rules distilled from human curation of past bad pieces. Follow it when writing the prompts below.

2.  **Still Image Generation:**
    *   Pick a new theme/style, honouring **"Brand & taste"** and the **"Era mix"** cap in `curation/PROMPT_GUIDANCE.md`.
    *   Generate a high-quality **4K** still with the **nano-banana-pro** skill — pass **`--size 4K`** (output is WebP by default, e.g. `--out gallery/<descriptive_name>_4k.webp`). Write the image prompt per the **Hard rules** in `curation/PROMPT_GUIDANCE.md`.
    *   **Self-review the still before animating it (vision gate).** Look at the generated image and judge it honestly, checking it against the **Hard rules**. Regenerate (revising the prompt) if it breaks any of them or simply **wouldn't look good framed on a wall**. Only proceed to animation once the still is genuinely gallery-worthy. This is cheap insurance — it's far better to reroll a still than to spend a video generation on a bad image.
    *   **Once the still passes, derive the three web images from it** (ffmpeg; the 4K master
        stays as the source of truth and is uploaded too, it just isn't referenced in
        `gallery.json`). Generating at 4K and downsampling beats asking for a smaller image —
        the 4K render carries detail a 2K render never had:
        ```bash
        S=gallery/<descriptive_name>            # the stem used for every key
        # img — the piece-page hero, 2K downsample of the master
        ffmpeg -v error -y -i "${S}_4k.webp" -vf "scale=2048:-2" -quality 86 "${S}_2k.webp"
        # og_img — social cards. JPEG, not WebP: crawler WebP support is inconsistent and
        # next/og (satori) cannot rasterize WebP at all.
        ffmpeg -v error -y -i "${S}_4k.webp" \
          -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -q:v 4 "${S}_720p.jpeg"
        # thumb — the /gallery grid. 640w is the right physical size at every breakpoint
        # (50vw mobile, 20vw widest desktop); the card image would be ~3.7x the bytes.
        ffmpeg -v error -y -i "${S}_4k.webp" -vf "scale=640:-2" -quality 82 "${S}_640w.webp"
        ```

3.  **AI Animation & Upload:**
    *   Animate the still with the **veo3-video-gen** skill, feeding the 4K WebP as the first frame. Write the video prompt per the **Hard rules** in `curation/PROMPT_GUIDANCE.md`.
    *   **Motion gate — before you generate, say the clip out loud in one sentence: "<actor> <does what>."** If you can't, the prompt is not ready (see the primary-mover rule). Then **decide per-piece whether it should loop** (see the loop rule) and name the file accordingly:
        *   **Non-looping piece** — `--first-frame <still.webp>` only (no `--last-frame`, no extend). Name the video `gallery/<descriptive_name>_animated.mp4`.
        *   **Looping piece** — pass the **same** still to both `--first-frame` and `--last-frame` so the clip ends exactly where it began. Name the video `gallery/<descriptive_name>_looping.mp4`.
    *   **Upload BOTH the 4K still and the video to R2** under unique, descriptive keys — and **never overwrite an existing key** (if a key exists, pick a different name and retry). Use this helper:
        ```bash
        upload() {  # upload <local-file> <r2-key> [content-type]
          local f="$1" key="$2" ct="$3"
          if bash curation/with-secrets.sh CLOUDFLARE_API_TOKEN -- npx --yes wrangler r2 object get "screensaver-assets/$key" --file=/dev/null --remote &> /dev/null; then
            echo "Key $key already exists — choose a different name and retry."; return 1
          fi
          local ctflag=(); [ -n "$ct" ] && ctflag=(--content-type "$ct")
          # Gallery assets are immutable (keys are never overwritten), so cache them
          # hard — Cloudflare serves this 1-year immutable Cache-Control to browsers
          # on top of its default edge caching, so the marketing site won't re-fetch
          # these multi-MB clips on later visits. Costs nothing; the custom domain
          # already gives ~4h browser + edge caching without it.
          bash curation/with-secrets.sh CLOUDFLARE_API_TOKEN -- npx --yes wrangler r2 object put "screensaver-assets/$key" --file="$f" --remote --cache-control "public, max-age=31536000, immutable" "${ctflag[@]}"
        }
        upload "gallery/<descriptive_name>_4k.webp"      "gallery/<descriptive_name>_4k.webp"      "image/webp"   # master, kept but not referenced
        upload "gallery/<descriptive_name>_2k.webp"      "gallery/<descriptive_name>_2k.webp"      "image/webp"   # -> img
        upload "gallery/<descriptive_name>_720p.jpeg"    "gallery/<descriptive_name>_720p.jpeg"    "image/jpeg"   # -> og_img
        upload "gallery/<descriptive_name>_640w.webp"    "gallery/<descriptive_name>_640w.webp"    "image/webp"   # -> thumb
        upload "gallery/<descriptive_name>_animated.mp4" "gallery/<descriptive_name>_animated.mp4"   # use _looping.mp4 for a looping piece
        ```
    *   **Clean up before generating the next piece:** after a successful upload, delete the local image and video.

4.  **Update App:**
    *   Add a new entry to `gallery.json`. Use **today's date** for the new piece and **append it to the end of the array** — that keeps the entries in the file sorted by date.
    *   Format:
        ```json
        {
            "src": "https://screensaver-assets.living-art-asset.com/gallery/<video_filename>",
            "img": "https://screensaver-assets.living-art-asset.com/gallery/<name>_2k.webp",
            "og_img": "https://screensaver-assets.living-art-asset.com/gallery/<name>_720p.jpeg",
            "thumb": "https://screensaver-assets.living-art-asset.com/gallery/<name>_640w.webp",
            "title": "Title - Style (AI Animated)",
            "type": "video",
            "date": "YYYY-MM-DD",
            "tags": ["Category"],
            "image_prompt": "THE_IMAGE_PROMPT_USED",
            "video_prompt": "THE_VIDEO_PROMPT_USED",
            "looping": <true|false>
        }
        ```
    *   Set `looping` to `true` for a looping video; or `false` otherwise.
    *   **`img` / `og_img` / `thumb` are website-only** — the Electron app and screensaver never
        read them, so they are deliberately *not* part of the shared `ArtItem` type. They feed the
        gallery landing pages (`/gallery`, `/art/<slug>`, `/era/<tag>`); the 4K master is uploaded
        for future re-derivation but never referenced here. All three are **required** on new
        pieces — a missing `thumb` silently falls back to a multi-MB image on the grid.
    *   Set `tags` to **exactly one** museum "wing" from the closed list in `curation/PROMPT_GUIDANCE.md` ("Gallery tags") — it drives the Gallery filter pills, so **never invent a new tag value**.

5.  **Repeat:** Perform steps 2-4 a total of **4 times** to create 4 unique pieces. There is **no fixed loop quota** — a night of all non-looping pieces is fine.

6.  **Expand Inspiration:** If a style you picked doesn't exist in `curation/ART_STYLES_FOR_INSPIRATION.md`, append it under the section it best fits (the `##` headings are categories, not styles).

7.  **Commit and Push:**
    *   Run: `git add gallery.json curation/ART_STYLES_FOR_INSPIRATION.md && git commit -m "AUTO_CURATION: Added [Style 1, Style 2, Style 3, Style 4] collections"`
    *   Run: `git push` to sync changes to the remote. Remember your task is to curate, so don't push other stuff you generated to the repo.

