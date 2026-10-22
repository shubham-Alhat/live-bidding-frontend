"use client";

import { Product } from "@/types/api";

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

export default function ProductCard({
  key,
  product,
}: {
  key: string;
  product: Product;
}) {
  return (
    <>
      <div className="w-full flex flex-col cursor-pointer hover:opacity-70 transition-opacity duration-200">
        <div className="aspect-4/5 w-full overflow-hidden rounded-xl bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
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

// <AlertDialog>
//   <AlertDialogTrigger asChild>
//     <Button
//       variant="outline"
//       size="icon"
//       disabled={isDeleting}
//       className="border-border bg-transparent hover:bg-destructive-foreground hover:text-destructive cursor-pointer"
//     >
//       {isDeleting ? (
//         <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
//       ) : (
//         <Trash2 className="h-4 w-4" />
//       )}
//     </Button>
//   </AlertDialogTrigger>
//   <AlertDialogContent>
//     <AlertDialogHeader>
//       <AlertDialogTitle>Delete Product</AlertDialogTitle>
//       <AlertDialogDescription>
//         Are you sure you want to delete "{product.name}"? This action cannot be
//         undone.
//       </AlertDialogDescription>
//     </AlertDialogHeader>
//     <div className="flex gap-3">
//       <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
//       <AlertDialogAction
//         onClick={() => handleDelete(product.id)}
//         className="bg-destructive-foreground text-destructive hover:bg-destructive/90 cursor-pointer"
//       >
//         Delete
//       </AlertDialogAction>
//     </div>
//   </AlertDialogContent>
// </AlertDialog>;
