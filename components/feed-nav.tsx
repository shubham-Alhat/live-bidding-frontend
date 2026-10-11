import Link from "next/link";

export type Livestream = {
  id: string;
  host: { username: string; avatarUrl?: string };
  viewers: number;
  title: string;
  category: string;
  tags: string[];
  thumbnailUrl?: string;
};

// Replace with your API / DB call (e.g. BidHub live auctions).
export const streams: Livestream[] = [
  {
    id: "1",
    host: { username: "giftexpress" },
    viewers: 273,
    title: "SATURDAY LIVE WITH SAM BIGGEST FRAGRANCE MEGASHOW $1 STARTS",
    category: "Perfume & Cologne",
    tags: ["Cologne", "Designer", "Niche Fragrances", "Dolce&Gabbana"],
  },
  {
    id: "2",
    host: { username: "bottledbeauty" },
    viewers: 136,
    title: "FREE BYREDO GIVVY & SNL SPECIAL.",
    category: "Perfume & Cologne",
    tags: ["$1 Starts", "Luxury", "Designer"],
  },
  {
    id: "3",
    host: { username: "txsolemates" },
    viewers: 280,
    title: "$1 BEST FRAGRANCE SHOW - FULL SIZE BOTTLES!!",
    category: "Perfume & Cologne",
    tags: ["$1 Starts", "Niche Fragrances"],
  },
  {
    id: "4",
    host: { username: "savvyscoop" },
    viewers: 139,
    title: "$1 DESIGNER PERFUMES",
    category: "Perfume & Cologne",
    tags: [],
  },
  {
    id: "5",
    host: { username: "dubaiperfume1" },
    viewers: 61,
    title: "LIVE SHOW RESTOCK GIVEAWAYS FAST SHIPPING",
    category: "Perfume & Cologne",
    tags: ["Arabic", "Oud", "Giveaways"],
  },
  {
    id: "6",
    host: { username: "puchiscloset" },
    viewers: 76,
    title: "$1 STARTS - DESIGNER PERFUME BLOWOUT",
    category: "Perfume & Cologne",
    tags: ["Designer", "$1 Starts"],
  },
  {
    id: "7",
    host: { username: "scent_boutique" },
    viewers: 21,
    title: "SCENT BOUTIQUE - MINIS & MORE",
    category: "Perfume & Cologne",
    tags: ["Mini Sizes", "Decants"],
  },
  {
    id: "8",
    host: { username: "fayettevillebargaincenter" },
    viewers: 76,
    title: "FRAGRANCE SHOW - AMAZING DEALS",
    category: "Perfume & Cologne",
    tags: ["Live Shopping"],
  },
];

export const categories = [
  "For You",
  "Followed Hosts",
  "Perfume & Cologne",
  "Beauty",
  "Modern Bags",
  "Bags & Accessories",
  "Everyday Electronics",
  "Electronics",
  "Skincare",
];

/** Desktop (lg+): sticky left sidebar */
export function Sidebar({ active = "For You", username = "shubham" }) {
  return (
    <aside className="sticky top-[73px] hidden h-[calc(100vh-73px)] self-start sidebar-scroll overflow-y-auto px-6 py-8 lg:block">
      <h2 className="mb-6 border-b border-neutral-200 pb-6 text-3xl font-bold tracking-tight dark:border-neutral-800">
        Hi {username}!
      </h2>
      {categories.map((c) => (
        <Link
          key={c}
          href="#"
          className={`block py-3.5 text-xl ${
            c === active
              ? "font-bold text-blue-600 dark:text-blue-400"
              : "text-neutral-500"
          }`}
        >
          {c}
        </Link>
      ))}
    </aside>
  );
}

/** Mobile / tablet: horizontally scrolling tabs */
export function CategoryTabs({ active = "For You" }) {
  return (
    <nav className="-mx-4 mb-4 flex gap-5 overflow-x-auto border-b border-neutral-200 px-4 pt-3 [scrollbar-width:none] lg:hidden dark:border-neutral-800 [&::-webkit-scrollbar]:hidden">
      {categories.map((c) => (
        <Link
          key={c}
          href="#"
          className={`flex-none border-b-[3px] pb-2.5 text-[17px] font-semibold ${
            c === active
              ? "border-current text-blue-600 dark:text-blue-400"
              : "border-transparent text-neutral-400"
          }`}
        >
          {c}
        </Link>
      ))}
    </nav>
  );
}
