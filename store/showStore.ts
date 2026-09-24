import { create } from "zustand";
import { Show } from "@/types/api";

interface ShowStoreState {
  showList: Show[];
  setShowList: (showArray: Show[] | []) => void;
  addNewShow: (show: Show) => void;
}

const useShowStore = create<ShowStoreState>((set, get) => ({
  showList: [],
  setShowList: (showArray) => {
    set({ showList: showArray });
  },
  addNewShow(show) {
    set((state) => ({ showList: [...state.showList, show] }));
  },
}));

export default useShowStore;
