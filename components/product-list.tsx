"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { Empty } from "@/components/ui/empty";
import { Product } from "@/types/api";
import useProductStore from "@/store/productStore";
import { EmptyOutline } from "./empty-box";

export function ProductList() {
  const { productList } = useProductStore();

  if (productList.length === 0) {
    return <EmptyOutline />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Your Products</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
