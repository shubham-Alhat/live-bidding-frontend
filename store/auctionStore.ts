import { Auction } from "@/types/api";
import { create } from "zustand";

interface AuctionStoreState {
  liveAuctions: Auction[] | [];
  setLiveAuctions: (allAuctions: Auction[] | []) => void;
}

const useAuctionStore = create<AuctionStoreState>((set) => ({
  liveAuctions: [],
  setLiveAuctions: (allAuctions) => {
    set({ liveAuctions: allAuctions });
  },
}));

export default useAuctionStore;
