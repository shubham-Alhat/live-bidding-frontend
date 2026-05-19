"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CustomBidDialog } from "./custom-bid-dialog";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";
import useAuctionStore from "@/store/auctionStore";
import { ApiResponse, Bid } from "@/types/api";
import useWebsocketStore from "@/store/websocketStore";
import useAuthStore from "@/store/authStore";

export function BidAction() {
  const { selectedAuction } = useAuctionStore();
  const {
    selectedLiveAuction,
    ws,
    sendWsMessage,

    bidCount,
    currentHighestBidAmount,
    nextMinBidAmount,
  } = useWebsocketStore();
  const { authUser } = useAuthStore();

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] gap-2 h-10">
        <CustomBidDialog />
        <Button
          onClick={}
          disabled={}
          className="bg-primary h-full hover:bg-primary/80 cursor-pointer text-background font-bold rounded-full"
        >
          Bid: $
          {/* {selectedLiveAuction?.currentHighestBid?.amount != null
                ? selectedLiveAuction.currentHighestBid.amount + 1
                : (selectedLiveAuction?.startingPrice ?? 0) + 1} */}
          {/* {selectedLiveAuction?.nextBidAmount ?? 1} */}
          {"33"}
        </Button>
        <div className="h-full px-3 flex items-center justify-center rounded-2xl text-primary border border-primary/30">
          {`${bidCount} bids`}
        </div>
      </div>
    </>
  );
}
