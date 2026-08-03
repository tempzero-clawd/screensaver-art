import type { MetadataRoute } from 'next'
import {
  ALL_ERAS,
  ALL_PIECES,
  GALLERY_PAGE_COUNT,
  INDEX_ART_PAGES,
  galleryPageHref,
} from '@/lib/gallery-catalog'
import { SITE_URL } from '@/lib/seo'

/**
 * The sitemap is generated from `gallery.json`, so it grows itself: the nightly
 * curation job commits a new piece to `master`, the push auto-deploys the site
 * (CLAUDE.md → Website), and the new URL is in the sitemap on the next crawl.
 * Nothing to remember, no per-release step.
 *
 * The 262 `/art/<slug>` URLs are included **only when `INDEX_ART_PAGES` is on**
 * — listing pages we simultaneously tell Google not to index would be an
 * incoherent signal. Flipping that one constant turns both on together. See
 * lib/gallery-catalog.ts for the reasoning behind the default.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL

  // The catalog's newest piece — a good proxy for "when did the browse surfaces
  // last actually change", which is nightly.
  const lastModified = ALL_PIECES[0]?.date ? new Date(ALL_PIECES[0].date) : undefined

  const galleryPages: MetadataRoute.Sitemap = Array.from({ length: GALLERY_PAGE_COUNT }, (_, i) => ({
    url: `${base}${galleryPageHref(i + 1)}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: i === 0 ? 0.9 : 0.5,
  }))

  const eraPages: MetadataRoute.Sitemap = ALL_ERAS.map((era) => ({
    url: `${base}/era/${era.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const artPages: MetadataRoute.Sitemap = INDEX_ART_PAGES
    ? ALL_PIECES.map((piece) => ({
        url: `${base}/art/${piece.slug}`,
        lastModified: piece.date ? new Date(piece.date) : undefined,
        changeFrequency: 'yearly' as const,
        priority: 0.4,
      }))
    : []

  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    ...galleryPages,
    ...eraPages,
    ...artPages,
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
