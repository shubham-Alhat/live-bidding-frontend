"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { DropdownMenuIcons } from "./dropdown-menu";
import Image from "next/image";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg  text-primary-foreground font-bold bg-primary relative">
            <Image src={"/logo.png"} fill alt="logo" />
          </div>
          <span className="hidden font-semibold text-foreground sm:inline">
            Bidding hub
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden flex-1 gap-8 md:flex md:items-center md:justify-center">
          <Link
            href="/home"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/home"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Browse
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden flex-1 md:block md:max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
              className="pl-10 bg-muted/50 border-border focus-visible:ring-2"
            />
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenuIcons />
        </div>
      </div>
    </header>
  );
}
