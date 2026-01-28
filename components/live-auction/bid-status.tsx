'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Trophy } from 'lucide-react'

interface BidStatusProps {
  leadingBidder: string
  leadingBidderAvatar: string
  leadingBidAmount: number
}

export function BidStatus({
  leadingBidder,
  leadingBidderAvatar,
  leadingBidAmount,
}: BidStatusProps) {
  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-chart-4" />
        <h2 className="text-lg font-semibold text-foreground">Leading Bid</h2>
      </div>

      <div className="space-y-4">
        {/* Current Leader */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-3">Current Winner</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={leadingBidderAvatar || "/placeholder.svg"}
                  alt={leadingBidder}
                />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {leadingBidder.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{leadingBidder}</p>
                <Badge variant="secondary" className="mt-1 text-xs bg-primary/20 text-primary border-0">
                  Winning
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Winning Bid</p>
              <p className="text-xl font-bold text-primary">
                ${leadingBidAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Bid Increment Info */}
        <div className="bg-muted/30 rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">
            Each bid must exceed the current bid by at least $50
          </p>
        </div>
      </div>
    </Card>
  )
}
