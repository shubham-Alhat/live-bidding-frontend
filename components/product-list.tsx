"use client";

import { useEffect } from "react";

import { getAllProductResponse, Product } from "@/types/api";
import useProductStore from "@/store/productStore";
import { EmptyOutline } from "./empty-box";
import ProductCard from "./product-card";
import api, { getErrorMessage } from "@/utils/api";
import { toast } from "sonner";

export function ProductList() {
  const { productList, setProductList } = useProductStore();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res =
          await api.get<getAllProductResponse<Product[] | null>>(
            "/product/get-all",
          );

        console.log(res);
        if (!res.data.data) {
          setProductList([]);
          toast.error("No products available!");
          return;
        }
        setProductList(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error(getErrorMessage(error));
      }
    };

    getAllProducts();
  }, []);

  if (productList.length === 0) {
    return <EmptyOutline />;
  }

  return (
    <>
      <h1 className="flex justify-start items-center ml-3 text-lg sm:text-xl">
        Your Products
      </h1>
      <div className="mx-auto w-full">
        <div
          className="
          grid grid-cols-2 gap-x-3 gap-y-6
          sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8"
        >
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
