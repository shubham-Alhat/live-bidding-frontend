"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CustomBidDialog } from "./custom-bid-dialog";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";
import useAuctionStore from "@/store/auctionStore";
import { ApiResponse, Bid } from "@/types/api";

interface BidActionProps {
  currentBid: number;
  minimumBid: number;
}

export function BidAction({ currentBid, minimumBid }: BidActionProps) {
  const [bidAmount, setBidAmount] = useState(minimumBid.toString());
  const { selectedAuction } = useAuctionStore();

  const handleDirectBid = async () => {
    try {
      const res = await api.post<ApiResponse<Bid>>("/bid/create", {
        price: bidAmount,
        auctionId: selectedAuction?.id,
      });

      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-3 w-full">
      {/* Main Bid Button - Large and Prominent */}
      <Button
        onClick={handleDirectBid}
        className="w-full bg-primary hover:bg-primary/80 cursor-pointer text-background h-16 text-lg font-bold rounded-full"
      >
        Bid: ${bidAmount || minimumBid}
      </Button>

      {/* Custom Option */}

      <CustomBidDialog currentBid={currentBid} />
    </div>
  );
}
