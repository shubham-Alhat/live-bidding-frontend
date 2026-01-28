'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users } from 'lucide-react'

interface AuctionDetailsProps {
  title: string
  description: string
  currentBid: number
  numberOfBids: number
  timeRemaining: string
}

export function AuctionDetails({
  title,
  description,
  currentBid,
  numberOfBids,
  timeRemaining,
}: AuctionDetailsProps) {
  return (
    <Card className="bg-card border-border p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-foreground/80 leading-relaxed">{description}</p>
      </div>

      {/* Current Bid Section */}
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-2">Current Bid</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-primary">
            ${currentBid.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Bids Placed</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{numberOfBids}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Time Left</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{timeRemaining}</p>
        </div>
      </div>
    </Card>
  )
}
