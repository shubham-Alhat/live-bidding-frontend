import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuctionNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Auction Not Found
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            This auction has ended or is no longer available. It may have been
            completed, cancelled, or removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-4">
          <Link href="/live-products">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Browse Live Auctions
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
