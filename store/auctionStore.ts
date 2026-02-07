import { Auction } from "@/types/api";
import { create } from "zustand";

interface AuctionStoreState {
  liveAuctions: Auction[] | [];
  setLiveAuctions: (allAuctions: Auction[] | []) => void;
  selectedAuction: Auction | null;
  setSelectedAuction: (clickedAuction: Auction) => void;
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
}));

export default useAuctionStore;
