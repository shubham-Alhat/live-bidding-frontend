"use client";

import { Navigation } from "@/components/navigation";
import { BidAction } from "@/components/live-auction/bid-action";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";
import { ApiResponse, Auction } from "@/types/api";
import useWebsocketStore from "@/store/websocketStore";
import useAuthStore from "@/store/authStore";
import useAuctionStore from "@/store/auctionStore";
import { AuctionNotFound } from "@/components/auction-not-found";
import { LiveAuctionSkeleton } from "@/components/live-product-skeleton";

export default function LiveAuctionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  // console.log("id - ", id);

  const [loading, setLoading] = useState(true);
  const [isAuctionExists, setIsAuctionExists] = useState(true);
  const {
    ws,
    sendWsMessage,
    selectedLiveAuction,
    isConnected,
    setAuctionStatus,
    auctionStatus,
    currentHighestBidder,
    currentHighestBidAmount,
    bidCount,
    liveAuctionMembersCount,
    liveAuctionParticipants,
    errorMessage,
    showWinner,
  } = useWebsocketStore();
  const { authUser } = useAuthStore();
  const { setSelectedAuction, selectedAuction } = useAuctionStore();
  const [timeLeft, setTimeLeft] = useState(0);

  // Fetch live auction from db
  useEffect(() => {
    const getAuctionById = async () => {
      try {
        const res = await api.get<ApiResponse<Auction>>(
          `/auction/get-auction-by-id/${id}`,
        );
        if (res.data.data) {
          setSelectedAuction(res.data.data);
          if (res.data.data.status === "ENDED") setAuctionStatus("ended");
        } else {
          setIsAuctionExists(false);
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
        setIsAuctionExists(false);
      } finally {
        setLoading(false);
      }
    };
    getAuctionById();
  }, [id]);

  // Join ws room
  useEffect(() => {
    if (!ws || !authUser || !id) return;
    if (ws.readyState !== WebSocket.OPEN) return;

    const rawData = {
      type: "user_joined_auction_room",
      payload: {
        username: authUser.username,
        userId: authUser.id,
        auctionId: id,
      },
    };
    sendWsMessage(rawData);

    return () => {
      sendWsMessage({
        type: "leave_auction",
        payload: { username: authUser.username, auctionId: id },
      });
    };
  }, [isConnected, authUser, id]);

  // format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  function formatRelativeTime(date: number) {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    return `${Math.floor(diff / 3600)} hrs ago`;
  }

  useEffect(() => {
    if (!selectedLiveAuction) return;
    const endTimeMs = selectedLiveAuction.endTime;

    // set the time very initially
    setTimeLeft(Math.max(0, Math.floor((endTimeMs - Date.now()) / 1000)));

    const timer = setInterval(() => {
      const secondsLeft = Math.floor((endTimeMs - Date.now()) / 1000);
      if (secondsLeft <= 0) {
        // auction ended
        setAuctionStatus("ended");
        clearInterval(timer);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(secondsLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedLiveAuction]);

  if (loading) {
    return <LiveAuctionSkeleton />;
  }

  if (!isAuctionExists) {
    return <AuctionNotFound />;
  }

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        {/* Main Content - Centered */}
        <div className="flex-1 overflow-y-auto flex justify-center py-6">
          <div className="w-full max-w-6xl px-4">
            <div className="flex flex-col max-w-2xl mx-auto w-full">
              <div className="flex flex-col space-y-4 w-full">
                {/* Seller Info Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      {/* <AvatarImage
                          src={auctionData.seller.avatar || "/placeholder.svg"}
                        /> */}
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedAuction?.owner?.username[0].toUpperCase() ||
                          "NA"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {selectedAuction?.owner?.username || "XYZ"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">
                          ⭐ {"4"}
                        </span>
                        <Badge className="bg-accent text-accent-foreground text-xs h-6">
                          Follow
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-destructive text-white text-sm px-3 h-8 flex items-center gap-2">
                    <span className="relative inline-flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    {liveAuctionMembersCount}
                  </Badge>
                </div>

                {/* Large Product Image - Main Focus */}
                <Card className="bg-black rounded-3xl overflow-hidden w-full aspect-video relative">
                  <img
                    src={selectedAuction?.product?.image || "/placeholder.svg"}
                    alt={selectedAuction?.product?.name || "product name"}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-3 right-3">
                    <Card className="bg-black/80 backdrop-blur border border-white/10 p-2">
                      <div className="flex-1 min-w-0">
                        <Badge className="bg-destructive text-white text-[10px]">
                          {liveAuctionParticipants &&
                          liveAuctionParticipants.length > 0
                            ? `${liveAuctionParticipants[0].username} joined ${formatRelativeTime(liveAuctionParticipants[0].joinedAt)}!`
                            : "no participants yet.."}
                        </Badge>
                      </div>
                    </Card>
                  </div>
                  {/* timer */}
                  <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
                    <Card className="bg-black/70 backdrop-blur border border-white/20 p-3">
                      <p className="text-sm font-semibold flex flex-col items-center justify-center text-destructive">
                        {formatTime(timeLeft)}
                        {auctionStatus === "ended" && (
                          <span className="text-xs text-foreground">
                            Auction ended
                          </span>
                        )}
                      </p>
                    </Card>
                  </div>
                  {/* Price & Bidder | Starting Price - Bottom Right */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-white text-right">
                    <Card className="bg-black/70 backdrop-blur border border-white/20 px-2 py-1.5 sm:px-3 sm:py-2 flex flex-col items-center gap-0.5 sm:gap-1">
                      <p className="text-lg sm:text-2xl font-semibold leading-none">
                        $
                        {currentHighestBidAmount ??
                          selectedAuction?.startingPrice}
                      </p>
                      {currentHighestBidder && bidCount > 0 ? (
                        <p className="text-[10px] sm:text-xs font-semibold">
                          {`${currentHighestBidder} is `}
                          <span className="text-destructive">Winning!</span>
                        </p>
                      ) : (
                        <p className="text-[10px] sm:text-xs font-semibold">
                          Starting Price
                        </p>
                      )}
                    </Card>
                  </div>
                </Card>

                <div className="space-y-3">
                  {/* BidActions */}
                  <BidAction />
                </div>
                {showWinner && auctionStatus === "ended" ? (
                  <p className="w-full flex justify-center items-center text-center">
                    {`🎉 ${currentHighestBidder} won this auction for $${currentHighestBidAmount}`}
                  </p>
                ) : (
                  ""
                )}
              </div>

              {/* auction end and winner message */}
              {errorMessage && (
                <div className="w-full flex items-center text-[15px] mt-1 justify-center text-center text-destructive">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
