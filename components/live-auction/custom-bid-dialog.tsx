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

interface CustomBidDialogProps {
  currentBid: number;
  onBidSubmit?: (bidAmount: number) => void;
}

export function CustomBidDialog({
  currentBid,
  onBidSubmit,
}: CustomBidDialogProps) {
  const [bidAmount, setBidAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);

  const minimumBid = currentBid + 1.0;

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBidAmount(value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bidValue = parseFloat(bidAmount);

    if (!bidAmount || isNaN(bidValue)) {
      setError("Please enter a valid bid amount");
      return;
    }

    if (bidValue <= currentBid) {
      setError(`Bid must be greater than $${currentBid.toFixed(2)}`);
      return;
    }

    // Call the callback if provided
    if (onBidSubmit) {
      onBidSubmit(bidValue);
    }

    // Reset and close
    setBidAmount("");
    setError("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="w-full rounded-2xl text-primary cursor-pointer border border-primary/40 hover:bg-background"
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
                  min={minimumBid}
                  placeholder={minimumBid.toFixed(2)}
                  value={bidAmount}
                  onChange={handleBidChange}
                  className="pl-6"
                  autoFocus
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Minimum bid: ${minimumBid.toFixed(2)} (Current bid: $
                {currentBid.toFixed(2)})
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
