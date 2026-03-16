"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";
import React from "react";
import useWebsocketStore from "@/store/websocketStore";

interface BidLog {
  id: string;
  bidder: string;
  avatar: string;
  amount: number;
  timestamp: string;
  isWinning?: boolean;
}

interface BidLogsProps {
  currentWinner?: string;
  currentWinnerAvatar?: string;
  currentBidAmount?: number;
  bidHistory?: BidLog[];
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

function formatRelativeTime(date: number) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
  return `${Math.floor(diff / 3600)} hrs ago`;
}

export function BidLogs() {
  const { selectedLiveAuction } = useWebsocketStore();
  return (
    <div className="space-y-3 h-full flex flex-col">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Bid History</h3>

        {/* Current Winner Card */}
        {selectedLiveAuction?.currentHighestBid ? (
          <Card className="bg-accent/10 border border-accent/30 p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                {/* <AvatarImage
                src={currentWinnerAvatar || "/placeholder.svg"}
                alt={currentWinner}
              /> */}
                <AvatarFallback className="bg-accent text-white text-xs font-bold">
                  {selectedLiveAuction.currentHighestBid.userName
                    .slice(0, 1)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {selectedLiveAuction.currentHighestBid.userName}
                  </p>
                  <Badge className="bg-destructive text-white text-xs px-2 py-0 h-5">
                    Winning
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Current bid: ${selectedLiveAuction.currentHighestBid.amount}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          "bidding not started yet.."
        )}
      </div>

      {/* Previous Bids */}
      {selectedLiveAuction?.bids ? (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-2">
            Previous Bids
          </p>
          <ScrollArea className="h-72 rounded-lg border border-border">
            <div className="p-3 space-y-2">
              {selectedLiveAuction.bids.map((bid) => (
                <div
                  key={bid.id}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    bid.userId === selectedLiveAuction.currentHighestBid?.userId
                      ? "bg-accent/5 border border-accent/20"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    {/* <AvatarImage
                      src={bid.avatar || "/placeholder.svg"}
                      alt={bid.bidder}
                    /> */}
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                      {bid.userName.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {bid.userName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {`${formatRelativeTime(bid.timestamp)}`}
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
      ) : (
        "bidding not started yet.."
      )}
    </div>
  );
}
