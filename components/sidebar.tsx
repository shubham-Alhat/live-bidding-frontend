"use client";

import { ChevronRight } from "lucide-react";

const categories = [
  "All Categories",
  "Electronics",
  "Collectibles",
  "Art & Antiques",
  "Jewelry",
  "Fashion",
  "Home & Garden",
  "Sports",
];

const upcomingGiveaways = [
  {
    id: 1,
    title: "Premium Headphones",
    image: "/placeholder.jpg",
  },
  {
    id: 2,
    title: "Smart Watch",
    image: "/placeholder.jpg",
  },
];

export function Sidebar() {
  return (
    <aside className="hidden w-48 border-r border-border bg-background p-4 lg:block">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Categories
        </h3>
        <nav className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
            >
              {category}
              <ChevronRight className="h-4 w-4" />
            </button>
          ))}
        </nav>
      </div>

      {/* Upcoming Giveaways */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Upcoming Giveaways
        </h3>
        <div className="space-y-4">
          {upcomingGiveaways.map((giveaway) => (
            <div
              key={giveaway.id}
              className="rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
            >
              <img
                src={giveaway.image || "/placeholder.svg"}
                alt={giveaway.title}
                className="w-full h-20 object-cover bg-muted"
              />
              <p className="text-xs font-medium text-foreground p-2 text-center">
                {giveaway.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
