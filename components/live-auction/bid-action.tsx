"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CustomBidDialog } from "./custom-bid-dialog";

interface BidActionProps {
  currentBid: number;
  minimumBid: number;
}

export function BidAction({ currentBid, minimumBid }: BidActionProps) {
  const [bidAmount, setBidAmount] = useState(minimumBid.toString());

  return (
    <div className="space-y-3 w-full">
      {/* Main Bid Button - Large and Prominent */}
      <Button className="w-full bg-primary hover:bg-primary/80 cursor-pointer text-background h-16 text-lg font-bold rounded-full">
        Bid: ${bidAmount || minimumBid}
      </Button>

      {/* Custom Option */}

      <CustomBidDialog currentBid={currentBid} />
    </div>
  );
}
