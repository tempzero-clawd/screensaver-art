/**
 * The site's meta description, shared with the homepage JSON-LD so the two
 * can never drift apart.
 */
export const SITE_DESCRIPTION =
  'A Mac screensaver that turns your idle display into a living art gallery, showcasing AI-animated artworks across every style, with new pieces added regularly. Free Download.'

/** Canonical origin. Shared by the sitemap and every page's canonical URL. */
export const SITE_URL = 'https://living-art-screensaver.com'

/**
 * The site-wide social card, as an absolute URL.
 *
 * `app/opengraph-image.tsx` is normally attached automatically — but ONLY to
 * pages that don't set `openGraph` themselves. Next merges metadata shallowly
 * per top-level key, so a page that overrides `openGraph` (to set its own title
 * or url) silently drops the inherited image and unfurls with no picture at all.
 * Any page that overrides `openGraph` must therefore pass `images` explicitly —
 * this constant is the fallback for pages with no image of their own.
 */
export const SITE_OG_IMAGE = `${SITE_URL}/opengraph-image`

/**
 * A download link tagged so we can tell which page sent the install.
 *
 * `/download/mac` is a redirect route, not a page — no analytics script ever
 * runs on it — so UTM params here can't clobber a visitor's original campaign
 * attribution the way they would on a normal internal link. They only ride
 * along to the release asset, where server-side logging can read them, which is
 * what lets us answer "did the gallery pages actually convert the pin traffic?"
 */
export function downloadHref(source: string, content?: string): string {
  const params = new URLSearchParams({ utm_source: 'site', utm_medium: 'internal', utm_campaign: source })
  if (content) params.set('utm_content', content)
  return `/download/mac?${params.toString()}`
}
