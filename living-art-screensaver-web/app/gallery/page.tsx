import type { Metadata } from 'next'
import { GalleryIndex } from '@/components/gallery/gallery-index'
import { ALL_ERAS, ALL_PIECES } from '@/lib/gallery-catalog'
import { SITE_OG_IMAGE, SITE_URL } from '@/lib/seo'

/**
 * `/gallery` — the browsable index of the whole collection, and the hub the
 * per-piece and per-era pages link back to.
 *
 * Indexable: this is a small, curated browse surface (16 pages counting the era
 * wings), not the 262 generated piece pages — see `INDEX_ART_PAGES` in
 * lib/gallery-catalog.ts for that call.
 */
export const metadata: Metadata = {
  title: `Gallery — all ${ALL_PIECES.length} animated artworks`,
  description: `Browse all ${ALL_PIECES.length} AI-animated artworks in the Living Art Screensaver, across ${ALL_ERAS.length} wings of art history — from cave painting to cyberpunk. Free Mac download.`,
  alternates: { canonical: `${SITE_URL}/gallery` },
  openGraph: {
    title: `Every artwork in Living Art Screensaver`,
    description: `${ALL_PIECES.length} AI-animated pieces across ${ALL_ERAS.length} wings of art history, playing on your Mac's idle screen.`,
    url: `${SITE_URL}/gallery`,
    // Explicit — overriding `openGraph` drops the inherited site card. See
    // SITE_OG_IMAGE in lib/seo.ts.
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630 }],
  },
}

export default function GalleryPage() {
  return <GalleryIndex page={1} />
}
