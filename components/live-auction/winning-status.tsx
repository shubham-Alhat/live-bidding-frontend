'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface WinningStatusProps {
  leadingBidder: string
  leadingBidderAvatar: string
  leadingBidAmount: number
  productTitle: string
  productImage: string
  numberOfBids: number
}

export function WinningStatus({
  leadingBidder,
  leadingBidderAvatar,
  leadingBidAmount,
  productTitle,
  productImage,
  numberOfBids,
}: WinningStatusProps) {
  return (
    <Card className="bg-gradient-to-b from-destructive/20 to-destructive/10 border border-destructive/20 p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
          <img
            src={productImage || '/placeholder.svg'}
            alt={productTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-destructive text-white text-xs">
              {leadingBidder} is Winning!
            </Badge>
          </div>
          <p className="text-xs font-medium text-foreground/90 line-clamp-2 mb-2">
            {productTitle}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-foreground/70">{numberOfBids} Bids</p>
            <p className="text-lg font-bold text-destructive">
              ${leadingBidAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
