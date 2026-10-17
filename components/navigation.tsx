"use client";

import { Search } from "lucide-react";
import { BrandMark } from "./landing-page";
import useAuthStore from "@/store/authStore";

export function Navigation({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { authUser } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-background/65 backdrop-blur-2xl">
      <nav
        className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-4 px-4 lg:px-8"
        aria-label="Main navigation"
      >
        <BrandMark />

        <div className="hidden items-center gap-1 md:flex md:pl-8">
          <span className="rounded-full px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary-foreground cursor-pointer">
            Home
          </span>
          <span className="rounded-full px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary-foreground cursor-pointer">
            Browse
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <label className="group hidden h-11 w-[min(360px,30vw)] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 transition focus-within:border-white/30 focus-within:bg-white/[0.09] sm:flex">
            <Search
              className="size-[18px] shrink-0 text-white/50"
              aria-hidden="true"
            />
            <input
              placeholder="Search shows..."
              aria-label="Search shows"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
            <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/35 lg:inline">
              ⌘ K
            </kbd>
          </label>

          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 p-1 rounded-full bg-primary/90 text-primary-foreground font-bold text-xl flex justify-center items-center cursor-pointer"
            >
              {(authUser?.username[0] || "").toUpperCase()}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
