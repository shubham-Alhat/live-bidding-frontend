import { Auction } from "@/types/api";
import { create } from "zustand";

interface AuctionStoreState {
  liveAuctions: Auction[] | [];
  setLiveAuctions: (allAuctions: Auction[] | []) => void;
  selectedAuction: Auction | null;
  setSelectedAuction: (clickedAuction: Auction) => void;
  isAuctionEnded: boolean;
  setIsAuctionEnded: () => void;
}

const useAuctionStore = create<AuctionStoreState>((set) => ({
  liveAuctions: [],
  setLiveAuctions: (allAuctions) => {
    set({ liveAuctions: allAuctions });
  },
  selectedAuction: null,
  setSelectedAuction: (clickedAuction) => {
    set({ selectedAuction: clickedAuction });
  },
  isAuctionEnded: false,
  setIsAuctionEnded: () => {
    set({ isAuctionEnded: true });
  },
}));

export default useAuctionStore;
