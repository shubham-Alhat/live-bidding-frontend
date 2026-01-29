"use client";

import { Navigation } from "@/components/navigation";
import { BidLogs } from "@/components/live-auction/bid-logs";
import { BidAction } from "@/components/live-auction/bid-action";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

// Mock auction data
const auctionData = {
  id: "1",
  title: "Fragrance #114",
  image: "/placeholder.jpg",
  description: "No cancellations. 100 ML brand new",
  currentBid: 10,
  minimumBid: 11,
  numberOfBids: 11,
  timeRemaining: "00:05",
  seller: {
    name: "socalsales",
    avatar: "/placeholder-user.jpg",
    rating: 4.6,
    followers: 36,
  },
  leadingBidder: "vv34662",
  leadingBidderAvatar: "/placeholder-user.jpg",
  bidHistory: [
    {
      id: "1",
      bidder: "vv34662",
      avatar: "/placeholder-user.jpg",
      amount: 11,
      timestamp: "Just now",
      isWinning: true,
    },
    {
      id: "2",
      bidder: "CollectorPro",
      avatar: "/placeholder-user.jpg",
      amount: 10,
      timestamp: "2 min ago",
    },
    {
      id: "3",
      bidder: "FragranceHunter",
      avatar: "/placeholder-user.jpg",
      amount: 9,
      timestamp: "5 min ago",
    },
    {
      id: "4",
      bidder: "LuxeWatcher",
      avatar: "/placeholder-user.jpg",
      amount: 8,
      timestamp: "8 min ago",
    },
  ],
};

export default function LiveAuctionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  console.log("id - ", id);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Main Content - Centered */}
      <div className="flex-1 overflow-y-auto flex justify-center py-6">
        <div className="w-full max-w-6xl px-4">
          {/* Two Column Layout: Product (center) + Bid Logs (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Product Section - 3 columns centered */}
            <div className="lg:col-span-3 flex flex-col space-y-4">
              {/* Seller Info Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={auctionData.seller.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {auctionData.seller.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {auctionData.seller.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-accent">
                        ★ {auctionData.seller.rating}
                      </span>
                      <Badge className="bg-accent text-accent-foreground text-xs h-6">
                        Follow
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge className="bg-destructive text-white text-sm px-3 h-8 flex items-center gap-2">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  {auctionData.seller.followers}
                </Badge>
              </div>

              {/* Large Product Image - Main Focus */}
              <Card className="bg-black rounded-3xl overflow-hidden w-full aspect-video relative">
                <img
                  src={auctionData.image || "/placeholder.svg"}
                  alt={auctionData.title}
                  className="w-full h-full object-cover"
                />

                {/* Action Icons - Right Side */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-3 text-white transition">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-3 text-white transition">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>

                {/* Winning Status - Bottom Left */}
                <div className="absolute bottom-4 left-4">
                  <Card className="bg-black/80 backdrop-blur border border-white/10 p-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={auctionData.image || "/placeholder.svg"}
                        alt="product"
                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <Badge className="bg-destructive text-white text-xs mb-1">
                          {auctionData.leadingBidder} is Winning!
                        </Badge>
                        <p className="text-xs font-semibold text-white">
                          {auctionData.title}
                        </p>
                        <p className="text-xs text-gray-300">
                          {auctionData.numberOfBids} Bids
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Price & Timer - Bottom Right */}
                <div className="absolute bottom-6 right-6 text-white text-right">
                  <p className="text-4xl font-bold">
                    ${auctionData.currentBid}
                  </p>
                  <p className="text-sm font-semibold text-destructive">
                    {auctionData.timeRemaining}
                  </p>
                </div>
              </Card>

              {/* Product Details Below Image */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {auctionData.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {auctionData.description}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Current Bid
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ${auctionData.currentBid}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Bids</p>
                    <p className="text-lg font-bold text-foreground">
                      {auctionData.numberOfBids}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Time Left
                    </p>
                    <p className="text-lg font-bold text-destructive">
                      {auctionData.timeRemaining}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bid Action - Mobile Only */}
              <div className="lg:hidden">
                <BidAction
                  currentBid={auctionData.currentBid}
                  minimumBid={auctionData.minimumBid}
                />
              </div>
            </div>

            {/* Right Column - Bid Logs + Bid Action */}
            <div className="lg:col-span-2 flex flex-col space-y-4">
              {/* Bid Logs Container */}
              <Card className="bg-card border border-border rounded-lg overflow-hidden flex-1 flex flex-col">
                <BidLogs
                  currentWinner={auctionData.leadingBidder}
                  currentWinnerAvatar={auctionData.leadingBidderAvatar}
                  currentBidAmount={auctionData.minimumBid}
                  bidHistory={auctionData.bidHistory}
                />
              </Card>

              {/* Bid Action - Desktop Only */}
              <div className="hidden lg:block">
                <BidAction
                  currentBid={auctionData.currentBid}
                  minimumBid={auctionData.minimumBid}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
