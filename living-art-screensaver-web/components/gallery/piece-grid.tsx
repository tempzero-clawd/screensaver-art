import { PieceTile } from '@/components/gallery/piece-tile'
import type { CatalogPiece } from '@/lib/gallery-catalog'

/**
 * The responsive tile grid shared by `/gallery`, `/era/<tag>` and the "more like
 * this" rail on `/art/<slug>`. Two columns on a phone (most pin traffic is
 * mobile, and one-up tiles make the page endless), up to five on a desktop.
 *
 * The first `eagerCount` tiles skip lazy image loading — on a landing page the
 * top row is the whole first impression.
 */
export function PieceGrid({ pieces, eagerCount = 4 }: { pieces: CatalogPiece[]; eagerCount?: number }) {
  return (
    <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-3 sm:gap-[14px] lg:grid-cols-4 xl:grid-cols-5">
      {pieces.map((piece, i) => (
        <PieceTile key={piece.slug} piece={piece} priority={i < eagerCount} />
      ))}
    </div>
  )
}
