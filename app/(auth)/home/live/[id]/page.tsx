"use client";

import { Navigation } from "@/components/navigation";
import { BidLogs } from "@/components/live-auction/bid-logs";
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
import { LiveProductsSkeleton } from "@/components/live-product-skeleton";

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
    setIsSelectedLiveAuctionEnded,
    isSelectedLiveAuctionEnded,
    winner,
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
          if (res.data.data.status === "ENDED")
            setIsSelectedLiveAuctionEnded(true);
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
      payload: { username: authUser.username, auctionId: id },
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
    const { endTime } = selectedLiveAuction;
    const endTimeMs = endTime * 1000; // convert back to ms

    // set the time very initially
    setTimeLeft(Math.max(0, Math.floor((endTimeMs - Date.now()) / 1000)));

    const timer = setInterval(() => {
      const secondsLeft = Math.floor((endTimeMs - Date.now()) / 1000);
      if (secondsLeft <= 0) {
        // auction ended
        clearInterval(timer);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(secondsLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedLiveAuction]);

  if (loading) {
    return <LiveProductsSkeleton />;
  }

  if (!isAuctionExists) {
    return <AuctionNotFound />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Main Content - Centered */}
      <div className="flex-1 overflow-y-auto flex justify-center py-6">
        <div className="w-full max-w-6xl px-4">
          {/* Two Column Layout: Product (center) + Bid Logs (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Product Section - 3 columns centered */}
            <div className="lg:col-span-3 flex flex-col space-y-4">
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
                      <span className="text-sm text-accent">★ {"5"}</span>
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
                  {selectedLiveAuction?.viewerCount ?? 0}
                </Badge>
              </div>

              {/* Large Product Image - Main Focus */}
              <Card className="bg-black rounded-3xl overflow-hidden w-full aspect-video relative">
                <img
                  src={selectedAuction?.product?.image || "/placeholder.svg"}
                  alt={selectedAuction?.product?.name || "product name"}
                  className="w-full h-full object-cover"
                />

                {/* Action Icons - Right Side */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-3 text-white transition">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-3 text-white transition">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>

                {/* participants - Bottom Left */}
                <div className="absolute bottom-4 left-4">
                  <Card className="bg-black/80 backdrop-blur border border-white/10 p-3">
                    <div className="flex items-start gap-3">
                      {/* <img
                        src={auctionData.image || "/placeholder.svg"}
                        alt="product"
                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                      /> */}
                      <div className="flex-1 min-w-0">
                        <Badge className="bg-destructive text-white text-xs mb-1">
                          {selectedLiveAuction
                            ? `${selectedLiveAuction.participants[selectedLiveAuction.participants.length - 1].username} joined ${formatRelativeTime(selectedLiveAuction.participants[selectedLiveAuction.participants.length - 1].joinedAt)}!`
                            : "no participants yet.."}
                        </Badge>
                        <p className="text-xs font-semibold text-white">
                          {selectedAuction?.product?.name || "product-name"}
                        </p>
                        <p className="text-xs text-gray-300">
                          {selectedLiveAuction?.bids.length ?? 0} Bids
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Price & Timer - Bottom Right */}
                <div className="absolute bottom-6 right-6 text-white text-right">
                  <p className="text-4xl font-bold">
                    ${selectedLiveAuction?.currentHighestBid?.amount ?? 0}
                  </p>
                  <p className="text-sm font-semibold text-destructive">
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </Card>

              {/* Product Details Below Image */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {selectedAuction?.product?.name || "product-name"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {"description of product"}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Current Bid
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ${selectedLiveAuction?.currentHighestBid?.amount ?? 0}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Bids</p>
                    <p className="text-lg font-bold text-foreground">
                      {selectedLiveAuction?.bids.length ?? 0}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Time Left
                    </p>
                    <p className="text-lg font-bold text-destructive">
                      {formatTime(timeLeft)}
                    </p>
                    <span>
                      {isSelectedLiveAuctionEnded ? (
                        <p>Auction Ended</p>
                      ) : (
                        <span></span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Bid Logs + Bid Action */}
            <div className="lg:col-span-2 flex flex-col space-y-4">
              {/* Bid Logs Container */}
              <Card className="bg-card border border-border rounded-lg flex-1 flex flex-col">
                <BidLogs />
              </Card>

              {/* Bid Action - Desktop Only */}
              <div className="hidden lg:block">
                <BidAction />
              </div>
            </div>
          </div>
          <div className="text-2xl font-medium">
            {winner && isSelectedLiveAuctionEnded
              ? `Winner - ${selectedLiveAuction?.currentHighestBid?.userName}`
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
