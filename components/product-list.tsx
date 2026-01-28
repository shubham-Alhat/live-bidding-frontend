"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { Empty } from "@/components/ui/empty";
import { Product } from "@/app/(auth)/home/create/page";

interface ProductListProps {
  products: Product[];
  onLaunch: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductList({
  products,
  onLaunch,
  onDelete,
}: ProductListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (products.length === 0) {
    return (
      <Empty
        icon={"📦"}
        title="No Products Yet"
        description="Create your first auction product to get started"
      />
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Your Products</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onLaunch={() => onLaunch(product.id)}
            onDelete={() => {
              setDeletingId(product.id);
              onDelete(product.id);
            }}
            isDeleting={deletingId === product.id}
          />
        ))}
      </div>
    </div>
  );
}
