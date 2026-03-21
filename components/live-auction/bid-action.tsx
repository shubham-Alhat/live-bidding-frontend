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
  const { selectedLiveAuction, ws, sendWsMessage, isSelectedLiveAuctionEnded } =
    useWebsocketStore();
  const { authUser } = useAuthStore();
  const [newBidAmount, setNewBidAmount] = useState(
    selectedLiveAuction?.startingPrice,
  );

  const handleDirectBid = async () => {
    console.log("auction data:", selectedLiveAuction);

    if (selectedLiveAuction?.currentHighestBid?.amount) {
      setNewBidAmount(selectedLiveAuction.currentHighestBid.amount + 1);
    } else {
      setNewBidAmount(
        selectedLiveAuction?.startingPrice
          ? selectedLiveAuction.startingPrice + 1
          : 1,
      );
    }
    try {
      const rawData = {
        type: "new_bid",
        payload: {
          userId: authUser,
          username: authUser?.username,
          bidAmount: selectedLiveAuction?.nextBidAmount,
          timestamp: Date.now(),
          auctionId: selectedLiveAuction?.auctionId,
        },
      };

      console.log("rawData checks please..", rawData);
      sendWsMessage(rawData);
      const res = await api.post<ApiResponse<Bid>>("/bid/create", {
        price: newBidAmount,
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
        disabled={isSelectedLiveAuctionEnded}
        className="w-full bg-primary hover:bg-primary/80 cursor-pointer text-background h-16 text-lg font-bold rounded-full"
      >
        Bid: $
        {/* {selectedLiveAuction?.currentHighestBid?.amount != null
          ? selectedLiveAuction.currentHighestBid.amount + 1
          : (selectedLiveAuction?.startingPrice ?? 0) + 1} */}
        {selectedLiveAuction?.nextBidAmount ?? 1}
      </Button>

      {/* Custom Option */}

      {/* <CustomBidDialog currentBid={currentBid} /> */}
    </div>
  );
}
