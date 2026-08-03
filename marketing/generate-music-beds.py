#!/usr/bin/env python3
"""Generate the social-clip music bed library with Google's Lyria (google-genai SDK).

Why a *library* and not a track per clip: the social clips post nightly and
forever, so per-clip generation would be a recurring API cost for something
nobody notices varying day to day. A handful of beds, rotated deterministically
by `make-social-assets.mjs`, gives the channel a consistent sonic identity for a
one-off cost. Regenerate when the mix goes stale, not on a schedule.

Beds land in `marketing/assets/beds/<slug>.mp3` (committed — they're small, and
the asset engine must not need an API key at post time).

Run through the secrets wrapper so GEMINI_API_KEY is present:

  bash curation/with-secrets.sh GEMINI_API_KEY -- \
    python3 marketing/generate-music-beds.py            # the default 4-bed set
  bash curation/with-secrets.sh GEMINI_API_KEY -- \
    python3 marketing/generate-music-beds.py --only warm-piano --force

Context: docs/growth-and-marketing-strategy.md §11.2 (why our own audio at all —
platform trending libraries are licence-restricted for commercial accounts, and
an API-posted clip can't attach a native sound anyway).
"""
import argparse
import os
import sys
import time
from pathlib import Path

from google import genai
from google.genai import errors

# Lyria 3 "clip" returns ~30s, which is plenty: the asset engine loops a bed to
# clip length (default 12s). The Pro model exists but buys us nothing for a
# quiet background bed that gets ducked under nobody's attention.
MODEL = "models/lyria-3-clip-preview"

# The house style, applied to every bed: the art is the point, so the music has
# to stay *under* it. Percussion and vocals both pull focus and date a clip.
HOUSE = (
    "Instrumental only, no vocals, no drums or percussion. Slow, calm and warm. "
    "Even dynamics with no build, drop, or dramatic swell — this plays under "
    "visual art as background ambience and must never pull focus. "
    "Clean gentle ending."
)

BEDS = {
    "warm-piano": "Sparse, tender solo piano with soft room reverb; a few sustained warm strings underneath.",
    "airy-strings": "Airy sustained string pad, gentle and spacious, like a slow exhale; distant soft harp touches.",
    "soft-synth": "Warm analog synth pad, slowly evolving, hazy and nostalgic; subtle bell tones far back in the mix.",
    "quiet-guitar": "Fingerpicked nylon guitar, unhurried and intimate, with a soft ambient wash behind it.",
}

OUT_DIR = Path(__file__).resolve().parent / "assets" / "beds"


def with_retry(fn, attempts=4, base=15):
    """Retry transient API errors (429/5xx demand spikes) with exponential backoff."""
    for i in range(attempts):
        try:
            return fn()
        except errors.APIError as e:
            code = getattr(e, "code", None)
            retryable = code in (429, 500, 502, 503, 504)
            if not retryable or i == attempts - 1:
                raise
            wait = base * (2**i)
            print(f"  … {code}, retrying in {wait}s", file=sys.stderr)
            time.sleep(wait)


def generate(client, slug, prompt, out_path):
    resp = with_retry(
        lambda: client.models.generate_content(
            model=MODEL, contents=f"{prompt} {HOUSE}"
        )
    )
    for part in resp.candidates[0].content.parts:
        blob = getattr(part, "inline_data", None)
        if blob and (blob.mime_type or "").startswith("audio/"):
            out_path.write_bytes(blob.data)
            return len(blob.data)
    raise RuntimeError(f"{slug}: no audio in response (parts: {resp.candidates[0].content.parts})")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", action="append", choices=sorted(BEDS), help="generate just this bed (repeatable)")
    ap.add_argument("--force", action="store_true", help="regenerate beds that already exist")
    ap.add_argument("--out", type=Path, default=OUT_DIR, help=f"output dir (default: {OUT_DIR})")
    args = ap.parse_args()

    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        sys.exit("GEMINI_API_KEY missing — run via: bash curation/with-secrets.sh GEMINI_API_KEY -- python3 …")

    args.out.mkdir(parents=True, exist_ok=True)
    client = genai.Client(api_key=key)
    wanted = args.only or sorted(BEDS)

    for slug in wanted:
        dest = args.out / f"{slug}.mp3"
        if dest.exists() and not args.force:
            print(f"✓ {slug} — exists, skipping (--force to regenerate)")
            continue
        print(f"♪ {slug} …")
        size = generate(client, slug, BEDS[slug], dest)
        print(f"✓ {slug} → {dest} ({size // 1024} KB)")

    print(f"\nBeds in {args.out}. The asset engine picks one per clip: "
          f"node marketing/make-social-assets.mjs --latest 4")


if __name__ == "__main__":
    main()
