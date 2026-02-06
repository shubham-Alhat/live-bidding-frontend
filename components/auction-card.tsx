"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { Auction } from "@/types/api";

interface AuctionCardProps {
  auction: Auction;
}

export function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <Link href={`/home/live/${auction.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-card border-border">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-48">
          <Image
            src={auction.product?.image || "/image.jpg"}
            alt="Image-Product"
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {/* Live Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-destructive text-destructive-foreground animate-pulse">
              Live · {23}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Seller Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={auction.owner?.username.slice(0, 1) || "/placeholder.svg"}
                alt="user-image"
              />
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {auction.owner?.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {auction.owner?.username}
            </span>
          </div>

          {/* Category Badge */}
          <Badge variant="outline" className="w-fit text-xs border-border">
            {"all category"}
          </Badge>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2">
            {auction.product?.name}
          </h3>

          {/* Bid Info */}
          <div>
            <p className="text-xs text-muted-foreground">intial amount</p>
            <p className="text-lg font-bold text-primary">
              ${auction.product?.initialPrice}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
