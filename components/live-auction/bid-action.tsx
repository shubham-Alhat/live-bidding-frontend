"use client";

import { Button } from "@/components/ui/button";
import { CustomBidDialog } from "./custom-bid-dialog";
import useAuctionStore from "@/store/auctionStore";
import useWebsocketStore from "@/store/websocketStore";
import useAuthStore from "@/store/authStore";

export function BidAction() {
  const { selectedAuction } = useAuctionStore();
  const {
    selectedLiveAuction,
    sendWsMessage,
    bidCount,
    nextMinBidAmount,
    auctionStatus,
  } = useWebsocketStore();
  const { authUser } = useAuthStore();

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] gap-2 h-10">
        <CustomBidDialog />
        <Button
          onClick={() => {
            const bidAmount = nextMinBidAmount;
            const rawData = {
              type: "new_bid",
              payload: {
                username: authUser?.username,
                bidAmount: bidAmount,
                auctionId:
                  selectedLiveAuction?.auctionId ?? selectedAuction?.id,
              },
            };

            sendWsMessage(rawData);
            console.log("raw data send - ", Date.now());
          }}
          disabled={auctionStatus === "ended"}
          className="bg-primary h-full hover:bg-primary/80 cursor-pointer text-background font-bold rounded-full"
        >
          {`Bid: $${nextMinBidAmount}`}
        </Button>
        <div className="h-full px-3 flex items-center justify-center rounded-2xl text-primary border border-primary/30">
          {`${bidCount} bids`}
        </div>
      </div>
    </>
  );
}
