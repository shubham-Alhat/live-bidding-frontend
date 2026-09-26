import { useState } from "react";
import { Ellipsis, MoreHorizontal, Pin } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Anthropologie Meadow Rue Top",
    detail: "Size Small Petite",
    price: "$10",
    bids: "0 bids",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=85",
    status: "Start Auction",
  },
  {
    id: 2,
    title: "Levi's Ribcage Straight Jeans",
    detail: "Size 28 · Like new",
    price: "$28",
    bids: "3 bids",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=85",
    status: "Start Auction",
  },
  {
    id: 3,
    title: "Vintage Floral Button Blouse",
    detail: "Size Medium · Excellent",
    price: "$16",
    bids: "1 bid",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=500&q=85",
    status: "Start Auction",
  },
];

export default function ShowProductCard() {
  return (
    <div className="flex gap-3 bg-card border border-border rounded-xl p-2.5">
      {/* Image Thumbnail */}
      <div className="relative shrink-0 w-20 sm:w-24 aspect-square overflow-hidden rounded-lg border border-border">
        <Image
          src="https://res.cloudinary.com/diery17cm/image/upload/v1779897446/tknlm9ocydjm3wpqofqa.jpg"
          alt="Raymond watch"
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Right Column */}
      <div className="flex flex-col min-w-0 flex-1">
        <p className="text-card-foreground text-sm sm:text-[15px] font-bold leading-tight line-clamp-2">
          Raymond watch
        </p>
        <p className="text-card-foreground/70 text-xs sm:text-sm truncate leading-tight mt-1">
          this is tom cruise&apos;s watch
        </p>
        <p className="text-white text-[12px] sm:text-[13px] leading-tight mt-1">
          10 Bids
        </p>

        {/* Button Row */}
        <div className="mt-auto flex items-center gap-4 pt-2">
          <button className="rounded-full bg-muted px-4 py-1.5 text-[15px] font-semibold text-card-foreground/70 transition">
            Start Auction
          </button>

          <button
            aria-pressed={true}
            // onClick={() => setSaved(!saved)}
            className="grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground transition"
          >
            <Pin className="size-5 rotate-45" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
