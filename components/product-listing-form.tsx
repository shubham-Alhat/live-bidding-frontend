"use client";

import { useState } from "react";
import { MediaUploader } from "./media-uploader";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";
import { ApiResponse, Product } from "@/types/api";

// ---- limits (adjust as needed) ----
const MIN_PRICE = 1; // ₹
const MAX_PRICE = 10_000_000; // ₹1 crore

/** Keep digits only and drop leading zeros, so "0", "007", "1.5", "abc" can't exist. */
const sanitizeInteger = (value: string) =>
  value.replace(/\D/g, "").replace(/^0+/, "");

/** Strict check: a string of digits, no leading zero, within [min, max]. */
const validateInteger = (
  raw: string,
  label: string,
  min: number,
  max: number,
): string | null => {
  const value = raw.trim();

  if (value === "") return `${label} is required!`;

  // only digits, no decimals, no signs, no exponent ("1e3"), no leading zero
  if (!/^[1-9]\d*$/.test(value)) {
    return `${label} must be a whole number (no decimals or characters)!`;
  }

  const num = Number(value);

  if (!Number.isSafeInteger(num)) return `${label} is too large!`;
  if (num < min)
    return `${label} must be at least ${min.toLocaleString("en-IN")}!`;
  if (num > max)
    return `${label} cannot be more than ${max.toLocaleString("en-IN")}!`;

  return null;
};

export default function ProductListingForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = async () => {
    if (loading) return; // prevent double submit

    // ---- validation (runs BEFORE loading starts) ----
    if (!name.trim()) {
      toast.warning("Name field is required!");
      return;
    }

    if (!description.trim()) {
      toast.warning("Description field is required!");
      return;
    }

    const startingPriceError = validateInteger(
      startingPrice,
      "Starting price",
      MIN_PRICE,
      MAX_PRICE,
    );
    if (startingPriceError) {
      toast.warning(startingPriceError);
      return;
    }

    const buyNowPriceError = validateInteger(
      buyNowPrice,
      "Buy now price",
      MIN_PRICE,
      MAX_PRICE,
    );
    if (buyNowPriceError) {
      toast.warning(buyNowPriceError);
      return;
    }

    // buy now must be higher than the starting price, otherwise the auction is pointless
    if (Number(buyNowPrice) <= Number(startingPrice)) {
      toast.warning("Buy now price must be greater than the starting price!");
      return;
    }

    // check images
    if (files.length < 1) {
      toast.warning("At least one photo required for product!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("startingPrice", startingPrice);
    formData.append("buyNowPrice", buyNowPrice);

    files.forEach((file) => formData.append("images", file));

    setLoading(true);

    try {
      const res = await api.post<ApiResponse<Product>>(
        "/product/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
      setName("");
      setDescription("");
      setBuyNowPrice("");
      setStartingPrice("");
      setFiles([]);
    }
  };

  return (
    <div>
      <MediaUploader onChange={setFiles} />

      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="product-name">Product name</Label>
          <Input
            id="product-name"
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-11"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            e.g. Nike Air Max 90, Size UK 9
          </p>
        </div>

        <div>
          <Label htmlFor="product-description">Product description</Label>
          <Input
            id="product-description"
            value={description}
            disabled={loading}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 h-11"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            e.g. Brand new, sealed box. Authentic.
          </p>
        </div>

        {/* two column layout */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="product-starting-price">Starting price</Label>
            <Input
              id="product-starting-price"
              type="text"
              disabled={loading}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="₹ 1"
              maxLength={String(MAX_PRICE).length}
              value={startingPrice}
              onChange={(e) =>
                setStartingPrice(sanitizeInteger(e.target.value))
              }
              className="mt-2 h-11"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Minimum bid to start the auction, in whole rupees
            </p>
          </div>

          <div>
            <Label htmlFor="product-buy-now-price">Buy now price</Label>
            <Input
              id="product-buy-now-price"
              type="text"
              disabled={loading}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="₹ 1"
              maxLength={String(MAX_PRICE).length}
              value={buyNowPrice}
              onChange={(e) => setBuyNowPrice(sanitizeInteger(e.target.value))}
              className="mt-2 h-11"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Price at which a buyer can directly buy without bidding
            </p>
          </div>
        </div>

        {/* submit btn */}
        <Button
          onClick={handleCreateProduct}
          disabled={loading}
          className="w-full shrink-0 cursor-pointer"
        >
          {loading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Publishing...
            </>
          ) : (
            "Publish"
          )}
        </Button>
      </div>
    </div>
  );
}
