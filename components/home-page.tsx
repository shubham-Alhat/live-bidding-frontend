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
import { User, User2Icon, X } from "lucide-react";
import ShowProductCard from "./show-product-card";
import { BrandMark } from "./landing-page";

function HomeClient() {
  // right side drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  // 1. Lock background scroll while open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // 2. Close on Escape
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerOpen]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navigation isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />

        <div className="mx-auto block max-w-[1440px] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
          <Sidebar />
          <main className="min-w-0 px-4 pb-12 lg:px-6 lg:pb-16 lg:pt-8">
            <CategoryTabs />
            <LivestreamGrid streams={streams} />
          </main>
        </div>
      </div>
      <div
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* DRAWER */}
      <aside
        aria-label="Profile"
        aria-hidden={!isDrawerOpen}
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col bg-background shadow-2xl
    lg:w-2/5 xl:w-1/3 2xl:w-[30%]
    lg:min-w-[400px] lg:max-w-[520px]
    will-change-transform
    transition-[transform,translate,visibility] duration-300
    ease-[cubic-bezier(0.32,0.72,0,1)]
    motion-reduce:transition-none
    ${isDrawerOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}
      >
        {/* Fixed header with close button */}
        <div className="flex shrink-0 items-center justify-between border-b border-accent px-4 py-3">
          {/* <h2 className="text-lg font-semibold">Profile</h2> */}
          <BrandMark />
          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close profile drawer"
            className="flex size-9 items-center justify-center rounded-full hover:bg-white/10 active:scale-95"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
          {/* profile content goes here; it scrolls when it grows */}
          {/* profile */}
          <button className="w-full px-2 py-3 flex gap-2 items-center justify-start bg-blue-400">
            <User size={20} />
            Profile
          </button>
        </div>
      </aside>
    </>
  );
}

export default HomeClient;
