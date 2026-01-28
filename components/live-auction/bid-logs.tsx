'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

interface BidLog {
  id: string
  bidder: string
  avatar: string
  amount: number
  timestamp: string
  isWinning?: boolean
}

interface BidLogsProps {
  currentWinner?: string
  currentWinnerAvatar?: string
  currentBidAmount?: number
  bidHistory?: BidLog[]
}

export function BidLogs({
  currentWinner = 'vv34662',
  currentWinnerAvatar = '/placeholder-user.jpg',
  currentBidAmount = 11,
  bidHistory = [
    {
      id: '1',
      bidder: 'vv34662',
      avatar: '/placeholder-user.jpg',
      amount: 11,
      timestamp: 'Just now',
      isWinning: true,
    },
    {
      id: '2',
      bidder: 'CollectorPro',
      avatar: '/placeholder-user.jpg',
      amount: 10,
      timestamp: '2 minutes ago',
    },
    {
      id: '3',
      bidder: 'FragranceHunter',
      avatar: '/placeholder-user.jpg',
      amount: 9,
      timestamp: '5 minutes ago',
    },
    {
      id: '4',
      bidder: 'LuxeWatcher',
      avatar: '/placeholder-user.jpg',
      amount: 8,
      timestamp: '8 minutes ago',
    },
    {
      id: '5',
      bidder: 'BidderX',
      avatar: '/placeholder-user.jpg',
      amount: 7,
      timestamp: '12 minutes ago',
    },
  ],
}: BidLogsProps) {
  return (
    <div className="space-y-3 h-full flex flex-col">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Bid History</h3>
        
        {/* Current Winner Card */}
        <Card className="bg-accent/10 border border-accent/30 p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={currentWinnerAvatar || "/placeholder.svg"} alt={currentWinner} />
              <AvatarFallback className="bg-accent text-white text-xs font-bold">
                {currentWinner.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground truncate">
                  {currentWinner}
                </p>
                <Badge className="bg-destructive text-white text-xs px-2 py-0 h-5">
                  Winning
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Current bid: ${currentBidAmount}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Previous Bids */}
      <div className="flex-1 min-h-0">
        <p className="text-xs text-muted-foreground font-medium mb-2">
          Previous Bids
        </p>
        <ScrollArea className="h-full rounded-lg border border-border">
          <div className="p-3 space-y-2">
            {bidHistory.map((bid) => (
              <div
                key={bid.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  bid.isWinning
                    ? 'bg-accent/5 border border-accent/20'
                    : 'hover:bg-muted/50'
                }`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={bid.avatar || "/placeholder.svg"} alt={bid.bidder} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                    {bid.bidder.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {bid.bidder}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {bid.timestamp}
                  </p>
                </div>
                <p className="text-sm font-bold text-primary flex-shrink-0">
                  ${bid.amount}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
