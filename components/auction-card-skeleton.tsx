import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function AuctionCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-card border-border">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-muted">
        <Skeleton className="w-full h-full" />
        {/* Live Badge Skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Seller Info Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Category Badge Skeleton */}
        <Skeleton className="h-5 w-20" />

        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Bid Info Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </Card>
  );
}
