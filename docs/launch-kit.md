# Launch Kit — 📕 archive + reusable copy

> **The launch ran and failed.** PH **2026-07-26 → 5 upvotes, 2 comments, no badge, no
> measurable traffic** ([launch page](https://www.producthunt.com/products/living-art-screensaver?launch=living-art-screensaver)).
> **Show HN never ran** — blocked at submission 2026-08-02 (HN reported it isn't taking new
> Show HN posts amid a flood of submissions; its published
> [rules](https://news.ycombinator.com/showhn.html) say no such thing, so read it as a
> temporary gate, and **depend on nothing here reopening**).
> Post-mortem → [strategy §4.2](growth-and-marketing-strategy.md); live plan →
> [`GROWTH-PROGRESS.md`](GROWTH-PROGRESS.md).
>
> **What survives:** the copy + media below (reusable for Reddit, directories, press, a future
> re-launch) and **§3 Reddit — never run, still worth 20 minutes.**

---

## 0. The one-line pitch (reuse everywhere)
- **"Turn your Mac's screensaver into a living gallery — centuries of art, animated by AI, refreshed every night."** (matches the live site)
- "A new piece of curated AI art on your Mac, every day — as your screensaver."
- "Aerial, but for AI-animated paintings — and it refreshes daily."

## 1. Product Hunt — ❌ ran 2026-07-26

**Retro.** PH publishes no impression data, so why it landed at 5 upvotes isn't knowable — don't
retrofit a cause. The one thing worth actually checking is **whether the launch was ever
*featured***, since an unfeatured launch is barely shown. A re-launch is allowed for a
substantially updated product (historically ~6 months apart; verify).

**Copy, preserved.** Name `Living Art Screensaver` · Topics: Mac, Design Tools, Art, Productivity ·
Tagline (≤60 chars) `Turn your Mac screensaver into a living art gallery`

Description (~260 chars):
```
Centuries of art, animated by AI and hung on your idle Mac. Living Art plays a
gallery of gently-animated classic paintings as your screensaver — and quietly adds
a fresh, curated piece every night, so you never see the same wall twice. Browse it
all free; a small subscription unlocks everything and funds the nightly art.
```

Maker's first comment — **swap in one true detail only you know** (the moment you decided to
build it, a piece that still stops you); one specific line beats any amount of polish:
```
Hi PH! 👋 I'm the maker.

I kept wishing my Mac looked as good idle as it does in use — Apple's aerial
screensavers are gorgeous but I'd seen them a hundred times. So I built the thing I
wanted: a screensaver that shows *classic art, gently animated by AI*, and quietly
adds a new curated piece every single night. You never see the same wall twice.

A few things I sweated:
• Curation over volume — a nightly pass throws out anything that looks like a
  catalog photo or has AI artifacts, so you only get gallery-worthy pieces.
• It's a real macOS ExtensionKit screensaver (Sonoma+), not a wallpaper hack —
  sandboxed, sits in System Settings next to Apple's own.
• The whole gallery is browsable free; a small subscription unlocks everything and
  funds the nightly art.

Happy to answer anything — how the nightly generation/curation pipeline works, the
ExtensionKit sandboxing, the reframing, whatever. Feedback very welcome. 🙏
```

## 2. Show HN — ❌ dropped as a plan item

Loaded, not scheduled (see the banner). If submissions reopen it gets *better* with age — you
can cite real users. Age the account and earn karma on macOS/Swift/AI threads first; **never**
use a throwaway to dodge a limit. The founder's own draft (museum/Harry-Potter origin story)
beats the copy below. HN rewards the engineering story and candor; overtly promotional Show HNs
get flagged. Reply fast and technically, admit trade-offs, never ask for upvotes.

Title: `Show HN: A Mac screensaver that generates new AI-animated art every night`
```
I built a macOS screensaver that plays classic art gently animated by AI, and
regenerates its collection every night.

The parts that were actually interesting to build:

• Nightly pipeline: a scheduled agent picks a pre-1900 style, generates a 4K still
  (Nano Banana / Gemini), then *self-reviews* it against a "vision gate" — it
  re-rolls anything that reads as a museum-catalog photo or has AI artifacts before
  spending a video generation. Then it animates the still (Veo 3.1), uploads to R2,
  and appends to a gallery manifest. The self-review step is what keeps quality up
  without a human in the loop every night.

• It's a real ExtensionKit .appex screensaver (Sonoma+), sandboxed, not a wallpaper
  daemon. The sandbox can't read arbitrary disk, so the (unsandboxed) companion app
  and the screensaver share a cache under /Users/Shared via a temporary-exception
  entitlement — the same trick Aerial uses — to avoid a TCC prompt.

• The cached video is lightly obfuscated (XOR + magic header) so files don't drag
  out of the cache and open in QuickTime — deliberate friction for a $0.99 product,
  explicitly not DRM (both binaries embed the key).

Everyone can browse the whole gallery free; a small subscription unlocks it all and
pays for the nightly generation.

Happy to go deep on any of it — the vision-gate prompt loop, ExtensionKit quirks,
the reframing, the economics of a sub-$1 app. What would you have done differently?
```

## 3. Reddit — ⏭️ **the live item (never run)**

The Day-2 slot was never used, so no sub is spent — and unlike PH/HN it's **postable today and
repeatable** across subs, with threads that rank in Google for years. **~20 minutes.** Best done
once the nightly posting automation is live, so the traffic lands on a site that keeps earning —
but don't let that block it indefinitely.

Lead with a *video*, disclose you made it, engage in comments, **one sub at a time**:
- **r/macapps** — `[App] Living Art — a Mac screensaver that adds a new AI-animated artwork every night (free tier)`. Highest fit; the free tier is the hook.
- **r/apple / r/mac** — softer "made this" show-and-tell with a clip.
- **r/battlestations, r/desksetup** — pure visual, minimal text, answer "what's that?" in comments.
- **r/AIArt** — the pipeline/curation angle.

```
I made a Mac screensaver that turns your idle display into a gallery of classic art,
gently animated by AI — and it quietly adds a new curated piece every night.

Free to download and browse the whole collection; a small subscription unlocks it
all. Not trying to spam — genuinely made this and would love feedback. Clip below 👇
```

## 4. Assets (produced 2026-07-12/15, reusable everywhere)
`marketing/out/` is gitignored build output — regenerate with
`node marketing/make-social-assets.mjs --latest 6`.

| Asset | Path |
|---|---|
| ⭐ Launch video, 37.6s 16:9 **with sound** (hero scene + real gallery audio + end-card) | `out/hero/living-art-launch-video-16x9.mp4` |
| Fullscreen art reel (no monitor chrome) · 1:1 loop · 6 stills | `out/hero/living-art-hero-{16x9,1x1}.mp4`, `still_*.png` |
| Site + app images (hero title, collection, movements, app gallery w/ email redacted) | `out/launch-images/` |
| Per-piece social clips (9:16 + 1:1 + captions) | `out/<slug>/` |

OG card verified live. **Motion first, always** — a moving wall of art beats any static shot.

## 5. UTM links (so PostHog attributes the traffic)
`https://living-art-screensaver.com/?utm_source=<src>&utm_medium=<med>&utm_campaign=<camp>` —
e.g. `reddit`/`social`/`r_macapps`, `producthunt`/`launch`/`ph`, `hackernews`/`launch`/`showhn`.

## 6. If you ever run another spike
The original sequencing, preserved: verify the download works end-to-end → line up 5–10 people
to *comment* (PH weights discussion) → post + maker's comment immediately → reply to every
comment for the first hours → watch the PostHog funnel → one channel per day, never two.
And don't run a spike as your *only* traffic source (§4.2).
