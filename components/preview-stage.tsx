"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { Show } from "@/types/api";

export default function PreviewStage({
  show,
  isMobile,
}: {
  show: Show;
  isMobile: boolean;
}) {
  return (
    <>
      <div>
        <header className="w-full h-[62px] justify-center items-center bg-black text-blue-200 hidden lg:flex sticky top-0 z-50">
          <nav>WELCOME TO KICK</nav>
        </header>
        {/* MAIN COMP */}
        <main className="min-h-svh w-full h-fit lg:min-h-0 lg:h-[calc(100vh-62px)] lg:w-full bg-red-600 lg:overflow-hidden">
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
                    <div className="w-full h-full">
                      {/* master overlay */}
                      <div className="absolute inset-0 flex flex-col pointer-events-none">
                        {/* ---- RIGHT ICON RAIL ---- */}
                        <div className="absolute right-4 top-4 flex flex-col gap-4 pointer-events-auto">
                          {isMobile && (
                            <button
                              // onClick={handleToggleCamera}
                              className="cursor-pointer bg-black/50 flex items-center justify-center text-white pointer-events-auto px-3 py-1 rounded-2xl"
                            >
                              {true ? "Flipping.." : "Flip Camera"}
                            </button>
                          )}
                        </div>

                        {/* ---- BOTTOM STACK ---- */}
                        <div className="flex flex-col justify-center items-center gap-2 p-3 absolute inset-x-0 bottom-0 pointer-events-auto">
                          <Button
                            // disabled={loading}
                            // onClick={handleGoLiveClick}
                            className="w-full max-w-[150px] py-4 rounded-xl bg-blue-400 text-zinc-950 font-bold disabled:opacity-50 shrink-0 cursor-pointer hover:bg-blue-400/65 text-[16px]"
                            type="button"
                          >
                            Go Live
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* shop area - first column */}
            <div className="flex flex-col min-w-0 w-full min-h-0 h-full lg:min-h-0 lg:h-full overflow-auto [grid-area:shop] bg-green-500">
              shp/product area
            </div>
            {/* chat area - third cloumn */}
            <div className="hidden lg:flex flex-col min-w-0 w-full min-h-0 h-full lg:min-h-0 lg:h-full overflow-auto [grid-area:sidebar] bg-amber-400">
              Chat box
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
