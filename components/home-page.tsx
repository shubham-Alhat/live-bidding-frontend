"use client";
import useAuthStore from "@/store/authStore";
import { Navigation } from "./navigation";
import { Sidebar } from "./sidebar";
import { AuctionCard } from "./auction-card";
import { ApiRes, ApiResponse, Auction, Product } from "@/types/api";
import useAuctionStore from "@/store/auctionStore";
import { useEffect, useState } from "react";
import api, { getErrorMessage } from "@/utils/api";
import { toast } from "sonner";
import { AuctionCardSkeleton } from "./auction-card-skeleton";

// Mock auction data
const auctions = [
  {
    id: "1",
    title: "Vintage Omega Seamaster Watch - Rare 1960s Edition",
    image: "/placeholder.jpg",
    currentBid: 4250,
    seller: { name: "LuxuryCollector", avatar: "/placeholder-user.jpg" },
    viewers: 43,
    category: "Watches",
  },
  {
    id: "2",
    title: "Original Nintendo Game Boy - Mint Condition",
    image: "/placeholder.jpg",
    currentBid: 890,
    seller: { name: "RetroGamer", avatar: "/placeholder-user.jpg" },
    viewers: 127,
    category: "Electronics",
  },
  {
    id: "3",
    title: "Signed Limited Edition Artwork by Renowned Artist",
    image: "/placeholder.jpg",
    currentBid: 12500,
    seller: { name: "ArtGallery23", avatar: "/placeholder-user.jpg" },
    viewers: 89,
    category: "Art",
  },
  {
    id: "4",
    title: "Rolex Datejust Two-Tone Stainless Steel",
    image: "/placeholder.jpg",
    currentBid: 8900,
    seller: { name: "WatchMaster", avatar: "/placeholder-user.jpg" },
    viewers: 234,
    category: "Watches",
  },
  {
    id: "5",
    title: "Apple iPhone 15 Pro Max - Sealed Original Box",
    image: "/placeholder.jpg",
    currentBid: 1200,
    seller: { name: "ElectroDeals", avatar: "/placeholder-user.jpg" },
    viewers: 156,
    category: "Electronics",
  },
  {
    id: "6",
    title: "Diamond Engagement Ring - 2.5 Carat VS1",
    image: "/placeholder.jpg",
    currentBid: 15000,
    seller: { name: "JewelryExpert", avatar: "/placeholder-user.jpg" },
    viewers: 78,
    category: "Jewelry",
  },
  {
    id: "7",
    title: "Vintage Leather Handbag - Hermès Birkin Replica Study",
    image: "/placeholder.jpg",
    currentBid: 2100,
    seller: { name: "FashionHub", avatar: "/placeholder-user.jpg" },
    viewers: 98,
    category: "Fashion",
  },
  {
    id: "8",
    title: "First Edition Harry Potter and the Philosopher's Stone",
    image: "/placeholder.jpg",
    currentBid: 5500,
    seller: { name: "BookCollector", avatar: "/placeholder-user.jpg" },
    viewers: 156,
    category: "Collectibles",
  },
];

interface AllAuctionsProps {
  allAuctions: Auction[] | [];
}

function HomeClient() {
  const { authUser } = useAuthStore();
  const { liveAuctions, setLiveAuctions } = useAuctionStore();
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex">
          <Sidebar />
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
