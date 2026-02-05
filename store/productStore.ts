import { create } from "zustand";
import { Product } from "@/types/api";

interface ProductStoreState {
  productList: Product[];
  setProductList: (productArray: Product[] | []) => void;
  addNewProduct: (product: Product) => void;
  updateLaunchedProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  launchedProduct: Product | null;
  setLaunchedProduct: (product: Product) => void;
}

const useProductStore = create<ProductStoreState>((set, get) => ({
  productList: [],
  setProductList: (productArray) => {
    set({ productList: productArray });
  },
  updateLaunchedProduct: (product) => {
    set({
      productList: get().productList.map((pd) =>
        pd.id === product.id ? { ...pd, status: "LIVE" } : pd,
      ),
    });
  },
  addNewProduct: (product) => {
    set((state) => ({ productList: [...state.productList, product] }));
  },
  deleteProduct: (productId) => {
    const filteredProductList = get().productList.filter(
      (arrayProduct) => arrayProduct.id !== productId,
    );

    set({ productList: filteredProductList });
  },

  launchedProduct: null,
  setLaunchedProduct: (product) => {
    set({ launchedProduct: product });
  },
}));

export default useProductStore;
