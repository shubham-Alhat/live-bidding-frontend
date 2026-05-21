"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useWebsocketStore from "@/store/websocketStore";
import useAuctionStore from "@/store/auctionStore";
import useAuthStore from "@/store/authStore";

export function CustomBidDialog() {
  const [bidAmount, setBidAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);

  const {
    selectedLiveAuction,
    currentHighestBidAmount,
    nextMinBidAmount,
    sendWsMessage,
    auctionStatus,
  } = useWebsocketStore();

  const { selectedAuction } = useAuctionStore();
  const { authUser } = useAuthStore();

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBidAmount(value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bidValue = Number(bidAmount);

    if (!bidAmount || isNaN(bidValue)) {
      setError("Please enter a valid bid amount");
      return;
    }

    if (bidValue <= currentHighestBidAmount) {
      setError(
        `Bid must be greater than $${currentHighestBidAmount.toFixed(2)}`,
      );
      return;
    }

    // call to server
    // console.log(bidValue);
    const rawData = {
      type: "new_bid",
      payload: {
        username: authUser?.username,
        bidAmount: bidValue,
        auctionId: selectedLiveAuction?.auctionId ?? selectedAuction?.id,
      },
    };

    sendWsMessage(rawData);
    console.log("raw data send 02 - ", Date.now());

    // Reset and close
    setBidAmount("");
    setError("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={auctionStatus === "ended"}
          variant={"secondary"}
          className="h-full rounded-2xl text-primary cursor-pointer border border-primary/40 hover:bg-background"
        >
          Custom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Place a Custom Bid</DialogTitle>
            <DialogDescription>
              Enter your custom bid amount for this item
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bid-amount">Bid Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground font-medium">
                  $
                </span>
                <Input
                  id="bid-amount"
                  type="number"
                  step="1"
                  min={nextMinBidAmount}
                  placeholder={nextMinBidAmount.toFixed(2)}
                  value={bidAmount}
                  onChange={handleBidChange}
                  className="pl-6"
                  autoFocus
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Minimum bid: ${nextMinBidAmount.toFixed(2)} (Current bid: $
                {currentHighestBidAmount.toFixed(2)})
              </p>
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Place Bid
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
