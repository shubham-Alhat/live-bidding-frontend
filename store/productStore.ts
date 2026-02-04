import { create } from "zustand";
import { Product } from "@/types/api";

interface ProductStoreState {
  productList: Product[];
  setProductList: (productArray: Product[] | []) => void;
  addNewProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const useProductStore = create<ProductStoreState>((set, get) => ({
  productList: [],
  setProductList: (productArray) => {
    set({ productList: productArray });
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
}));

export default useProductStore;
