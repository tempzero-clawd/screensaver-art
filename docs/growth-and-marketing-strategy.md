# Living Art Screensaver — Growth & Marketing Strategy

> **Status:** Living strategy doc. Captures the reasoning from our growth conversation
> plus areas we hadn't yet discussed. The Option B distribution play is folded in as
> **Appendix A**. **See the Progress snapshot below for what's built vs. next** — the
> body sections are the *reasoning*; the snapshot is the *state*.
> **Context:** Solo/indie Mac app, live website, **pre-launch, ~zero users today**.
> Product: a screensaver (and potentially wallpaper) that streams **curated, daily-fresh
> AI art**. Free tier (50 pieces) + **$0.99/mo subscription billed quarterly ($2.97/3mo)**.

---

## 0. TL;DR — the strategy in nine lines

1. **The art is the marketing.** You produce beautiful video daily at ~zero marginal cost — that's an infinite, free content engine. Build everything around it.
2. **Organic-first, not paid.** At $0.99/mo the unit economics make paid ads a money-loser. Earn attention with content; don't rent it.
3. **Your wedge is *curation + freshness*** — the one thing the free incumbents (Aerial, Wallpaper Engine's Workshop, Lively) structurally can't offer.
4. **Validate on Mac before building anything new** (Windows, a wallpaper engine). The Mac app already ships — validation costs *zero* build, just traffic.
5. **Don't pivot to a wallpaper engine.** Bigger market, but commoditized to free/$5 and moated. Instead *distribute your content into it* (Option B).
6. **Fix the funnel so traffic doesn't leak** — device-aware capture ("email me the Mac link"), a self-report platform-demand probe, great link previews, brand-name SEO.
7. **Instrument everything.** You can't improve what you can't see. Set up analytics + a north-star metric before you pour traffic in.
8. **Rethink pricing.** This category pays *one-time*, not subscription — ✅ the **$15.99 lifetime tier shipped**; annual is still untested, and neither can be judged at ~0 traffic. See §10.
9. **Launches amplify an audience; they don't create one.** Product Hunt returned 5 upvotes and Show HN is closed to us — so the plan is now **automated + compounding** channels (nightly auto-posting, programmatic SEO, directories, borrowed audiences), *not* one-day spikes. See §4.2.

---

## Progress & live status → see the hub

**This document is the *reasoning*. The live status, backlog, and who's-doing-what
live in the shared hub: [`GROWTH-PROGRESS.md`](GROWTH-PROGRESS.md).** Multiple agents
coordinate through that file — check it before starting, update it when you finish.
It's the single source of truth for state; the sections below explain the *why* behind
each item (referenced from the hub by number, e.g. "§10").

**Where things stand (summary — the hub has the itemized table):** the *conversion +
analytics foundation* is live (PostHog, OG cards, mobile email-link, the self-report
demand probe), on-page SEO shipped, and **the $15.99 lifetime tier shipped** (§10, half of
the pricing question answered). **The launch bet was run and failed** — Product Hunt
returned 5 upvotes, Show HN is closed to us (§4.2) — so the site still has **~zero traffic
and zero conversion data**. The bottleneck remains **acquisition**, and it is now attacked
through **compounding + automated** channels: nightly auto-posting (§11), programmatic SEO
off the gallery (§4.3), directories (§4.4), and borrowed audiences (§4.1).

> ⚠️ **Hard planning constraint (2026-08-02): founder marketing time ≈ 0 h/week.**
> Every recommendation below has to survive that filter. A tactic that needs a daily or
> weekly human touch is, in practice, a tactic that will not run — so prefer things that
> **run themselves once built** or are **built once and pay forever**, and batch the
> irreducibly-human work (account creation, pitches sent in the founder's own name) into
> rare, bounded sittings. This is why §11's automation now outranks §4.1's manual posting.

> **New agent?** Read `CLAUDE.md` → **`docs/GROWTH-PROGRESS.md`** (state) → this doc
> (why) → `docs/launch-kit.md` → `marketing/README.md`.

---

## 1. Product, positioning & ideal customer

### The one-sentence positioning
> **"A new, curated piece of AI art on your Mac every day — as your screensaver and wallpaper."**
> Think *a curated daily art channel*, not "yet another wallpaper engine."

### Why positioning matters here
Every adjacent product is either a **free engine** (you bring/scroll for content) or a
**fixed library** (Aerial = Apple's drone footage). Your differentiator is **editorial
curation + daily novelty**. Lead with that everywhere; it's the only thing that justifies
a subscription (see §10) and the only thing competitors can't copy cheaply.

### Ideal Customer Profile (ICP)
Sharpening this focuses channel + message choices:
- **Aesthetic-minded Mac users** — the "nice desk setup," r/battlestations, cozy/ambient crowd.
- **Creatives & knowledge workers** — designers, writers, devs who stare at a screen all day and care how it looks.
- **AI-art-curious** — people who enjoy AI imagery but don't want to prompt it themselves.
- Disproportionately **US, Mac, higher willingness to pay** — exactly where Mac over-indexes.

Channel/message corollary: go where *aesthetic* people gather (Pinterest, IG, desk-setup
YouTube, r/macapps, r/battlestations), and sell the *feeling/look*, not the tech.

---

## 2. The core strategic thesis (and the math behind it)

### Why organic, not paid
- **LTV is tiny.** ~$0.99/mo gross, minus Stripe fees on a small charge, minus the free-user
  majority who never convert → realistic LTV per paying sub is maybe **$10–20**.
- **Paid CAC is large.** Clicks run **$0.50–$2+**, and you need many clicks → installs →
  free users → paying conversions. You'd likely pay **$20–50+ in ad spend per paying sub** —
  **underwater on every customer.**
- **Organic content is free and compounding.** Your marginal cost per "creative" (a new art
  clip) is ~zero, and a single post can pull traffic for months. This is a *structural*
  advantage most apps don't have. **Lean into the asymmetry.**

> Rule of thumb: paid acquisition only works when **LTV > ~3× CAC**. At $0.99/mo that's
> nearly impossible cold. Revisit paid only after (a) a higher-value pricing tier exists
> (§10) and (b) you have a proven, instrumented funnel to amplify (§13).

### The content flywheel
```
Nightly AI art generation (already built)
   → repackage to social formats (cheap)
   → post across platforms (free)
   → some clips catch the algorithm → audience grows
   → bigger audience sees tomorrow's art → flywheel accelerates
```

---

## 3. Metrics foundation — instrument before you scale (don't skip this)

You're about to pour effort into traffic. **If you can't measure it, you're flying blind.**
Set this up *first*; it's the cheapest high-leverage work on the list.

### North-star metric
Pick one. Strong candidate: **weekly active subscribers** (revenue + retention in one
number). Activation proxy in early days: **% of installs that complete a first sync and
set the screensaver.**

### The funnel to instrument (AARRR / "pirate metrics")
| Stage | Question | Track |
|---|---|---|
| **Acquisition** | Where do visitors come from? | Sessions by source (UTMs on every link/post) |
| **Activation** | Do they reach the "wow"? | Install → first art on screen ("time-to-wow"); set-as-screensaver rate |
| **Retention** | Do they keep using it? | D1/D7/D30 active; screensaver still set |
| **Referral** | Do they tell others? | Referral signups; "what's that?" share events |
| **Revenue** | Do they pay & stay? | Free→paid conversion %; **churn %**; MRR |

### Tooling (lightweight, privacy-friendly)
- **Website:** Plausible or PostHog (PostHog also does product analytics + funnels + flags).
- **App:** event logging you already have (logger.ts) → forward key events (sync done,
  screensaver set, subscribe-clicked) to PostHog or similar.
- **Attribution:** UTM convention on *every* outbound link (`utm_source`, `utm_medium`,
  `utm_campaign`) so you know which channel actually converts.

---

## 4. Acquisition channels (ranked by fit)

### 4.1 Content flywheel — social (primary, ongoing)
Your highest-leverage channel because it monetizes your free art.
- **Platforms, weighted by *durability* (matters for a desktop product — see §6):**
  - **Pinterest** ⭐ — desktop + search-driven, pins live for *months/years*, perfect for
    "desk setup" discovery. Most underrated for your concern about mobile→desktop handoff.
  - **YouTube** ⭐ — Shorts for reach + a real "best Mac screensaver / Aerial alternative"
    video that's searchable forever and watched *on desktops*.
  - **Reddit** — r/macapps, r/apple, r/battlestations, r/AIArt; threads rank in Google for years.
  - **Instagram Reels / TikTok** — top-of-funnel *awareness* (viral lottery tickets), not
    your conversion path. Post daily; cost is ~zero.
- **Volume strategy:** post *every* good piece to *every* platform. Each post is an
  independent shot at virality. Flood the channels — your content is free and infinite.
  **⚠️ At 0 h/week this only happens if it's automated.** The clips have existed since
  2026-07-12 and *none* has ever been posted — which is the whole argument for treating §11's
  posting automation as priority #1 rather than a nice-to-have. Manual daily posting is not a
  plan; it's a wish.
- **Borrow audiences (the real accelerant):** the slow part is building your *own*
  following. Skip it — get featured by big "aesthetic/AI-art/wallpaper" repost accounts,
  and by "best Mac apps / desk setup" YouTubers/creators. One feature on a 500k account
  ≈ months of your own posting. Send them your best loops, free, credited.

### 4.2 Launch spikes — ❌ **run, failed, and demoted** (post-mortem)
> Copy + checklists live in **`docs/launch-kit.md`** — now an **archive/reference**, not a
> plan. **Live status → the hub (`GROWTH-PROGRESS.md`).**

**What happened.** Product Hunt launched **2026-07-26** with the full media kit (launch video
with sound, app + site screenshots, stills) and the finalized copy. Result: **5 upvotes,
2 comments, no badge, no measurable traffic.** **Show HN never ran** — the founder was blocked
at submission (2026-08-02): HN reported it isn't accepting new Show HN posts amid a flood of
submissions. (HN's published [`showhn.html`](https://news.ycombinator.com/showhn.html) carries
no such notice, so treat it as a temporary/volume gate rather than policy — but **nothing may
depend on it reopening.**)

**Why it failed — the generalizable lesson:**

> **Launch platforms *amplify* an audience; they don't *create* one.** Ranking on PH is driven
> by early engagement velocity, which comes from people who already follow you. We had none, so
> there was nothing to amplify. **We ran a distribution event with no distribution.**

Contributing, in descending order of blame:
1. **No audience to mobilize.** The runbook's own step P-5 — line up 5–10 people to *comment* in
   the first hours — didn't happen. On PH that isn't a nice-to-have; it's the mechanism.
2. **The Sunday bet cut both ways.** We chose Sunday deliberately to chase a badge in a thin
   field (`launch-kit.md` §1). With no seeded engagement, the "fewer competitors" upside never
   activated and only the "far less traffic" downside landed. **A quiet day only helps if you
   can win it.**
3. **Featured status is the real gate** — an unfeatured PH launch is close to invisible
   regardless of what you do. Worth confirming after the fact; it reframes the 5 upvotes from
   "the market rejected us" to "almost nobody was shown it."
4. **Single-channel, single-day.** Everything was staked on one 24-hour window with no other
   traffic source running underneath it.

**What it does NOT tell us.** It says **nothing about product demand or pricing.** With ~0
sessions, the funnel (§3, §5) has still never been exercised — no download rate, no activation
rate, no free→paid rate. Do not "fix" conversion or reprice in response to this; the input
variable was traffic, and it was zero. See *A note on validation* in §15.

**Consequences for the plan:**
- **Launch spikes are out of the critical path.** They are what you do *after* you have an
  audience, not the thing that gets you one. Product Hunt is not re-runnable for months; the
  Show HN copy stays ready to fire opportunistically, costing nothing while it waits.
- **Reddit is the exception and is still un-run** — it's a community, not a leaderboard, so it
  doesn't require pre-existing followers, and threads rank in Google for years (§4.1). ~20
  minutes for the single highest-fit free channel; do it once the always-on channels are live so
  the visit lands somewhere that keeps earning.
- **The re-run, if ever:** PH permits a fresh launch for a substantially updated product
  (their guidance has historically been ~6 months apart — verify before planning around it).
  Only worth it with an audience to mobilize. Until then, treat launches as harvest, not seed.

### 4.3 SEO & content (compounding, owned) — **now a top priority**
The traffic that finds you *at their Mac with intent* — and the channel that best fits a
**0 h/week** budget, because a page you ship once keeps working with no upkeep.

**Already shipped (2026-07-17):** the on-page basics — a Mac-screensaver keyword title, a shared
meta description, and JSON-LD `SoftwareApplication` markup. **Brand-name SEO** ("Living Art
Screensaver" should land you #1, because recall fires as a *name search*, not a typed URL — §6)
is largely a function of that plus time and backlinks (§4.4).

**Still to build — intent pages:**
- **"Aerial alternative"** — Aerial is the known free incumbent; alternative-seekers are warm.
- **"best Mac screensaver 2026," "live wallpaper Mac," "AI art wallpaper/screensaver."**
- **Comparison pages** (you vs Aerial / Wallpaper Engine — honest, highlighting curation +
  daily-fresh).

**Still to build — the programmatic corpus (the underused asset):**

> The site currently exposes **3 URLs** in its sitemap. `gallery.json` holds **262 pieces**,
> each with a title, an art movement/style, a 4K poster image, a video, and a generated
> description — **and the nightly curation job adds ~4 more every night, free.**

That is a self-growing content corpus most indie sites would have to write by hand:
- **A page per piece and/or per movement** ("Ukiyo-e screensaver", "Art Nouveau live
  wallpaper", "Impressionism") — real media, real unique text, internally linked, each an
  entry point for long-tail image/art searches that no competitor is targeting.
- **A sitemap that grows itself** off `gallery.json` instead of a hand-written 3-URL list, so
  every night's curation run also ships SEO surface area. Zero marginal effort forever.
- **Guardrails:** keep pages genuinely useful (art + context, not doorway pages); consider
  featuring the `free: true` pieces most prominently so a crawler-sourced visitor can actually
  watch what they landed on; and don't let it cannibalize the app's exclusivity (§ *Where gating
  happens* in `CLAUDE.md` — the MP4s are already public, so no new exposure).

This is the clearest case in the whole plan of **build once, compounds nightly, needs nobody.**

### 4.4 Press & directories (one-time work, permanent backlinks)
Screensaver apps are rare enough to be newsworthy, and every listing is both a trickle of
intent traffic *and* a backlink that helps §4.3.
- **Directories (batchable, do these first):** **alternativeto.net** (list under Aerial —
  highest intent of anything on this page), **MacUpdate**, plus the indie/app directories
  (there's-an-app-for-that, Uneed, Peerlist, SaaSHub and similar). An agent can prepare the
  entire pack — blurb variants at each site's length limit, screenshots, category choices,
  submission links — so the founder pastes it all in **one sitting**.
- **Press:** **9to5Mac, MacStories, Cult of Mac, MacRumors**. Pitch the *story* (a screensaver
  that generates and curates new art nightly), not the product; include the launch video.
- **Community:** the **Aerial / PaperSaver** community is literally your ICP, and you already
  build on their tooling — show up as a builder, not an advertiser.
- **This is also the "borrow audiences" play from §4.1** — creators and repost accounts. It's
  the one high-leverage channel that *can't* be automated (it needs the founder's own name), so
  the agent-side job is to reduce it to "review and hit send": target list, `/press` kit page,
  personalized drafts.

### 4.5 Ecosystem distribution — **Option B** (see Appendix A)
Publish free **curated art sample packs** into Wallpaper Engine Workshop + Lively to borrow
their 20–50M-user traffic, funneling the curation-lovers to your app. Near-zero cost
(reuses nightly art). **Full plan in Appendix A.**

### 4.6 Owned channels — email/newsletter (under-rated; build the list from day one)
The **one channel you own** and that no algorithm can throttle:
- **"Art of the week/day" email** — doubles as *content*, *retention*, and *acquisition*
  (forwardable, shows the daily-fresh value prop in action).
- Capture emails *everywhere*: the Windows waitlist, the "email me the Mac link" flow,
  a homepage newsletter opt-in. An email list is an appreciating asset; start now.

### 4.7 Mac App Store as a *discovery* channel (evaluate, don't assume)
You distribute via notarized DMG today. The **Mac App Store** is a search/discovery surface
many Mac users browse. Trade-offs to weigh: Apple's 15–30% cut, IAP requirement for the
subscription, and sandbox/extension constraints (your `.appex` is already sandboxed, but
MAS rules differ). Not urgent, but it's a *passive discovery* channel worth a feasibility
check once the funnel converts.

---

## 5. Conversion & capture — stop the funnel from leaking
Earned traffic is wasted if the site doesn't convert it. These are mostly **website code**
tasks (high ROI; a 2× conversion lift ≈ 2× the traffic, for far less effort):

> **Status:** the capture layer below is ✅ **live** — with one change from the original
> plan. We did **not** ship OS-detection + a Windows-only waitlist (detecting platform
> risked mislabeling a Mac user → bounce, a very-high-cost error). Instead:
> a universal **self-report demand probe** ("Want it on Windows / iPad / iOS / TV?") that
> lets visitors pick the platforms they want — safer *and* richer (multi-platform intent).
> It's **PostHog-only** (no backend): `components/marketing/platform-interest.tsx`.

- **Device-aware Download CTA:**
  - **Mac / desktop** → "Download for Mac." ✅ live
  - **Phone** → **"Email me the Mac download link"** → the cross-device bridge so mobile
    interest survives to the desktop (see §6). ✅ live
  - **Cross-platform demand probe** (all visitors) → the self-report vote above, replacing
    the old "detect Windows → waitlist" idea. ✅ live
- **Rich link previews (Open Graph / Twitter):** ✅ live — a branded card so every shared
  link unfurls beautifully (`app/opengraph-image.tsx`). Multiplies social reach for free.
- **Instant on-site preview:** let visitors *see the art moving* before downloading
  (you already have `index.html`); show the value before asking for the install.
- **Friction audit:** minimize steps from landing → installed → first art on screen.

---

## 6. The mobile→desktop handoff problem (a desktop product on mobile-first channels)
Real friction: a busy person sees your art on a phone, but must later switch to a Mac to
download. **Reframe the mobile post's job:** not an immediate download, but (1) **brand
recall** and (2) **intent capture off the phone**. Tactics:
- **Capture the email on mobile, deliver the link to desktop** (the "email me the Mac link"
  flow). Don't rely on memory — convert hot intent into an inbox item waiting at their Mac.
- **Favor durable/searchable channels** (Pinterest, YouTube, Reddit) so the content gets
  *re-found* at the desktop, not just glimpsed and gone.
- **Win the name search** (brand SEO) — recall fires as "living art screensaver" in Google.
- **Reassurance:** your audience is *Mac users*, disproportionately scrolling *at a desk with
  the Mac right there*. The gap is narrower for your ICP than for most products.

---

## 7. Activation — the first 5 minutes decide everything (we hadn't covered this)
Acquisition is wasted if new users don't reach the "wow." For this product the wow is
**beautiful art actually playing on their screen.** Optimize **time-to-wow**:
- Minimize steps between install and first art on screen (sync speed, sensible defaults,
  the free pieces selected by default — already done).
- The one-click **"Set" banner** is critical activation UI — make sure it's prominent and
  the post-set status banner closes the "now what?" loop (already built; keep it tight).
- **Instrument activation** (install → first sync → screensaver set). If users drop between
  install and "set," that's your highest-ROI fix — more valuable than more traffic.

---

## 8. Platform expansion — Windows (don't build it first)
> **Status:** 🅿️ parked, **as planned** — pending real demand. Instead of guessing from the
> market-share numbers below, the site now *measures* it via the self-report demand probe
> (§5). Decide Windows from the PostHog `platform_interest_*` data, not the chart.

- **The numbers:** Windows is ~60% of US / ~63–72% of worldwide desktop; macOS ~23% US /
  ~15–16% worldwide. So Windows is the *majority* of who'll *see* your content.
- **But it's the worse minority to chase first:** Windows users expect screensaver/wallpaper
  apps to be **free** (Lively, Wallpaper Engine), the screensaver category is effectively
  **dead on Windows**, and building it is **weeks** of native `.scr` + signing + a new QA
  matrix — *before you've validated demand on the platform you already ship.*
- **Because organic content is free, "wasted" Windows impressions cost $0** (unlike paid ads,
  where targeting the wrong OS wastes money). So don't pre-build for them — **capture them:**
  the **Windows waitlist** turns that majority into *measured demand* + a Day-1 launch list.
- **Decision rule:** build Windows when the waitlist (or live demand) justifies it — not
  because of the market-share chart.

---

## 9. Retention & churn — the silent killer of subscriptions (we hadn't covered this)
For a subscription business, **keeping** subscribers matters as much as getting them. A
$0.99/mo product with high churn never compounds.
- **Your retention mechanism is the product promise: daily-fresh, curated art.** Protect the
  pipeline quality — stale/ugly art is churn. (You have the curation skill; keep the bar high.)
- **Lifecycle email:** onboarding sequence, "new this week" nudges, and **win-back** flows for
  lapsed subscribers ("here's what you've missed — come back").
- **Measure churn explicitly** (monthly + the quarterly-billing cliff). Watch for the renewal
  drop at the 3-month charge.
- **Make the value visible:** the in-app "new today" surfacing reminds people *why* they pay.

---

## 10. Monetization & pricing — half-answered; the rest waits on traffic
The single clearest signal from all our market research: **this category pays *one-time*,
not subscription.** Wallpaper Engine = $4.99 once (20–50M owners). Lively = free. Aerial =
free. Paid Mac screensavers (Bauhaus Clock $19) = **one-time**. A **$0.99/mo subscription
swims against the category's grain.**

> ✅ **Acted on 2026-07-18 (PR #70): the lifetime tier shipped** — **$15.99 one-time
> "Own it forever"**, sold side-by-side with the $0.99/mo (billed quarterly) subscription, and
> a lifetime purchase auto-cancels any running subscription so nobody double-pays. The single
> access rule is `isSubscriptionActive()` in `@screensaver-art/constants` (see `CLAUDE.md`).
> **Remaining open:** the annual plan, and the trial idea below.
>
> ⚠️ **But nothing here has been *tested* yet.** Pricing is a *conversion* lever, and with
> ~0 sessions (§4.2) there is no conversion data to move. **Do not iterate on price in
> response to the failed launch** — that would be optimizing a denominator we never had.
> Re-open this the moment a channel actually delivers traffic.

This doesn't mean kill the subscription — it means **test pricing structures**, because it's
likely your highest-impact conversion lever *once traffic exists*:
- **Add an annual plan** (e.g. ~$9.99/yr) — reads as cheaper, cuts churn, fits "I'll pay once
  a year" psychology. **Still not built.**
- ~~**Add a lifetime / one-time tier**~~ — ✅ **done at $15.99.** It *matches the category's
  mental model*: many who'd never start a subscription will happily pay once. (Yes, it forgoes
  recurring revenue from those users — but it captures buyers you'd otherwise lose entirely.)
- **Reconcile with the "daily-fresh" wedge:** the subscription's justification is *ongoing*
  new art; a lifetime tier could still include daily art, or you position lifetime as
  "the app + current gallery" and subscription as "+ new art forever." Design the fence
  deliberately.
- **Consider a free trial of the *full* gallery** (time-boxed) so users feel the whole value
  before the wall — often lifts conversion vs. a pure freemium lock.
- **A/B test price points and structures** once instrumented (§3). At $0.99/mo, small
  conversion improvements dwarf almost everything else you can do.

> This deserves a dedicated experiment early. It's cheap to try (Stripe Price changes +
> UI copy) and potentially the difference between a viable and non-viable business.

---

## 11. Build vs. buy — the "agentic marketing engine"
You can largely automate the content flywheel off your existing nightly pipeline.
- **(A) Asset step — ✅ BUILT.** `marketing/make-social-assets.mjs` (+ `marketing/README.md`):
  ffmpeg reframes each piece 16:9 → 9:16 + 1:1 (blurred-fill, never cropped) with a subtle
  wordmark, loops to length, and writes per-platform starter captions. No npm deps. Run
  `node marketing/make-social-assets.mjs --latest 4` after the nightly curation batch.
  (Captions are template-based today; upgrading to Gemini is a noted easy win.)
- **(B) Distribution — BUY. ✅ vendors decided 2026-08-02 — see §11.1.** One API call fans out to
  TikTok/Reels/Shorts/Pinterest. **$0/mo to start.** *Critical reason to buy, not build:*
  **TikTok forces `SELF_ONLY` (private, creator-only) on every post from an unaudited API
  client.** Lifting it needs a separate Content Posting API audit (~1–2 weeks) that requires
  demonstrating a compliant UI with privacy/comment/duet toggles — a UI we don't have and would
  have to build. Instagram/YouTube/Pinterest add their own app review on top. Vendors holding
  their *own* audited client sidestep all of it; building the raw posting/OAuth layer = months
  of compliance for one app's marketing. Don't.
- **(C) Agentic layer — optional BUILD.** A nightly Claude call picks the best clip and writes
  per-platform captions/hashtags. ~1 day.
- **Total: ~3–4 days of build + $0/mo to start, ~$16–24/mo once IG + YT leave the free tier**,
  hanging off the nightly job → near-unattended daily multi-platform marketing.
- **Keep a human in the loop ~2 min/day** (reply to comments, add a trending sound). The reason
  is **capability, not algorithm** — a distinction worth getting right, because the folklore
  version ("schedulers get throttled") is false. Platforms deny ranking API posts differently:
  Instagram's head Adam Mosseri, asked directly, said scheduled posts "will not affect your
  reach in one way or another," and Meta runs the Content Publishing API *as* the supported way
  to publish from outside the app. What the APIs genuinely **cannot** do is attach a platform's
  native/trending audio — music licensing keeps those libraries app-only ([Zernio's docs](https://zernio.com/blog/tiktok-posting-api):
  Creator's Draft exists because "the API can't add those, only the app can"; IG's Graph API
  strips or rejects licensed tracks) — and audio *is* a discovery surface.
  **⚠️ But the trending-audio play is mostly closed to us — we are a commercial account.**
  Verified 2026-08-02; this is the finding that should drive the workflow:
  - **YouTube** — *"Channels that upload videos for commercial purposes … may see errors when
    uploading Shorts containing sounds from the Shorts Audio Library,"* because of *"agreements
    with some music partners, which restrict use of music in Shorts to personal and
    non-commercial uses"* ([Common uploading errors](https://support.google.com/youtube/answer/10383400?hl=en)).
    Independently, the post-upload route is blocked outright: *"You cannot use music or other
    sounds from our Audio Library on Shorts you create from your videos"*
    ([Create Shorts from your videos](https://support.google.com/youtube/answer/12836917?hl=en)).
  - **TikTok** — Business accounts are restricted to the **Commercial Music Library** and cannot
    use trending sounds in promotional content; the personal-library licences don't extend to
    commercial use. Assume Reels carries an equivalent restriction (**unverified — check before
    relying on it**).
  - What remains available is **commercially-cleared catalogue** music (YouTube's royalty-free
    Audio Library, TikTok's Commercial Music Library). Legal and free, but it carries **none of
    the trending-sound discovery benefit** — that surface is exactly the part we can't licence.

  **So the operational answer flips:** run **all four channels unattended**, and spend the ~2
  min/day on **replying to early comments**, which is unrestricted and is the part with
  well-evidenced value. Don't build a draft-mode workflow around adding trending audio until
  someone confirms a commercially-cleared path — the licensing, not the tooling, is the blocker.
  (Our clips ship silent anyway: `make-social-assets.mjs` drops audio — see `marketing/README.md`.)
  Sound pages are real — YouTube documents the Shorts **sound page** and runs a
  [Top Shorts Songs chart](https://charts.youtube.com/charts/TopShortsSongs/us/daily) — we just
  can't legally reach them at commercial scale. **Pinterest is unaffected either way:** it
  advises against relying on audio (much of its audience views sound-off) and has retired adding
  music to new Pins entirely, and Pins are evergreen.

### 11.1 Vendor decision (2026-08-02) — split across two, consolidate later

| Channel | Vendor | Cost at our footprint |
|---|---|---|
| Instagram Reels + YouTube Shorts | **upload-post** | free tier → $24/mo ($16 annual) |
| TikTok + Pinterest | **Zernio** (ex-`getlate.dev`) | **$0** — first 2 accounts free, unlimited posts |

**Rationale:** both have a free entry point, so we run them in parallel, learn which API and
which channels actually earn their keep, and **consolidate onto one later** — the glue is a thin
REST wrapper either way, so switching costs an afternoon. The split also lines up with each free
tier: Zernio's 2 free accounts exactly cover TikTok + Pinterest (TikTok being the one channel
upload-post gates behind a paid plan), while upload-post's free tier covers IG + YT.

Two caveats to plan around, neither a blocker:

- **Only the Zernio half is durably free.** upload-post's free tier is 10 uploads/mo — about
  five days at nightly cadence — so IG + YT converts to $24/mo ($16 annual, unlimited uploads)
  almost immediately. Treat it as a trial, not a runway.
- **Zernio's TikTok audit status is unconfirmed.** Its API exposes `PUBLIC_TO_EVERYONE` and
  requires TikTok's consent flags (consistent with an audited client), but the docs never say so
  outright. **Verify with one live post before relying on it** — if it lands `SELF_ONLY`, move
  TikTok to upload-post, whose public-posting default *is* documented.

**Others researched** — prices verified 2026-08-02 against each vendor's live pricing page
(several secondary/blog sources were stale by 2–3×):

| Vendor | Entry price | Billing unit | TikTok public post | Verdict |
|---|---|---|---|---|
| **upload-post** | free (10 uploads/mo, no TikTok) → **$24/mo**, $16 annual, unlimited | **profile** = one account *per platform*; all platforms included | ✅ own audited client | **chosen** — IG + YT |
| **Zernio** | **free** for 2 accounts → $6/mo each (3–10), $3 (11–100) | connected account | ⚠️ unconfirmed | **chosen** — TikTok + Pinterest |
| Blotato | $29/mo (20 accounts) | account | ✅ | ❌ API excluded from the 7-day trial |
| Postiz | $29/mo hosted; free self-host | channel | ❌ BYO developer app | ❌ we'd inherit the audit |
| Ayrshare | $149/mo (1 profile) | profile (≤13 networks) | ✅ | ❌ ~4× budget; built for multi-tenant SaaS |

---

## 12. Built-in virality & referral (we hadn't covered this — and it's a natural fit)
A screensaver/wallpaper is **a publicly visible product** — others see it over your shoulder,
in cafés, on screen-shares and Zoom backgrounds. That's organic "what's *that*?" demand baked
into the product. Amplify it:
- **Referral program** — "give a month, get a month" (or give a friend free time). Cheap,
  and word-of-mouth is your best-converting channel.
- **Shareable export** — let users export/share a favorite clip *with subtle attribution* →
  turns every user into a distributor (and feeds your social channels with UGC).
- **Make the brand glanceable** — a tasteful, non-intrusive mark so the over-the-shoulder
  viewer can find it. (Balance against not marring the art.)

---

## 13. Paid acquisition — when (not now) and how to test
- **Not your focus** at $0.99/mo (§2 math). 
- **If/when you test it:** cap a **small learning budget ($100–200 total)**, *boost a proven
  organic winner* (don't run cold creative), prefer **Reddit ads** (narrow Mac subs) over
  Google Search (nobody searches "buy a screensaver"). Track one number: **cost per paying
  sub.** If a $150 test can't get it under ~$10–15, paid doesn't work at this price — expected
  outcome until a higher-value tier (§10) exists.

---

## 14. What NOT to do (anti-patterns & risks)
- ❌ **Don't make paid ads the primary channel** — underwater unit economics at $0.99/mo.
- ❌ **Don't build Windows first** — weeks of work before validating demand; capture a
  waitlist instead.
- ❌ **Don't pivot to a wallpaper *engine*** — bigger market, but free/$5 and moated by
  Wallpaper Engine + Lively; your subscription dies there. Distribute *into* it (Option B).
- ❌ **Don't build the raw social-posting/OAuth/audit layer** — buy an aggregator.
- ❌ **Don't expect a smooth organic ramp** — it's slow then non-linear (see §15). Don't quit
  in the quiet weeks; that's normal, not failure.
- ❌ **Don't pour traffic into an uninstrumented funnel** — set up analytics first.
- ❌ **Don't let curation quality slip** — stale/ugly art breaks the one promise people pay for.
- ❌ **Don't treat a launch platform as an acquisition strategy** — PH/HN amplify an existing
  audience; with none, they return ~nothing (§4.2, learned the hard way 2026-07-26).
- ❌ **Don't read a failed launch as a failed product** — traffic was the zero input; conversion
  and pricing were never exercised. Fix the input before touching anything downstream.
- ❌ **Don't plan tactics that need a recurring human chore** — at ~0 h/week they silently don't
  happen. The social clips sat unposted for three weeks; that's the proof, not a hypothetical.

---

## 15. Market context (the research, summarized)
| Market | Reach | Price norm | Key incumbent(s) | Takeaway for us |
|---|---|---|---|---|
| **Live wallpaper** | **20–50M** (Wallpaper Engine), 14M+ (Lively) | **$5 once / free** | Wallpaper Engine (+ Workshop moat), Lively | Huge but commoditized & moated → *distribute into it*, don't compete as an engine |
| **Mac screensaver** | Niche; ~$1.5B category, ~10M premium-sub users, 5–7% CAGR | **Free / one-time** | **Aerial (free**, Apple footage only) | Smaller, less commoditized; Aerial can't do *curated AI art / daily-fresh* → real differentiation |
| **Desktop OS base** | Win ~60% US / 63–72% WW; Mac ~23% US / 15–16% WW | — | — | Win is the majority *seeing* content, but the worse-monetizing minority to *build* for first |

**The throughline:** every adjacent market prices **free or one-time**, your wedge is
**curation + daily-fresh**, and your **subscription model is the recurring risk** to validate
(via real Mac traffic + pricing experiments — §10), not via more web research.

### A note on validation (desk research vs. real demand)
- **Desk/market research** (web search) answers *"does the category exist, do people pay at
  all?"* — useful to avoid traps. ✅ Done.
- **Demand validation** answers *"will real people pay **you**, at **your** price, via **your**
  funnel?"* — only live traffic can. Category averages never predict an individual product's
  conversion.
- **Good news:** validating Mac demand needs **zero new build** — the app already ships. Point
  the (free) marketing at it and read the subscribe rate. Desk research and live validation
  aren't substitutes; here, live validation is nearly free anyway.
- **Update 2026-08-02 — we still haven't validated anything.** The launch (§4.2) delivered no
  measurable traffic, so the funnel has never been exercised: **no download rate, no activation
  rate, no free→paid rate.** That's the whole reason acquisition stays the only priority. Until
  a channel puts real sessions through the site, every downstream question — price, copy,
  onboarding, Windows — is unanswerable, and any change made to them is a guess wearing a
  data costume.

---

## 16. Phased roadmap (sequencing — impact × effort)
_(✅ done · 🔨 built, not used · ⏭️ next · 🅿️ parked — mirrors the Progress snapshot.)_

**Re-sequenced 2026-08-02** after the launch failed (§4.2) and the founder's time budget was
set at **≈ 0 h/week**. The old Phase 1 ("turn on organic — manual posting first, then the
launch spikes") is retired: the launch is spent, and *manual* was never going to happen. The
new ordering is **automate → compound → batch the human bits.**

**Phase 0 — Foundations:** — ✅ **complete**
- ✅ Analytics + north-star (§3). ⏭️ *still todo:* a consistent UTM convention on outbound links.
- ✅ Conversion capture: device-aware CTAs, "email me the Mac link", the self-report demand
  probe (replaced the Windows-waitlist idea), OG cards (§5–6).
- ✅ On-page + brand SEO basics — keyword title, shared meta description, JSON-LD (§4.3).
- ✅ Lifetime pricing tier shipped (§10).
- ❌ Launch spikes — run and failed; **removed from the critical path** (§4.2).

**Phase 1 — Always-on acquisition (the current focus):** everything here either runs unattended
or is built once and never touched again.
- ⏭️ **Posting automation** (§11 B/C) — the asset engine ✅ exists and has produced clips since
  2026-07-12 that have **never been posted**. Wire upload-post + Zernio onto the nightly job.
  *This is the item that most directly answers the 0 h/week constraint.*
- ⏭️ **SEO: intent pages + the programmatic gallery corpus + a self-growing sitemap** (§4.3) —
  3 indexed URLs today vs. 262 pieces of unique media that grow nightly.
- ⏭️ **Directory submissions** (§4.4) — agent prepares the pack, founder pastes once.
- ⏭️ **Press + creator outreach** (§4.1/§4.4) — the highest-leverage human task; reduce it to
  "review and send."
- ⏭️ **Reddit** — never run, ~20 min, highest-fit free channel (`launch-kit.md` §3).

**Phase 2 — Compound what works (only once Phase 1 delivers sessions):**
- 🅿️ Option B ecosystem packs (Appendix A) — one-time publish into a 20–50M-user surface.
- 🅿️ Email list / "art of the week" (§4.6) — **only if the send automates off the nightly job**;
  needs the send-path decision.
- 🅿️ Lifecycle/retention email + win-back (§9) — needs users first.

**Phase 3 — Optimize & expand (data-driven — genuinely blocked on traffic):**
- 🅿️ **Pricing experiments** — lifetime ✅ shipped; annual + trial still untested. **Cannot be
  evaluated at ~0 sessions** (§10).
- 🅿️ Referral program + shareable export (§12).
- 🅿️ Evaluate Mac App Store discovery (§4.7).
- 🅿️ Build **Windows** *iff* the demand-probe data justifies it (§8).
- 🅿️ Consider paid-ads test *only* after a proven funnel (§13).

---

## 17. Open decisions for the founder
1. **Email infra:** existing path (Supabase/Resend/other) to hook capture flows into, or set one
   up? Blocks §4.6 + §9 — and the newsletter only clears the 0 h/week bar if the send is
   automated off the nightly job.
2. **Annual plan?** — lifetime ✅ shipped at $15.99 (§10); annual (~$9.99/yr) still untested.
   Low priority until a channel delivers traffic to measure it with.
3. **One-time account chores** (batch): create the upload-post + Zernio accounts and connect
   IG / YT / TikTok / Pinterest, so an agent can finish the posting automation.
4. **Was the PH launch ever *featured*?** — an unfeatured launch is close to invisible; the
   answer changes how the 5-upvote result should be read (§4.2).
5. ~~**Aggregator choice**~~ — ✅ **decided 2026-08-02:** upload-post (IG + YT) + Zernio
   (TikTok + Pinterest), both starting free, consolidate later (§11 B).
6. ~~**Pricing: lifetime tier**~~ — ✅ **shipped 2026-07-18** at $15.99 (§10).
7. **Brand mark in art:** how visible? (virality vs. purity tradeoff — §12.)
8. **North-star metric:** confirm "weekly active subscribers" or pick another.

---

## Appendix A — Option B: Borrow the Wallpaper Ecosystems (Distribution, not Pivot)

> **One line:** Your moat is the *curated, daily-fresh AI art*, not the rendering engine.
> So publish **free sample art packs** into the giant live-wallpaper ecosystems
> (Wallpaper Engine Workshop, Lively) as a **top-of-funnel channel** that pulls
> their 20–50M users toward the Living Art app — without rebuilding the product
> to compete as one of their engines.

### A.1 Why this play (the strategic logic)

| Market | Reach | Price expectation | Implication for us |
|---|---|---|---|
| Live wallpaper (Wallpaper Engine) | 20–50M lifetime owners | $4.99 once + free Workshop | Huge audience, but commoditized to ~free; a subscription can't win *here* |
| Live wallpaper (Lively) | 14M+ downloads | Free / open source | Same |
| Mac screensaver (Aerial) | The free default | Free (Apple aerial footage only) | Free incumbent, but **no AI art, nothing fresh daily** |

The big markets are **un-monetizable at our price** but **enormous in traffic**.
The right move is to treat them as **distribution**, not as a market to win:
go where the millions already are, hand them a taste of our *differentiator*
(curation + freshness — the one thing the chaotic free libraries lack), and
convert the subset who value that into app installs.

This reuses art we **already generate nightly** (Veo / Nano Banana pipeline), so
the marginal cost of trying it is near zero.

### A.2 What we publish (the "free sample pack")

A small, curated, **time-boxed** set — *not* the whole gallery — so the pack is a
trailer, not the product:

- **8–15 of our most scroll-stopping pieces.** Quality over quantity; this is a
  highlight reel.
- **Free, locked-tier pieces only** — never ship subscriber-only art into a free
  channel (it undercuts the paid tier and leaks the perk). Pull only from the
  `free: true` set in `gallery.json`.
- **Formatted to each host's expectations:**
  - *Wallpaper Engine Workshop:* video wallpapers (mp4), landscape 16:9, looping.
    Workshop supports a "collection" so all pieces sit under one branded entry.
  - *Lively:* mp4/webm; ships as a downloadable wallpaper or a small pack.
- **Branding, lightly:** a tasteful "Living Art" wordmark in a corner or on an
  end-card, plus the pack title/description carrying the hook + link (see below).
  Do **not** plaster watermarks across the art — the beauty is the conversion
  driver; don't kneecap it.

### A.3 The hook (copy that drives the cross-over)

The pack's *title + description* is the ad. Lead with the one thing these
ecosystems can't give from their free dumps — **curation + daily-fresh**:

> **Living Art — Curated AI Art (Free Sample Pack)**
> A hand-picked taste of Living Art. The full app delivers a **new, curated AI
> artwork every day** as your Mac screensaver & wallpaper — no endless scrolling
> through thousands of random files. Get it free at livingartscreensaver.com.

Notes:
- Name first, URL second (brand recall > URL memorization — searchable name wins).
- Quantify the freshness ("new piece every day") — that's the subscription reason.
- Keep it honest: it's a *sample*; the app is where the daily stream lives.

### A.4 The funnel (mobile/desktop/OS handoff already solved in §5–6)

```
Wallpaper Engine Workshop / Lively  (20–50M users browsing free wallpapers)
        │  free sample pack + hook copy
        ▼
   livingartscreensaver.com  (landing)
        │  OS-aware CTA:
        │   • Mac visitor → "Download for Mac"
        │   • Windows/other → "Windows version? Join the waitlist"  (measures demand)
        │   • Phone        → "Email me the Mac download link"        (cross-device bridge)
        ▼
   Living Art app install → free tier → daily curated art → subscribe
```

The OS/device-aware capture flows (Windows waitlist + "email me the link") are the
companion build that makes this traffic *not leak* — see §5–6. Without them, Workshop
traffic that happens to be on Windows or on a phone is wasted; with them, it's
**measured demand**.

### A.5 What this is NOT

- **Not** shipping our engine/app into Steam. We're publishing *content packs*,
  not competing as a wallpaper engine (suicidal vs. free Wallpaper Engine + Lively).
- **Not** the whole gallery. A trailer, not the film.
- **Not** subscriber-only art. Free-tier pieces only.
- **Not** a substitute for validating Mac conversion — it's a *traffic source* that
  feeds the same existing funnel we're validating.

### A.6 Risks & mitigations

| Risk | Mitigation |
|---|---|
| Workshop/Lively TOS on promo links / external CTAs | Check each platform's content rules before publishing; keep promo tasteful and in description, not spammed across the art. |
| "Free art" cannibalizes the app | Cap at a small, fixed highlight set of already-free pieces; the value prop is *daily fresh + curation*, which a static pack can't replicate. |
| People rip the mp4s | They're already public on R2; the pack is intentionally free art. No new exposure. |
| Low cross-over rate | It's near-zero cost (reuses nightly art). Measure pack views → site visits via a UTM'd link; kill or scale based on data. |

### A.7 Measurement (so we learn, not just post)

- Use a **dedicated UTM'd URL** in each pack (e.g. `?utm_source=wallpaper_engine`,
  `?utm_source=lively`) so site analytics attributes the traffic.
- Track the chain: pack views/subscribers (Workshop gives counts) → UTM site
  sessions → installs → subscriptions.
- Decision rule: if a pack drives meaningful UTM traffic at ~zero cost, expand
  (more packs, refreshed monthly). If not, it cost us a few hours of repackaging.

### A.8 Concrete first step (smallest viable test)

1. Pick **10 of the best `free: true` pieces** from `gallery.json`.
2. Repackage to 16:9 looping mp4 (already the source format) + a simple end-card
   wordmark.
3. Publish **one** Wallpaper Engine Workshop collection + **one** Lively pack with
   the hook copy and a UTM'd link.
4. Wait 2–4 weeks; read the UTM traffic; decide expand vs. drop.

This can be largely automated off the existing nightly pipeline later (auto-build
a monthly "best of" pack), but the first one should be hand-curated to set the
quality bar.

---

## Sources (market research, June 2026)
- Desktop OS share: [StatCounter US](https://gs.statcounter.com/os-market-share/desktop/united-states-of-america), [StatCounter WW](https://gs.statcounter.com/os-market-share/desktop/worldwide/), [macOS trend](https://www.accio.com/business/macos-market-share-trend-over-time)
- Live wallpaper: [Wallpaper Engine SteamSpy (20–50M)](https://steamspy.com/app/431960), [Lively (GitHub, 14M+)](https://github.com/rocksdanister/lively), [Mac live-wallpaper apps](https://cindori.com/how-to/best-live-wallpaper-apps-mac)
- Screensaver market: [Screensaver software market report](https://www.marketreportanalytics.com/reports/screensaver-software-54549), [Aerial](https://aerialscreensaver.github.io/), [Best Mac screensavers 2026](https://softorino.com/blog/top-7-screensaver-tools-for-mac-and-windows)
- Posting/asset tooling — **primary sources** for the §11 B vendor table (verified 2026-08-02):
  [upload-post pricing](https://www.upload-post.com/pricing-comparison/) · [upload-post API docs](http://docs.upload-post.com/api/upload-video/) · [Zernio pricing](https://zernio.com/pricing) · [Zernio media uploads](https://docs.zernio.com/guides/media-uploads) · [Blotato pricing](https://www.blotato.com/pricing) · [Postiz pricing](https://postiz.com/pricing) · [Postiz TikTok docs](https://docs.postiz.com/providers/tiktok) (the BYO-app evidence) · [Ayrshare pricing](https://www.ayrshare.com/pricing/)
- The audit rule itself, from the platform: [TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started/) — *"all content posted by unaudited clients will be restricted to private viewing mode."* Secondary: [PostPeer: TikTok posting API 2026](https://www.postpeer.dev/blog/best-tiktok-posting-api), [Buffer: best social APIs](https://buffer.com/resources/best-social-media-apis/)
- **Native-audio / unattended-posting rationale (§11, verified 2026-08-02 — platform-official where possible):** [YouTube — commercial channels see errors using Shorts Audio Library sounds](https://support.google.com/youtube/answer/10383400?hl=en) · [YouTube — no Audio Library sounds on Shorts made from your videos](https://support.google.com/youtube/answer/12836917?hl=en) · [YouTube Help — Shorts sound page](https://support.google.com/youtube/answer/10623810?hl=en) (*"other Shorts using the same audio"* + "Use this sound") · [Top Shorts Songs chart](https://charts.youtube.com/charts/TopShortsSongs/us/daily) · [Pinterest — music in Pins retired](https://help.pinterest.com/en/article/add-music-to-a-pin) · [Pinterest creative best practices](https://business.pinterest.com/creative-best-practices/) (sound-off viewing) · [Zernio — Creator's Draft exists because the API can't add native sounds](https://zernio.com/blog/tiktok-posting-api). Adam Mosseri (Instagram) on scheduling: *"it will not affect your reach in one way or another."* **Net: schedulers aren't penalised, and the trending-sound surface we'd have gone in-app for is licence-restricted to non-commercial use — so unattended posting costs us little.**

---

## Document history
- **Initial version** — generated in a Claude Code conversation:
  https://claude.ai/code/session_01MJXj4gGsEHfMAxcKJET6uC
  (merges the original `growth-and-marketing-strategy.md` and
  `growth-option-b-wallpaper-ecosystem-distribution.md` into a single document,
  with the Option B playbook folded in as Appendix A).
- **2026-07-03 — execution status pass** (same session): added per-section 🔨/✅/⏭️/🅿️ status
  tags and updated the roadmap — reflecting what shipped (PostHog, OG cards, mobile
  email-link, the self-report demand probe that replaced the Windows-detect/waitlist idea,
  the `marketing/` asset engine, and `docs/launch-kit.md`).
- **2026-07-03 — multi-agent hub** (same session): moved the live status table out of this
  doc into the canonical shared hub **`docs/GROWTH-PROGRESS.md`** (state + backlog +
  read/claim/log protocol), so multiple context-isolated agents coordinate through one
  committed file. This doc now holds the *reasoning* and points at the hub for *state*.
- **2026-08-02 — post-launch pivot.** The launch bet was executed and failed (PH 2026-07-26:
  5 upvotes, 2 comments, no badge, no measurable traffic; Show HN blocked at submission), so
  **§4.2 was rewritten as a post-mortem** and launch spikes were demoted out of the critical
  path. Added the **0 h/week founder-time constraint** as an explicit planning filter, and
  re-sequenced §16 around it (**automate → compound → batch the human bits**). Expanded **§4.3**
  with the programmatic-SEO opportunity (3 indexed URLs vs. 262 gallery pieces growing ~4/night)
  and **§4.4** with a batchable directory/press/creator playbook. Recorded the shipped
  **$15.99 lifetime tier** in §10 and the on-page SEO work, and added three anti-patterns to
  §14. Throughline: **traffic was the zero input — nothing downstream of it has been tested.**
