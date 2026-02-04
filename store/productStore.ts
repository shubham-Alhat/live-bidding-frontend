import { create } from "zustand";
import { Product } from "@/types/api";

interface ProductStoreState {
  productList: Product[];
  addNewProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
}

const useProductStore = create<ProductStoreState>((set, get) => ({
  productList: [],
  addNewProduct: (product) => {
    set((state) => ({ productList: [...state.productList, product] }));
  },
  deleteProduct: (product) => {
    const filteredProductList = get().productList.filter(
      (arrayProduct) => arrayProduct.id !== product.id,
    );

    set({ productList: filteredProductList });
  },
}));

export default useProductStore;
