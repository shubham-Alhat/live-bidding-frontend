'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { TrendingUp } from 'lucide-react'

interface BiddingPanelProps {
  currentBid: number
  minimumBid: number
}

export function BiddingPanel({ currentBid, minimumBid }: BiddingPanelProps) {
  const [bidAmount, setBidAmount] = useState(minimumBid.toString())

  const quickBidAmounts = [
    currentBid + 100,
    currentBid + 250,
    currentBid + 500,
    currentBid + 1000,
  ]

  return (
    <Card className="bg-card border-border p-6 space-y-4">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Place Your Bid
      </h2>

      {/* Custom Bid Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Enter Bid Amount
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={minimumBid.toString()}
              className="pl-7 bg-muted/50 border-border"
              min={minimumBid}
            />
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
            Bid
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Minimum bid: ${minimumBid.toLocaleString()}
        </p>
      </div>

      {/* Quick Bid Buttons */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Quick Bid</p>
        <div className="grid grid-cols-2 gap-2">
          {quickBidAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className="border-border hover:bg-muted text-foreground bg-transparent"
            >
              ${amount.toLocaleString()}
            </Button>
          ))}
        </div>
      </div>

      {/* Bid Status */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Bid Status</span>
          <Badge className="bg-primary text-primary-foreground">Active</Badge>
        </div>
        <p className="text-sm text-foreground">
          You are not currently winning this auction
        </p>
      </div>

      {/* Important Note */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
        <p className="text-xs text-destructive font-medium">
          By bidding, you agree to purchase this item if you win the auction.
        </p>
      </div>
    </Card>
  )
}
