"use client";

import useProductStore from "@/store/productStore";
import { Product } from "@/types/api";
import api, { getErrorMessage } from "@/utils/api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SUFFIXES = ["", "K", "M", "B", "T"];

export function formatPrice(price: number): string {
  // 1. Force to number, drop decimals (truncate, no rounding)
  const num = Math.trunc(Number(price));

  if (!Number.isFinite(num)) return "0";

  const sign = num < 0 ? "-" : "";
  const abs = Math.abs(num);

  // 2. Up to 4 digits: return as-is
  if (abs < 10_000) return `${sign}${abs}`;

  // 3. Beyond 4 digits: abbreviate
  const tier = Math.min(Math.floor(Math.log10(abs) / 3), SUFFIXES.length - 1);
  const scaled = Math.trunc((abs / 10 ** (tier * 3)) * 10) / 10; // 1 decimal, truncated

  return `${sign}${scaled}${SUFFIXES[tier]}`;
}

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (productId: string) => {
    setLoading(true);

    try {
      const res = await api.delete(`/product/${productId}`);
      console.log(res);
      deleteProduct(productId);
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col cursor-pointer hover:opacity-85 transition-opacity duration-200">
        <div className="aspect-4/5 w-full overflow-hidden rounded-xl relative">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {/* delete btn */}
          <button
            onClick={() => handleDeleteProduct(product.id)}
            disabled={loading}
            aria-label="Delete product"
            className="absolute top-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-card/50 hover:text-destructive transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="block h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent" />
            ) : (
              <Trash2 size={20} />
            )}
          </button>
        </div>
        <div className="flex flex-1 flex-col px-0.5 pt-2.5">
          <h3
            title={product.name}
            className="truncate text-sm font-semibold text-primary sm:text-base w-full"
          >
            {product.name}
          </h3>

          <p
            title={product.description}
            aria-label={product.description}
            className="mt-1 truncate text-xs text-muted-foreground sm:text-sm w-full"
          >
            {product.description}
          </p>

          {/* mt-auto pins prices to the bottom so cards in a row align */}
          <dl className="mt-auto flex items-end justify-between gap-2 pt-2">
            <div>
              <dt className="text-xs text-primary/50">Starts at</dt>
              <dd className="text-sm font-medium text-primary">
                ₹{formatPrice(Number(product.startingPrice))}
              </dd>
            </div>
            <div className="text-right">
              <dt className="text-xs text-primary/50">Buy now</dt>
              <dd className="text-sm font-bold text-primary">
                ₹{formatPrice(Number(product.buyNowPrice))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
