"use client";

import { useState } from "react";
import { MediaUploader } from "./media-uploader";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function ProductListingForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyNowPrice, setBuyNowPrice] = useState("");

  return (
    <div>
      <MediaUploader onChange={(e) => console.log(e)} />

      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="product-name">Product name</Label>
          <Input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 h-11"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            e.g. Nike Air Max 90, Size UK 9
          </p>
        </div>

        <div>
          <Label htmlFor="product-description">Product description</Label>
          <Input
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 h-11"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            e.g. Brand new, sealed box. Authentic.
          </p>
        </div>

        {/* two cloumn layout */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="product-quantity">Quantity</Label>
            <Input
              id="product-quantity"
              type="text"
              inputMode="numeric"
              placeholder="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(event.target.value.replace(/\D/g, ""))
              }
              className="mt-2 h-11"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              How many units you have
            </p>
          </div>

          <div>
            <Label htmlFor="product-buy-now-price">Buy now price</Label>
            <Input
              id="product-buy-now-price"
              type="text"
              inputMode="decimal"
              placeholder="₹ 0.00"
              value={buyNowPrice}
              onChange={(event) => {
                const value = event.target.value;
                // digits, optional single ".", max 2 decimal places
                if (/^\d*\.?\d{0,2}$/.test(value)) {
                  setBuyNowPrice(value);
                }
              }}
              className="mt-2 h-11"
            />
            <p className="mt-2 text-xs text-muted-foreground">Price per unit</p>
          </div>
        </div>
        {/* submit btn */}
        <Button
          //   onClick={handleCreateShow}
          className="w-full sm:w-fit shrink-0 cursor-pointer"
          //   disabled={isLoading}
        >
          {true ? (
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
