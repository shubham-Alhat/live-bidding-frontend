"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/api";

interface BidLog {
  id: string;
  username: string;
  amount: number;
  timestamp: number;
}

interface LiveProductPageProps {
  product: Product;
  id: string;
}

export default function LiveProductsPage({
  product,
  id,
}: LiveProductPageProps) {
  const [bids, setBids] = useState<BidLog[]>([
    {
      id: "1",
      username: "John_Doe",
      amount: 150,
      timestamp: 42526228292 - 5000,
    },
    {
      id: "2",
      username: "Jane_Smith",
      amount: 160,
      timestamp: 20286463963 - 3000,
    },
    {
      id: "3",
      username: "Mike_Johnson",
      amount: 175,
      timestamp: 6729647443 - 1000,
    },
  ]);

  const [timeLeft, setTimeLeft] = useState(360); // 6 minutes in seconds
  const [highestBid, setHighestBid] = useState(175);
  const [winnerUsername, setWinnerUsername] = useState("Mike_Johnson");
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Simulate live bid updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newBid: BidLog = {
        id: Date.now().toString(),
        username: ["Alice_Brown", "Bob_Wilson", "Carol_Davis", "David_Lee"][
          Math.floor(Math.random() * 4)
        ],
        amount: highestBid + Math.floor(Math.random() * 50) + 5,
        timestamp: Date.now(),
      };

      setBids((prev) => [...prev, newBid]);
      setHighestBid(newBid.amount);
      setWinnerUsername(newBid.username);
    }, 3000);

    return () => clearInterval(interval);
  }, [highestBid]);

  // Auto-scroll to latest bid
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bids]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header with Product Name and Live Indicator */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">
              {product?.name}
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
                {formatTime(product.durationInSeconds)}
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
                <div className="space-y-2">
                  {bids.map((bid) => (
                    <div
                      key={bid.id}
                      className="flex items-center justify-between rounded-md bg-muted/50 p-3 transition-colors hover:bg-muted"
                    >
                      <span className="font-medium text-foreground">
                        {bid.username}
                      </span>
                      <Badge variant="secondary" className="ml-auto">
                        ${bid.amount.toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Winner/Sold Section */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Current Highest Bid
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-foreground">
                  Sold for ${highestBid.toLocaleString()} to {winnerUsername}
                </p>
                <p className="text-sm text-primary animate-pulse bg-red-600 rounded-3xl px-2.5 py-1 font-semibold">
                  winning...
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
