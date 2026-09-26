"use client";

import { Button } from "./ui/button";

import {
  ChevronLeft,
  ChevronRight,
  Gift,
  MessageCircleMore,
  MessageCircleOff,
  Plus,
  ShareIcon,
  ShoppingBag,
  Star,
  Store,
  VideoIcon,
  VideoOffIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Volume2 } from "lucide-react";
import { VolumeX } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Show } from "@/types/api";
import { Input } from "./ui/input";
import ShowProductCard from "./show-product-card";

const messages = [
  { id: "01", text: "Hello world by whatnot", user: "Whatnot_user" },
  { id: "04", text: "Placing my bid now 🔥", user: "Whatnot_user" },
  { id: "05", text: "How many left in stock?", user: "sarah_j" },
  { id: "06", text: "First time here, loving the vibe", user: "newbie99" },
  { id: "07", text: "Can you show the back side?", user: "collector_23" },
  { id: "08", text: "That price is a steal", user: "deal_hunter" },
  { id: "09", text: "GG well played everyone", user: "buyer_mike" },
  { id: "10", text: "Adding to cart right away", user: "sarah_j" },
  { id: "11", text: "Does this ship internationally?", user: "eu_buyer_88" },
  { id: "12", text: "Loving this stream today", user: "Whatnot_user" },
];

export default function PreviewStage({
  show,
  isMobile,
}: {
  show: Show;
  isMobile: boolean;
}) {
  // Parent component state
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);

  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const dragY = useRef(0);
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    dragY.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (drawerRef.current) {
      drawerRef.current.style.transition = "none"; // kill transition while dragging
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !drawerRef.current) return;

    const delta = e.clientY - startY.current;

    const clampedDelta = Math.max(0, delta); // never negative, but always updates
    dragY.current = clampedDelta;

    if (delta > 0) {
      // only allow downward movement, live-follow the finger
      dragY.current = delta;
      drawerRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current || !drawerRef.current) return;
    isDragging.current = false;

    // bring transition back for the settle/close animation
    drawerRef.current.style.transition = "transform 300ms ease-out";

    if (dragY.current > 0) {
      // any downward drag at all -> close
      drawerRef.current.style.transform = `translateY(100%)`;
      setTimeout(() => {
        setIsShopOpen(false);
      }, 300); // match transition duration
    } else {
      // no movement -> snap back
      drawerRef.current.style.transform = `translateY(0px)`;
    }
  };

  // reset inline style whenever drawer re-opens, so the CSS class takes over cleanly
  useEffect(() => {
    if (isShopOpen && drawerRef.current) {
      drawerRef.current.style.transition = "";
      drawerRef.current.style.transform = "";
    }
  }, [isShopOpen]);

  return (
    <>
      <div>
        <header className="w-full h-[62px] justify-center items-center bg-background text-foreground hidden lg:flex sticky top-0 z-50">
          <nav>WELCOME TO KICK</nav>
        </header>
        {/* MAIN COMP */}
        <main className="h-svh overflow-hidden w-full lg:min-h-0 lg:h-[calc(100vh-62px)] lg:w-full bg-red-600 lg:overflow-hidden">
          <div className="flex flex-col items-start w-full gap-4 lg:grid lg:gap-4 lg:relative lg:py-4 lg:px-4 lg:min-h-0 lg:h-full lg:w-full lg:[grid-template-areas:'shop_player_sidebar'] lg:grid-cols-[minmax(230px,1fr)_minmax(500px,2fr)_minmax(250px,1fr)]">
            {/* streamer section - centered one */}
            <div className="flex min-w-0 min-h-0 w-full h-full flex-col gap-2 [grid-area:player]">
              <section className="relative w-full lg:min-h-0 h-svh lg:h-full lg:rounded-2xl overflow-hidden bg-neutral-900 aspect-9/16">
                {/* render a canvas element to have janky UI */}
                <div className="flex aspect-9/16 size-full flex-col">
                  <div
                    className="w-full flex-1"
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      backgroundColor: "rgb(0,0,0)",
                    }}
                  >
                    <div className={"relative h-full w-full overflow-hidden"}>
                      <Image
                        src={show.thumbnail}
                        alt={show.name}
                        fill
                        className="object-cover lg:object-contain"
                      />
                      {/* actual overlay component */}
                      {/* 1. scrim layer at top and bottom - gradient bg for visible text : DIVS are self closing */}
                      {/* <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" /> */}
                      {/* ---------------------------- */}
                      {/* master overlay */}
                      <div className="absolute inset-0 flex flex-col pointer-events-none">
                        {/* ---- TOP BAR ---- */}
                        <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4">
                          {/* seller info - top left */}
                          <div className="flex items-center gap-3 pointer-events-auto">
                            <Avatar
                              onClick={() => console.log("Avatar")}
                              className="size-12 border border-white/20"
                            >
                              <AvatarImage
                                src="https://res.cloudinary.com/diery17cm/image/upload/v1779881922/apfvnjmurhd7hsogeusm.jpg"
                                alt="bottledbeauty"
                              />
                              <AvatarFallback>BB</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                              <span
                                onClick={() => console.log("username:seller")}
                                className="text-white text-[15px] font-semibold"
                              >
                                bottledbeauty
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-sm font-medium">
                                  <Star className="size-3 fill-yellow-400" />{" "}
                                  4.8
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* viewer count + giveaway - top right */}
                          <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-1 bg-[#ff2c2c] rounded-full px-2 py-1 text-white text-sm font-semibold">
                              <span className="size-1.5 rounded-full bg-white animate-pulse" />

                              {1}
                            </div>
                          </div>
                        </div>

                        {/* ---- RIGHT ICON RAIL ---- */}
                        <div className="absolute right-5 bottom-1/3 flex flex-col gap-8 pointer-events-auto">
                          <button
                            onClick={() => console.log("share")}
                            className="size-12 cursor-pointer rounded-full bg-black/50 flex items-center justify-center text-white pointer-events-auto"
                          >
                            <ShareIcon className="size-7" />
                          </button>
                          {/* Shop trigger - mobile only, opens drawer */}
                          <button
                            onClick={() => setIsShopOpen(true)}
                            className="lg:hidden relative size-12 rounded-full bg-black/50 flex items-center justify-center text-white pointer-events-auto"
                          >
                            <Store className="size-7" />
                            <span className="absolute -top-1 -right-1 size-5 rounded-full bg-secondary text-secondary-foreground text-[11px] font-bold flex items-center justify-center">
                              2
                            </span>
                          </button>
                        </div>

                        {/* ---- BOTTOM STACK ---- */}
                        <div className="flex flex-col gap-2 p-3 absolute inset-x-0 bottom-0">
                          {/* chat feed — overlay only on mobile */}

                          <div
                            id="chat-box"
                            className={`pointer-events-auto flex flex-col gap-4 max-h-[40vh] max-w-8/12 overflow-y-auto px-2 pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden transition-transform duration-300 ease-in-out ${isChatVisible ? "translate-x-0" : "-translate-x-[120%] pointer-events-none"}`}
                          >
                            {messages.map((msg) => (
                              <div
                                key={msg.id}
                                className="flex flex-row items-start gap-2 w-full max-w-full"
                              >
                                {/* Avatar Circle */}
                                <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-black text-xs font-bold mt-0.5">
                                  {msg.user.charAt(0).toUpperCase()}
                                </div>

                                {/* Username and Message Container */}
                                <div className="flex flex-col leading-tight min-w-0 flex-1">
                                  {/* Username */}
                                  <span className="text-white font-bold text-sm drop-shadow-md truncate">
                                    {msg.user}
                                  </span>

                                  {/* Actual Message */}
                                  <span className="text-orange-500 text-sm font-medium drop-shadow-md block truncate w-full">
                                    {msg.text}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* say something input — mobile only */}
                          <div className="px-2 py-2 w-full lg:hidden pointer-events-auto">
                            <div className="flex items-center gap-2 w-full">
                              <button
                                type="button"
                                aria-label="Open emoji picker"
                                onClick={() =>
                                  setIsChatVisible((prev) => !prev)
                                }
                                className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-white/70 text-white/90 bg-black/30 transition-transform duration-300 ${isChatVisible ? "" : "rotate-90"}`}
                              >
                                <ChevronLeft />
                              </button>

                              <input
                                placeholder="Say something..."
                                onChange={(e) => console.log(e.target.value)}
                                className="flex-1 min-w-0 rounded-full border border-white text-white text-sm px-4 py-2 placeholder:text-white/80 focus:outline-none focus:ring-1 focus:ring-white drop-shadow-md bg-black/30"
                              />
                            </div>
                          </div>

                          {/* product card */}

                          {/* bid buttons */}
                          <div className="flex gap-2 pointer-events-auto">
                            <button
                              onClick={() => console.log("bid btn")}
                              className="flex-1 rounded-full bg-primary text-black text-[16px] py-2.5 flex justify-center items-center font-bold cursor-pointer"
                            >
                              Start Show
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* shop area - first column */}
            <div className="hidden lg:flex lg:flex-col lg:min-h-0 lg:h-full overflow-auto [grid-area:shop] bg-green-500">
              shp/product area
            </div>
            {/* chat area - third cloumn */}
            <div className="hidden lg:flex lg:flex-col min-w-0 w-full min-h-0 h-full lg:min-h-0 lg:h-full overflow-auto [grid-area:sidebar] bg-amber-400">
              Chat box
            </div>
          </div>
        </main>
        {/* drawer */}
        {/* Backdrop */}
        {isShopOpen && (
          <div
            onClick={() => setIsShopOpen(false)}
            className={`fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300 ${
              isShopOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Drawer */}
        <div
          ref={drawerRef}
          className={`fixed inset-x-0 bottom-0 z-50 h-[85svh] rounded-t-2xl bg-background flex flex-col lg:hidden transition-transform duration-300 ease-out ${
            isShopOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* drawer closer - drag handler */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="flex justify-center px-4 pt-3 pb-5 rounded-t-2xl cursor-grab active:cursor-grabbing touch-none"
          >
            <div className="w-14 h-1.5 rounded-full bg-muted" />
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <Input
              placeholder="Search..."
              className="w-full bg-input text-sm px-4 py-2 focus:outline-none"
            />
          </div>

          {/* List area */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <div className="flex flex-col gap-3">
              {true ? (
                <>
                  <ShowProductCard />
                  <ShowProductCard />
                  <ShowProductCard />
                  <ShowProductCard />
                  <ShowProductCard />
                  <ShowProductCard />
                  <ShowProductCard />
                  <ShowProductCard />
                  <ShowProductCard />
                  <ShowProductCard />
                </>
              ) : (
                <p className="py-10 text-center text-sm text-zinc-500">
                  No products found.
                </p>
              )}
            </div>
          </div>

          {/* Floating add button */}
          <button className="absolute bottom-7 right-7 size-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
            <Plus className="size-5" strokeWidth={4} />
          </button>
        </div>
      </div>
    </>
  );
}
