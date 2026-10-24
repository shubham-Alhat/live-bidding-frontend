"use client";

import {
  ChevronRight,
  Gift,
  LogOut,
  MessagesSquare,
  PackagePlus,
  ShoppingBag,
  Store,
  User,
  UserStar,
  Wallet,
  X,
} from "lucide-react";
import { BrandMark } from "./landing-page";
import api, { getErrorMessage } from "@/utils/api";
import { ApiResponse, AuthUser } from "@/types/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ProfileSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await api.post<ApiResponse<AuthUser>>("/auth/logout");

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <aside
        aria-label="Profile"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col bg-background shadow-2xl
          lg:w-2/5 xl:w-1/3 2xl:w-[30%]
          lg:min-w-[400px] lg:max-w-[520px]
          will-change-transform
          transition-[transform,translate,visibility] duration-300
          ease-[cubic-bezier(0.32,0.72,0,1)]
          motion-reduce:transition-none
          ${isOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}
      >
        {/* Fixed header with close button */}
        <div className="flex shrink-0 items-center justify-between border-b border-accent px-4 h-[72px]">
          <BrandMark />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close profile drawer"
            className="flex size-9 items-center justify-center rounded-full hover:bg-white/10 active:scale-95"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
          {/* profile */}
          <button
            onClick={() => (window.location.href = "/dashboard/profile")}
            className="w-full px-2 py-4 flex gap-2 items-center justify-between bg-background text-primary cursor-pointer"
          >
            <span className="flex items-center gap-4 justify-start">
              <User size={22} />
              Profile
            </span>
            <span>
              <ChevronRight size={22} />
            </span>
          </button>
          {/* Inventory*/}
          <button
            onClick={() => (window.location.href = "/dashboard/create")}
            className="w-full px-2 py-4 flex gap-2 items-center justify-between bg-background text-primary cursor-pointer"
          >
            <span className="flex items-center gap-4 justify-start">
              <PackagePlus size={22} />
              Inventory
            </span>
            <span>
              <ChevronRight size={22} />
            </span>
          </button>
          {/* seller studio */}
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full px-2 py-4 flex gap-2 items-center justify-between bg-background text-primary cursor-pointer"
          >
            <span className="flex items-center gap-4 justify-start">
              <UserStar size={22} />
              Seller studio
            </span>
            <span>
              <ChevronRight size={22} />
            </span>
          </button>
          {/* orders & purchases */}
          <button className="w-full px-2 py-4 flex gap-2 items-center justify-between bg-background text-primary cursor-pointer">
            <span className="flex items-center gap-4 justify-start">
              <ShoppingBag size={22} />
              Orders
            </span>
            <span>
              <ChevronRight size={22} />
            </span>
          </button>
          {/* payments and shipping */}
          <button className="w-full px-2 py-4 flex gap-2 items-center justify-between bg-background text-primary cursor-pointer">
            <span className="flex items-center gap-4 justify-start">
              <Wallet size={22} />
              Payments & shippings
            </span>
            <span>
              <ChevronRight size={22} />
            </span>
          </button>
          {/* messages inbox*/}
          <button className="w-full px-2 py-4 flex gap-2 items-center justify-between bg-background text-primary cursor-pointer">
            <span className="flex items-center gap-4 justify-start">
              <MessagesSquare size={22} />
              Inbox
            </span>
            <span>
              <ChevronRight size={22} />
            </span>
          </button>
          {/* refer and earn */}
          <button className="w-full px-2 py-4 flex gap-2 items-center justify-between bg-background text-primary cursor-pointer">
            <span className="flex items-center gap-4 justify-start">
              <Gift size={22} />
              Refer & Earn
            </span>
            <span>
              <ChevronRight size={22} />
            </span>
          </button>
          {/* logout btn */}
          <button
            disabled={isLoggingOut}
            aria-busy={isLoggingOut}
            onClick={handleLogout}
            className="w-full px-2 py-4 flex gap-2 items-center justify-between bg-background text-destructive cursor-pointer disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-4 justify-start">
              {isLoggingOut ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent" />
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut size={22} />
                  <span>Sign out</span>
                </>
              )}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
