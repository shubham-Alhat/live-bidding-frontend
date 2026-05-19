import { Skeleton } from "@/components/ui/skeleton";

export function LiveAuctionSkeleton() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header: avatar + name/stars + follow | viewer count */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Skeleton className="h-10 w-10 rounded-sm" />
            <div className="flex flex-col gap-1.5">
              {/* Username */}
              <Skeleton className="h-4 w-32" />
              {/* Stars + Follow */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>

          {/* Live viewer count pill */}
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>

        {/* Image area with overlays */}
        <div className="relative w-full overflow-hidden rounded-xl">
          {/* Main image placeholder */}
          <Skeleton className="h-[420px] w-full rounded-xl" />

          {/* Join toast - top right */}
          <div className="absolute right-4 top-4">
            <Skeleton className="h-7 w-48 rounded-full" />
          </div>

          {/* Timer - bottom left */}
          <div className="absolute bottom-4 left-4">
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>

          {/* Bid + winner - bottom right */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Bottom controls: Custom | Bid input | Bids count */}
        <div className="mt-4 flex items-center gap-2">
          <Skeleton className="h-12 w-24 rounded-full" />
          <Skeleton className="h-12 flex-1 rounded-full" />
          <Skeleton className="h-12 w-20 rounded-full" />
        </div>

        {/* Auction ended text */}
        <Skeleton className="mt-3 h-4 w-56" />
      </div>
    </div>
  );
}
