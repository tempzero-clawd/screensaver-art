# Growth & Marketing — Progress Hub  ⟵ START HERE

**Canonical, shared status for the growth/marketing initiative.** Multiple agents
work this repo *without shared chat context* — this committed file is how they
coordinate. One agent commits it → every other agent sees it. **If you touch
growth work, read this first and update it in the same PR.**

This hub holds the **state**. The **reasoning** lives in
[`growth-and-marketing-strategy.md`](growth-and-marketing-strategy.md) — don't
duplicate its arguments here; link to a section (e.g. "§10") instead.

---

## How agents use this file (protocol)

1. **Read first.** This file + the Doc map below, before starting any growth work.
2. **Claim before you start.** Add a row to **In progress** with your task, branch/PR,
   and date — so another agent doesn't double-work it.
3. **Log when you finish.** Update the **Status** table (→ ✅) and add a one-line dated
   entry to the **Activity log**. **Commit this file in the same PR as the work.**
4. **Keep it terse and current.** This is a dashboard, not prose. An out-of-date hub is
   worse than none — update it even for partial progress.
5. **Don't relitigate settled calls.** See **Decisions** below + the strategy doc's
   reasoning. If you disagree, raise it with the founder, don't silently reverse it.
6. **Conflicts:** if two agents edit this file, resolve via git; the **Activity log** is
   append-only (newest on top) so merges are cheap.

## Doc map (read in this order)
| Doc | What it's for |
|---|---|
| `CLAUDE.md` | Product + repo overview (every agent reads this first anyway) |
| **`docs/GROWTH-PROGRESS.md`** (this file) | **Live state + backlog + protocol** — the hub |
| `docs/growth-and-marketing-strategy.md` | The strategy + *why* (reasoning, not state) |
| `docs/launch-kit.md` | 📕 **Archive** — the launch ran and failed (§4.2). Copy/media still reusable; **§3 Reddit is the one live item** |
| `marketing/README.md` | The social asset engine (`marketing/make-social-assets.mjs`) |

---

## The current bet (read this before picking anything up)

**The launch spikes are over and they did not work** (PH: 5 upvotes; Show HN: blocked —
details in the table). That was one channel that *requires an audience you already have*.
We don't have one. So the plan pivots to the channels that **compound** or **run
unattended**, because of a hard new constraint:

> ⚠️ **Founder time budget for marketing execution ≈ 0 h/week** (stated 2026-08-02).
> **Anything that needs a recurring human chore will not happen.** Rank the backlog by
> "runs itself once built" and "built once, pays forever" — not by theoretical upside.

Practical rule for agents: prefer work you can *finish* (a script, a page, a sitemap, a
prepared submission list) over work that hands the founder a habit. Where a founder action
is genuinely unavoidable (creating an account, sending a pitch from their own name), make it
a **single, batched, ≤30-minute task** and say so explicitly.

## Status (canonical)
Legend: ✅ live · 🔨 built, not yet used · ⏭️ next · 🅿️ parked (needs a decision/data) · ❌ tried/dead

| Initiative | Status | Where it lives / notes |
|---|---|---|
| PostHog analytics (web + Electron) | ✅ live | events + funnels; strategy §3 |
| Open Graph / Twitter social cards | ✅ live | `living-art-screensaver-web/app/opengraph-image.tsx`; §5 |
| Mobile "email me the Mac link" | ✅ live | `components/marketing/download-cta.tsx`; §5–6 |
| Cross-platform **demand probe** (self-report) | ✅ live | `components/marketing/platform-interest.tsx` — **PostHog-only, no backend**; superseded the old "detect Windows + waitlist" idea (§5/§8) |
| Marketing **asset engine** (16:9 → 9:16/1:1 + captions) | ✅ run | `marketing/make-social-assets.mjs`; **run 2026-07-12** on newest 6 → `marketing/out/<slug>/` (12 clips + captions). **Still never posted anywhere.** §11 (A) |
| **Hero demo clip** + PH media | ✅ produced | `marketing/out/{hero,launch-images}/` — launch video (37.6s, with sound), fullscreen reel, 1:1 loop, stills, site/app screenshots. Reusable for every other channel. |
| **Launch kit** (Product Hunt / Show HN / Reddit) | ✅ finalized | `docs/launch-kit.md` — now a **reference/archive**, not a plan (§4.2). |
| **Product Hunt launch** | ❌ **ran 2026-07-26 — flopped** | **5 upvotes, 2 comments, no badge, no measurable traffic.** Post-mortem + what it does/doesn't prove → strategy **§4.2**. Not re-runnable for months. |
| **Show HN** | ❌ **dropped as a plan item** | Founder was blocked from submitting (2026-08-02) — HN said it isn't taking new Show HN posts amid a flood of submissions. HN's published `showhn.html` carries no such notice, so it reads as a temporary/volume gate, not policy. Copy stays in `launch-kit.md` §2; **run opportunistically if it reopens — nothing may depend on it.** |
| Reddit (r/macapps, r/battlestations, r/AIArt) | ⏭️ **never run** | The Day-2 slot was never used. Still the highest-fit *free* channel and the only remaining item worth a founder's 20 minutes (`launch-kit.md` §3). |
| **Daily social posting + aggregator** | ⏭️ **#1 — vendors chosen 2026-08-02** | §4.1 + §11 (B) — **upload-post** (IG + YT) + **Zernio** (TikTok + Pinterest), both start free. Glue script not yet written. **Best fit for the 0 h/week constraint: build once, posts nightly forever.** |
| Brand-name / on-page SEO basics | ✅ live | Shipped 2026-07-17 (PRs #68, #69): Mac-screensaver keyword title, shared meta description, JSON-LD `SoftwareApplication`. |
| **SEO landing + programmatic gallery pages** | ⏭️ **#2** | §4.3 — the sitemap has **3 URLs** while `gallery.json` holds **262 pieces** (poster + video + prompt each, ~4 added nightly). Comparison/alternative pages + a crawlable, self-growing gallery corpus. |
| **Directory + listing submissions** | ⏭️ **#3** | §4.4 — alternativeto.net, MacUpdate, indie/app directories. One-time, permanent backlinks; agent preps, founder submits in one batch. |
| **Press + creator outreach** ("borrow audiences") | ⏭️ **#4** | §4.1/§4.4 — the single highest-leverage *non-automatable* play; agent builds target list + press kit + drafts, founder sends. |
| "Art of the week" email / newsletter | 🅿️ needs a send-path call | §4.6 — and it's a recurring chore unless the send is automated off the nightly job. |
| Option B ecosystem art packs | 🅿️ later | Appendix A (Wallpaper Engine Workshop / Lively) — one-time publish into a 20–50M-user surface; revisit after #1–#3. |
| Retention / lifecycle email | 🅿️ later | §9 — needs users first. |
| **Pricing: lifetime tier** | ✅ **shipped 2026-07-18** | $15.99 one-time "Own it forever" alongside $0.99/mo-billed-quarterly (PR #70). Resolves half of §10 — **annual is still untested**, and with ~0 traffic there is no conversion data either way. |
| Referral / shareable export | 🅿️ later | §12 |
| Windows / Mac App Store build | 🅿️ pending demand-probe data | §8, §4.7 |
| Paid ads | 🅿️ not now | §13 — only after a proven funnel |

**One-liner:** the conversion + analytics foundation is live and the pricing question is
half-answered, but **the site still has ~zero traffic and therefore zero conversion data**.
The launch bet failed because launch platforms *amplify* an audience rather than create one.
**Next: automated daily posting → compounding SEO → directories → borrowed audiences.**

## In progress (claim here before starting)
| Task | Agent / branch / PR | Started | Notes |
|---|---|---|---|
| Post-launch pivot: docs re-baselined (PH post-mortem, re-prioritized backlog) | `claude/living-art-marketing-pivot-1f6f24` | 2026-08-02 | Docs only — **clear this row on merge.** |

## Next up (prioritized backlog)
Ordered for **0 h/week of founder time**: build-once-runs-forever first, one-time assets
second, and the irreducible human tasks batched last.

1. **Wire the posting automation** (§11 B) — the asset engine already produces the clips;
   nothing has ever been posted. Glue `marketing/make-social-assets.mjs` → **upload-post**
   (IG + YT) + **Zernio** (TikTok + Pinterest) and hang it off the nightly curation job.
   - **Do first:** one live Zernio test post to confirm it isn't forced `SELF_ONLY` on TikTok
     (its audit status is undocumented); if it is, move TikTok to upload-post.
   - Founder action is **one batch**: create 2 vendor accounts + connect the social accounts.
   - Run all four channels unattended — the trending-audio play is closed to commercial
     accounts (§11), so there is no per-post human step to design around.
   - Add §11 (C), the agentic caption/pick layer, in the same pass if cheap — template
     captions at daily cadence read as spam.
2. **SEO: landing pages + a programmatic gallery corpus** (§4.3) — the site exposes **3 URLs**
   to Google and sits on **262 unique art pieces** that grow by ~4 every night. Build
   "Aerial alternative" / "best Mac screensaver" / comparison pages **and** a crawlable
   per-piece (or per-movement) gallery surface fed from `gallery.json`, plus a sitemap that
   grows itself. Zero maintenance, compounds, and rides the nightly pipeline.
3. **Directory + listing submissions** (§4.4) — agent produces a ready-to-paste pack
   (blurb variants, screenshots, category picks, per-site links); founder pastes it in one
   sitting. Permanent backlinks + intent traffic.
4. **Press + creator outreach** (§4.1 "borrow audiences") — build the target list
   (9to5Mac / MacStories / Cult of Mac, desk-setup + Mac YouTubers, aesthetic repost accounts),
   a `/press` kit page, and personalized drafts. **One feature ≈ months of our own posting.**
5. **Reddit** (`launch-kit.md` §3) — never run; ~20 min for the highest-fit free channel.
   Do it once the automation above is live so the traffic lands on a site that keeps earning.

## Decisions needed from the founder (blockers on parked items)
- **Email-send path** — Supabase mailer / Resend / other. Blocks §4.6 + §9. Note the
  newsletter is only viable if the send is **automated off the nightly job** (0 h/week rule).
- **Annual plan?** — lifetime shipped; annual (~$9.99/yr) is still untested (§10). Low
  priority until there's traffic to measure it with.
- **One-time account chores** (batch these): create the upload-post + Zernio accounts and
  connect IG / YT / TikTok / Pinterest; confirm whether the PH launch was ever *featured*
  (an unfeatured PH launch is effectively invisible — it changes how we read the 5 upvotes).
- ~~**Aggregator choice**~~ — ✅ resolved 2026-08-02: upload-post (IG + YT) + Zernio
  (TikTok + Pinterest), both free to start, consolidate onto one later (§11 B).
- ~~**Pricing tiers**~~ — ✅ resolved 2026-07-18: $15.99 lifetime shipped alongside the
  subscription (PR #70).

---

## Activity log (append-only — newest first)
- **2026-08-02** — **Post-launch pivot: re-baselined all three growth docs.** The **Product Hunt
  launch ran 2026-07-26 and flopped** — 5 upvotes, 2 comments, no badge, no measurable traffic
  (verified on the live PH page). **Show HN is dropped as a plan item:** the founder was blocked
  from submitting — HN said it isn't accepting new Show HN posts amid a flood of submissions;
  HN's published rules page carries no such notice, so it reads as a temporary/volume gate.
  Neither channel is in the critical path anymore. Also folded in two things the hub had gone
  stale on: the **$15.99 lifetime tier shipped** 2026-07-18 (PR #70 — half of §10 resolved), and
  **on-page/brand SEO shipped** 2026-07-17 (PRs #68/#69).
  _The new constraint that reorders everything:_ **founder marketing time ≈ 0 h/week** — so the
  backlog is now ranked by "runs itself once built," not by upside. New order: **(1) wire the
  posting automation** (vendors already chosen; the asset engine's clips have *never* been
  posted), **(2) SEO landing pages + a programmatic gallery corpus** (the sitemap exposes 3 URLs
  while `gallery.json` holds 262 pieces growing ~4/night), **(3) directory submissions**,
  **(4) press/creator outreach**, **(5) the never-run Reddit post**.
  _Post-mortem (strategy §4.2):_ launch platforms **amplify** an existing audience, they don't
  create one — we ran a distribution event with no distribution, on a deliberately quiet Sunday,
  without the 5–10 seeded commenters the runbook itself called for. **It says nothing about
  demand for the product** — with ~0 sessions the funnel has still never been tested. _(This PR.)_
- **2026-08-02** — **Posting-aggregator research + decision (§11 B rewritten).** Compared
  upload-post, Zernio (ex-`getlate.dev`), Blotato, Postiz, Ayrshare on price, billing unit,
  platform coverage, upload mechanics and — decisively — **TikTok audit status**. All prices
  re-verified against live pricing pages (several secondary/blog sources were stale or wrong).
  **Decision: upload-post for IG + YT, Zernio for TikTok + Pinterest**, both starting free, to
  trial two APIs cheaply and consolidate later; the consolidation trigger is ~5 channels, past
  which upload-post's flat per-brand pricing beats Zernio's per-account model.
  _Two corrections to the strategy doc:_ **(1) Postiz was wrongly listed as a pre-audited
  aggregator** — hosted *and* self-hosted it requires your own TikTok developer app, making you
  the unaudited client (posts forced `SELF_ONLY`); it's now ruled out in the §11.1 table.
  **(2) Ayrshare repriced ~$49 → $149/mo minimum**, putting it ~4× over budget.
  _Open risk:_ Zernio's own TikTok audit status is undocumented — **verify with one live post
  before relying on it**. No code written; glue script deliberately deferred.
- **2026-07-15** — **PH launch-submission assets** (PR #63): built a **16:9 hero-section launch
  video WITH sound** (`marketing/out/hero/living-art-launch-video-16x9.mp4`) — the real hero
  section rendered pixel-perfect via headless Chrome (exact text + monitor + pill, no CTA), the 7
  hero pieces cycling with their **real gallery audio** muxed in (composite sidesteps macOS's
  no-system-audio screen-record limitation); plus **four 16:9 launch images**
  (`marketing/out/launch-images/`: hero title card, collection grid, "every movement", pricing)
  cropped from the live site, plus a **redacted app screenshot** (`05-app-gallery.png` — the
  Gallery grid + "is your screensaver" banner; the account email blacked out). The launch video
  got a founder-picked **art-backed end-card** (blurred Starry Coast + wordmark + green URL pill,
  1s crossfade + audio fade-out) → now 37.6s. All PH-submission media ready in
  `marketing/out/{hero,launch-images}/`. _Follow-up: after master's new **swirl logo** brand
  update, all end-cards (launch video + fullscreen hero 16:9/1:1 + the A–D option PNGs) were
  regenerated with the new mark. The rest of the media carries no logo, so nothing else changed._
  _Follow-up 2: the art was too small in the hero layout. Explored 6 hero-scene layouts (a
  monitor-size ladder + bold non-site redesigns; rejected one for text/monitor imbalance and one
  whose near-fullbleed monitor left no room for the copy). **Founder picked "B": the site's
  two-column layout with much tighter margins — the monitor screen went 531×299 → 992×558 CSS
  (~3.5× the art area).** A push-in zoom was tried and cut — it fought the headline. Final launch
  video = static layout-B hero for ~34s + the art-backed end-card, real audio throughout._
  _Follow-up 3: with the monitor enlarged the copy read too small, so the hero text was scaled up
  too — **headline 54→84px, subtext 16→25px and brightened** off the site's muted grey (a video
  viewer can't lean in to read). The monitor column is pinned at 1016px so the copy grows into the
  dead left margin instead of shrinking the art._
- **2026-07-13** — **Hero + social assets revised** (founder feedback, PR #63): discarded the
  literal ScreenSaverEngine capture (the pieces that happened to play read poorly); rebuilt the
  hero to mirror `hero-section.tsx` exactly — heroReel's 7 pieces in order, site cadence (6s
  dwell / 1.15s crossfade), the `monitor.tsx` frosted pill in **Inter** with the label synced to
  each crossfade (fixed the pill lag), and a **branded end-card → living-art-screensaver.com**
  (37.6s, 16:9 + 1:1 + 6 stills). `make-social-assets.mjs`: the out-of-context "LIVING ART"
  wordmark is now a gentle `living-art-screensaver.com` pill (`marketing/assets/url-pill.png`);
  regenerated the 6 clips. Open: hero audio (recommend muted for social; needs a licensed track
  for a music bed).
- **2026-07-12** — **Launch prep executed** (_PR #63_, branch `growth/launch-execution`): ran the asset
  engine on the newest 6 pieces (12 social clips + captions in `marketing/out/`); produced a
  faithful **hero demo** (16:9 19.5s + 1:1 + 4 stills in `marketing/out/hero/`) from the real
  gallery at the screensaver's cadence, **plus a literal 4K ScreenSaverEngine screen-capture**
  of it running fullscreen (`…-REAL-1080p.mp4`; active saver restored to Ventura afterward);
  **verified the live site** — OG card unfurls (external
  crawler confirmed), `/download/mac` 302s to the signed **v1.4.5** DMG, demand-probe dialog +
  mobile "email me the link" (`/api/download-link`) both healthy, **nothing broken**; **finalized
  `docs/launch-kit.md`** — copy aligned to the live-site voice + a full **launch-day runbook**
  (exact clicks, PH 12:01 AM PT timing, Show HN Day-2 stagger, per-channel UTM links). Remaining =
  founder-owned submit clicks + date.
- **2026-07-03** — Established this hub; moved live status out of the strategy doc into here.
- **2026-07-03** — Strategy doc execution-status pass (snapshot, per-section tags, roadmap). _(PR #61)_
- **2026-07-03** — Marketing asset engine (`marketing/make-social-assets.mjs`) + launch kit
  (`docs/launch-kit.md`). _(PR #61)_
- **2026-07-03** — OG social cards, mobile "email me the link", and the self-report demand
  probe (replaced the Windows-detect/waitlist idea; PostHog-only). _(PR #59, merged)_
- **2026-07-03** — Growth & marketing strategy doc created. _(merged to master)_
