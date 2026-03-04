import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LiveProductsSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Skeleton */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-6 w-16" />
          </div>

          {/* Timer Skeleton */}
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-24" />
          </div>
        </div>

        {/* Main Card Skeleton */}
        <Card className="border-border bg-card">
          <div className="p-6">
            {/* Bid Logs Section Skeleton */}
            <div className="mb-6">
              <Skeleton className="mb-4 h-6 w-40" />

              {/* Scrollable Logs Container Skeleton */}
              <div className="h-80 rounded-lg border border-border bg-background p-4">
                <div className="space-y-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-md bg-muted/50 p-3"
                    >
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Winner Section Skeleton */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <Skeleton className="mb-3 h-4 w-32" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
