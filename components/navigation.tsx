"use client";

import {
  Bell,
  ChevronDown,
  Gavel,
  Heart,
  Menu,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DropdownMenuIcons } from "./dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

const buyerLinks = [
  { label: "Browse auctions", icon: Gavel },
  { label: "Following", icon: Heart },
  { label: "My purchases", icon: ShoppingBag },
];

const sellerLinks = [
  { label: "Seller Hub", icon: ShieldCheck },
  { label: "My products", icon: Package },
  { label: "Seller settings", icon: Settings },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/home"
          className="flex shrink-0 items-center gap-2 text-[20px] font-bold tracking-[-0.03em]"
          aria-label="Leven home"
        >
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-[#e7f0ff] text-[18px] font-black text-[#050505]">
            L
          </span>
          <span>Leven</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex md:pl-8">
          <a
            href="#home"
            className="rounded-full px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Home
          </a>
          <a
            href="#browse"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            Browse
          </a>
          <a
            href="#how-it-works"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            How it works
          </a>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <label className="group hidden h-11 w-[min(360px,30vw)] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 transition focus-within:border-white/30 focus-within:bg-white/[0.09] sm:flex">
            <Search
              className="size-[18px] shrink-0 text-white/50"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search auctions..."
              aria-label="Search auctions"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
            <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35 lg:inline">
              ⌘ K
            </kbd>
          </label>

          <button
            type="button"
            className="hidden size-10 items-center justify-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white sm:flex"
            aria-label="Notifications"
          >
            <Bell className="size-[19px]" />
          </button>

          <div>
            <DropdownMenuIcons />
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 px-4 pb-4 pt-3 md:hidden">
          <label className="flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4">
            <Search className="size-[18px] text-white/50" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search auctions..."
              aria-label="Search auctions"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
          </label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href="#home"
              className="rounded-xl bg-white/10 px-3 py-3 text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#browse"
              className="rounded-xl px-3 py-3 text-sm font-medium text-white/65 hover:bg-white/10 hover:text-white"
            >
              Browse auctions
            </a>
            <a
              href="#following"
              className="rounded-xl px-3 py-3 text-sm font-medium text-white/65 hover:bg-white/10 hover:text-white"
            >
              Following
            </a>
            <a
              href="#seller-hub"
              className="rounded-xl px-3 py-3 text-sm font-medium text-[#b9d3ff] hover:bg-[#b9d3ff]/10"
            >
              Seller Hub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
