"use client";

import { useEffect, useRef, useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";
import { ApiResponse, Product } from "@/types/api";
import { CircleArrowLeft, Images, X } from "lucide-react";
import Image from "next/image";
import useProductStore from "@/store/productStore";

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

// 5MB limit to upload
const MAX_SIZE = 5 * 1024 * 1024;

export default function ProductListingForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // for image uploading
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);

  // product store
  const { addNewProduct } = useProductStore();

  const revokeUrl = () => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  };

  // free the blob URL when the component unmounts
  useEffect(() => {
    return () => revokeUrl();
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning("Invalid file", { description: "Please select an image" });
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.warning("File too large", {
        description: "Image size should be less than 5MB",
      });
      return;
    }

    revokeUrl();
    urlRef.current = URL.createObjectURL(file);
    setPreview(urlRef.current);
    setImage(file);
  };

  const handleRemove = () => {
    revokeUrl();
    setPreview(null);
    setImage(null);
  };

  const handleCreateProduct = async () => {
    if (loading) return; // prevent double submit

    // ---- validation (runs BEFORE loading starts) ----
    if (!name.trim()) {
      toast.warning("Name is required", {
        description: "Please enter a name for your product.",
      });
      return;
    }

    if (!description.trim()) {
      toast.warning("Description is required", {
        description:
          "Please add a short description so bidders know what they're bidding on.",
      });
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
      toast.warning("Invalid buy now price", {
        description: "Buy now price must be greater than the starting price.",
      });
      return;
    }

    // check images
    if (!image) {
      toast.warning("Image required", {
        description: "Please upload at least one image for your product.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("startingPrice", startingPrice);
    formData.append("buyNowPrice", buyNowPrice);
    formData.append("image", image);

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
      if (!res.data.data) {
        toast.error("New product not found!");
        return;
      }
      addNewProduct(res.data.data);
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
      setImage(null);
      setPreview(null);
      revokeUrl();
    }
  };

  return (
    <div>
      {/* header */}
      <div className="mb-5 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <CircleArrowLeft
          onClick={() => (window.location.href = "/")}
          size={22}
          className="cursor-pointer"
        />
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Create Product
        </p>
        {/* empty spacer to balance the arrow's width */}
        <div />
      </div>
      {/* Media uplaoder */}
      <section className="relative my-3 w-full">
        <input
          ref={inputRef}
          onChange={handleImage}
          type="file"
          accept="image/*"
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label={preview ? "Change product image" : "Upload product image"}
          className="relative flex h-56 w-full cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border border-dashed border-muted bg-muted/40 px-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Product image preview"
              fill
              unoptimized
              sizes="100vw"
              className="object-contain p-2"
            />
          ) : (
            <>
              <Images
                className="mb-2 size-9 text-foreground"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="text-sm text-foreground">
                Upload product image
              </span>
            </>
          )}
        </button>

        {preview && (
          <button
            disabled={loading}
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="absolute right-2 top-2 rounded-full bg-destructive p-2 text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-3" strokeWidth={4} />
          </button>
        )}
      </section>

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
