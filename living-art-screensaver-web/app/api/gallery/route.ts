import { NextRequest, NextResponse } from 'next/server'
import { verifyNativeAuth } from '@/lib/auth/verify-native-auth'
import { fetchRepoFile } from '@/lib/github-release'
import { type ArtItem, type GalleryApiResponse } from '@screensaver-art/constants'

const GALLERY_PATH = 'gallery.json'
const REVALIDATE_SECONDS = 300

/**
 * GET /api/gallery
 *
 * Returns the FULL gallery playlist for the macOS screensaver app plus the
 * caller's subscription state.
 *
 * Gating happens on the client now, not here: every user gets the whole list so
 * a free user can browse + preview everything. Free-ness is per-item — each
 * gallery.json entry carries a `free` flag (interleaved through the catalog) —
 * and the app locks non-free pieces for non-subscribers and never caches them
 * (see the Electron app's Gallery + cache-sync, and `isItemLocked`).
 *
 * ── Where the playlist comes from ───────────────────────────────────────────
 * Read straight off `master` via the GitHub Contents API with the server-side
 * GITHUB_RELEASE_TOKEN (same proxy as /download and /updates, lib/github-release).
 * This used to fetch the GitHub Pages copy, which had two problems: Pages is
 * public-repo-only on a Free plan (going private would have taken the gallery
 * down), and a wedged Pages build silently froze the playlist — one stuck
 * overnight, so a day's new art never reached anyone. Reading the ref directly
 * removes the deploy step between a curation commit and the app.
 *
 * A missing token returns 500 rather than falling back to a public URL — same
 * design as /download, so a private repo can't silently serve a broken gallery.
 *
 * Auth: Bearer <supabase_access_token> in Authorization header.
 *   - Missing / invalid token → treated as a non-subscriber (never 401, so the
 *     screensaver/app always has something to show during onboarding).
 *
 * Response: GalleryApiResponse
 *   { items: ArtItem[], isSubscribed: boolean }
 */
export async function GET(request: NextRequest) {
  const token = process.env.GITHUB_RELEASE_TOKEN
  if (!token) {
    console.error('[gallery] GITHUB_RELEASE_TOKEN is not set')
    return NextResponse.json(
      { error: 'Gallery is temporarily unavailable (server not configured).' },
      { status: 500 },
    )
  }

  // ── Fetch gallery ───────────────────────────────────────────────────────────
  let items: ArtItem[] = []
  try {
    items = JSON.parse(await fetchRepoFile(GALLERY_PATH, token, { revalidate: REVALIDATE_SECONDS }))
  } catch (err) {
    console.error('Failed to fetch gallery:', err)
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 502 })
  }

  // ── Resolve subscription ────────────────────────────────────────────────────
  const { isSubscribed } = await verifyNativeAuth(request)

  // ── Return the full list (per-item `free` flag rides along for client gating) ─
  const body: GalleryApiResponse = { items, isSubscribed }
  return NextResponse.json(body)
}
