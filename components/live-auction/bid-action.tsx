'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface BidActionProps {
  currentBid: number
  minimumBid: number
}

export function BidAction({ currentBid, minimumBid }: BidActionProps) {
  const [bidAmount, setBidAmount] = useState(minimumBid.toString())

  return (
    <div className="space-y-3 w-full">
      {/* Main Bid Button - Large and Prominent */}
      <Button className="w-full bg-accent hover:bg-accent/90 text-background h-16 text-lg font-bold rounded-full">
        Bid: ${bidAmount || minimumBid}
      </Button>

      {/* Custom Option */}
      <Button
        variant="outline"
        className="w-full border-border hover:bg-muted text-foreground h-12 font-semibold bg-white dark:bg-black rounded-full"
      >
        Custom
      </Button>
    </div>
  )
}
