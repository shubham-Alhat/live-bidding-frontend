"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface AuctionCardProps {
  id: string;
  title: string;
  image: string;
  currentBid: number;
  seller: {
    name: string;
    avatar: string;
  };
  viewers: number;
  category: string;
}

export function AuctionCard({
  id,
  title,
  image,
  currentBid,
  seller,
  viewers,
  category,
}: AuctionCardProps) {
  return (
    <Link href={`/home/live/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card border-border">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-48">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {/* Live Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-destructive text-destructive-foreground animate-pulse">
              Live · {viewers}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Seller Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={seller.avatar || "/placeholder.svg"}
                alt={seller.name}
              />
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {seller.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{seller.name}</span>
          </div>

          {/* Category Badge */}
          <Badge variant="outline" className="w-fit text-xs border-border">
            {category}
          </Badge>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2">
            {title}
          </h3>

          {/* Bid Info */}
          <div>
            <p className="text-xs text-muted-foreground">Current Bid</p>
            <p className="text-lg font-bold text-primary">
              ${currentBid.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
