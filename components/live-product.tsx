"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Auction, Product } from "@/types/api";
import useAuctionStore from "@/store/auctionStore";
import useWebsocketStore from "@/store/websocketStore";
import useAuthStore from "@/store/authStore";

interface LiveProductPageProps {
  auction: Auction;
}

export default function LiveProductsPage({ auction }: LiveProductPageProps) {
  const {
    selectedLiveAuction,
    isSelectedLiveAuctionEnded,
    ws,
    sendWsMessage,
    isConnected,
  } = useWebsocketStore();
  const { authUser } = useAuthStore();

  const [timeLeft, setTimeLeft] = useState(0);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Join ws room
  useEffect(() => {
    if (!ws || !authUser || auction.id) return;
    if (ws.readyState !== WebSocket.OPEN) return;

    const rawData = {
      type: "user_joined_auction_room",
      payload: { username: authUser.username, auctionId: auction.id },
    };
    sendWsMessage(rawData);

    return () => {
      sendWsMessage({
        type: "leave_auction",
        payload: { username: authUser.username, auctionId: auction.id },
      });
    };
  }, [isConnected, authUser, auction.id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!selectedLiveAuction) return;
    const { endTime } = selectedLiveAuction;
    // convert back to ms
    const endTimeMs = endTime * 1000;

    // set the time very initially
    setTimeLeft(Math.max(0, Math.floor((endTimeMs - Date.now()) / 1000)));

    const timer = setInterval(() => {
      const secondsLeft = Math.floor((endTimeMs - Date.now()) / 1000);
      if (secondsLeft <= 0) {
        // auction ended
        clearInterval(timer);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(secondsLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedLiveAuction]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header with Product Name and Live Indicator */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">
              {auction.product?.name}
            </h1>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 animate-pulse rounded-full bg-destructive"
                aria-label="live indicator"
              />
              <span className="text-sm font-semibold text-destructive">
                live
              </span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              Time Left
            </p>
            <div className="rounded-lg border border-primary bg-card px-4 py-2">
              <p className="font-mono text-2xl font-bold text-primary">
                {isSelectedLiveAuctionEnded ? (
                  <span>Auction Ended..</span>
                ) : (
                  formatTime(timeLeft)
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Main Card Container */}
        <Card className="border-border bg-card">
          <div className="p-6">
            {/* Bid Logs Section */}
            <div className="mb-4">
              <h2 className="mb-4 text-lg font-semibold text-card-foreground">
                Live Bid Activity
              </h2>

              {/* Scrollable Logs Container */}
              <ScrollArea className="h-80 overflow-y-auto rounded-lg border border-border bg-background p-4 scroll-smooth">
                {selectedLiveAuction?.bids.length === 0 ? (
                  <div>bidding not yet started..</div>
                ) : (
                  <div className="space-y-2">
                    {selectedLiveAuction?.bids.map((bid) => (
                      <div
                        key={bid.id}
                        className="flex items-center justify-between rounded-md bg-muted/50 p-3 transition-colors hover:bg-muted"
                      >
                        <span className="font-medium text-foreground">
                          {bid.userName}
                        </span>
                        <Badge variant="secondary" className="ml-auto">
                          ${bid.amount.toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Winner/Sold Section */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Current Highest Bid
              </p>
              <div className="flex items-center justify-between">
                {selectedLiveAuction?.currentHighestBid ? (
                  <p className="text-lg font-semibold text-foreground">
                    Sold for $
                    {selectedLiveAuction?.currentHighestBid?.amount.toLocaleString()}{" "}
                    to {selectedLiveAuction?.currentHighestBid?.userName}
                  </p>
                ) : (
                  <p>bidding not yet started..</p>
                )}
                {selectedLiveAuction?.currentHighestBid ? (
                  <p className="text-sm text-primary animate-pulse bg-red-600 rounded-3xl px-2.5 py-1 font-semibold">
                    winning...
                  </p>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
