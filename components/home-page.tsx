"use client";
import useAuthStore from "@/store/authStore";
import { Navigation } from "./navigation";
import { AuctionCard } from "./auction-card";
import { ApiRes, ApiResponse, Auction, Product } from "@/types/api";
import useAuctionStore from "@/store/auctionStore";
import { useEffect, useState } from "react";
import api, { getErrorMessage } from "@/utils/api";
import { toast } from "sonner";
import { AuctionCardSkeleton } from "./auction-card-skeleton";
import useWebsocketStore from "@/store/websocketStore";
import { Button } from "./ui/button";

interface AllAuctionsProps {
  allAuctions: Auction[] | [];
}

function HomeClient() {
  const { authUser } = useAuthStore();
  const { liveAuctions, setLiveAuctions } = useAuctionStore();
  const [loading, setLoading] = useState(true);
  const { connectToWsServer, disconnectToWsServer } = useWebsocketStore();

  useEffect(() => {
    const getAllAuctions = async () => {
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
    getAllAuctions();
  }, []);

  useEffect(() => {
    if (authUser?.id) {
      connectToWsServer(authUser.id);
    }

    return () => {
      disconnectToWsServer();
    };
  }, [authUser?.id]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="flex">
          <main className="flex-1 p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Live Auctions
              </h1>
              <p className="text-muted-foreground">
                Explore and bid on premium items in real-time
              </p>
            </div>

            {/* Grid of Auction Cards */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <AuctionCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {liveAuctions.length === 0
                  ? "Sorry no live auctions available"
                  : liveAuctions.map((auction) => (
                      <AuctionCard key={auction.id} auction={auction} />
                    ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default HomeClient;
