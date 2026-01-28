'use client'

import { Star } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface SellerInfoProps {
  name: string
  avatar: string
  rating: number
  reviews: number
}

export function SellerInfo({ name, avatar, rating, reviews }: SellerInfoProps) {
  return (
    <Card className="bg-card border-border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating)
                        ? 'fill-chart-4 text-chart-4'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {rating} ({reviews} reviews)
              </span>
            </div>
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Follow
        </Button>
      </div>
    </Card>
  )
}
