/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Image optimization, turned on for the gallery landing pages.
  //
  // WHY THIS CHANGED: the poster stills referenced by `gallery.json` (`img`) are
  // 5504×3072 WebPs on R2, **1.4–3.3 MB each**. A 48-tile gallery grid rendering
  // them raw is ~120 MB of images for a ~240px-wide thumbnail — unshippable for
  // pages whose traffic arrives from Pinterest, on a phone. Cloudflare Image
  // Resizing is not enabled on the asset zone (`/cdn-cgi/image/...` 404s), and
  // committing pre-scaled thumbnails is not an option (CLAUDE.md → Repo rules:
  // media is never committed). Next's optimizer is the remaining lever.
  //
  // `unoptimized: true` came from the original v0 scaffold, not a cost decision,
  // and nothing in the app used `next/image` before this — so flipping it
  // changes no existing behaviour.
  //
  // COST CONTROL: the size lists below are deliberately short. Each source image
  // can only ever produce a handful of cached variants (≈2–3 in practice across
  // phone/desktop), and `minimumCacheTTL` pins them for a year — gallery keys
  // are immutable, so a variant never needs regenerating. Order of magnitude:
  // ~500 one-off transformations for the whole 262-piece catalog.
  // To revert: replace this whole block with `{ unoptimized: true }`. The pages
  // still work, they just serve the full-size originals.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'screensaver-assets.living-art-asset.com',
        pathname: '/gallery/**',
      },
    ],
    // Source art is already WebP; skip AVIF's slower, pricier encode.
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  transpilePackages: ['@screensaver-art/ui', '@screensaver-art/constants'],
  // Reverse-proxy PostHog through our own origin so the client SDK (posthog-js,
  // configured with api_host: '/ingest' in instrumentation-client.ts) isn't
  // blocked by ad/tracker blockers that recognise *.posthog.com. The static-asset
  // and event ingestion hosts are split out per PostHog's recommended config.
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/array/:path*',
        destination: 'https://us-assets.i.posthog.com/array/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
  // PostHog's ingestion endpoints use trailing slashes; don't 308-redirect them.
  skipTrailingSlashRedirect: true,
}

export default nextConfig
