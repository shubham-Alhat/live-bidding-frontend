import { Auction } from "@/types/api";
import { create } from "zustand";

interface AuctionStoreState {
  liveAuctions: Auction[] | [];
  setLiveAuction: (allProducts: Auction[] | []) => void;
}

const useAuctionStore = create<AuctionStoreState>((set) => ({
  liveAuctions: [],
  setLiveAuction: (allProducts) => {
    set({ liveAuctions: allProducts });
  },
}));

export default useAuctionStore;
