"use client";
import useAuthStore from "@/store/authStore";
import { Navigation } from "./navigation";
import { AuctionCard } from "./auction-card";
import { ApiRes, Auction } from "@/types/api";
import useAuctionStore from "@/store/auctionStore";
import { useEffect, useState } from "react";
import api, { getErrorMessage } from "@/utils/api";
import { toast } from "sonner";
import { AuctionCardSkeleton } from "./auction-card-skeleton";
import useWebsocketStore, { RawDataState } from "@/store/websocketStore";
import { CategoryTabs, Sidebar, streams } from "./feed-nav";
import LivestreamGrid from "./live-stream-grid";

function HomeClient() {
  const { authUser } = useAuthStore();
  const { liveAuctions, setLiveAuctions } = useAuctionStore();
  const [loading, setLoading] = useState(true);
  const { sendWsMessage, isConnected, ws, liveAuctionsViewerCount } =
    useWebsocketStore();

  useEffect(() => {
    const getAllShows = async () => {
      try {
        const res = await api.get<ApiRes<Auction[] | []>>("/auction/get-all");

        setLiveAuctions(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };
    getAllShows();
  }, []);

  useEffect(() => {
    if (authUser && ws) {
      // send get-live-auction-state to ws
      const data: RawDataState = {
        type: "get_live_auction_feed",
        payload: {
          userId: authUser.id,
        },
      };

      console.log("control comes here.. -------");
      if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("sendMessage called...");
        sendWsMessage(data);
      }
    }
  }, [isConnected]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="mx-auto block max-w-[1440px] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
          <Sidebar />
          <main className="min-w-0 px-4 pb-12 lg:px-6 lg:pb-16 lg:pt-8">
            <CategoryTabs />
            <LivestreamGrid streams={streams} />
          </main>
        </div>
      </div>
    </>
  );
}

export default HomeClient;
