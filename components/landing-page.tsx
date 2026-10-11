"use client";

import { ArrowRight, Heart, Star, Store } from "lucide-react";
import Link from "next/link";

const categories = ["Sneakers", "Collectibles", "Fashion", "Electronics"];
// [#EA2412]

function BrandMark() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Leven home">
      <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xl font-black text-black">
        ⌋⌊
      </span>
      <span className="text-2xl font-black tracking-[-0.08em] text-primary">
        leven<span className="text-secondary">.</span>
      </span>
    </a>
  );
}

function LivePhone() {
  return (
    <div className="phone-wrap" aria-label="Preview of a live Leven auction">
      <div className="phone-glow" />
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="flex items-center justify-between text-[10px] text-white/80">
            <span>9:41</span>
            <span>● ● ▰</span>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs font-bold">Live now</span>
            <span className="rounded-full bg-secondary px-2 py-1 text-[10px] font-bold text-black">
              2.4k watching
            </span>
          </div>
          <div className="mt-3 flex h-52 items-end rounded-2xl bg-gradient-to-br from-orange-300 via-amber-700 to-black p-3 relative">
            <img
              src="https://www.whatnot.com/cdn/assets/a7910210881523de/_next/static/media/shoeWithoutShadow.684a3c47.png"
              alt="Nike shoes"
              className="w-full"
            />

            <div className="absolute text-black top-3">
              <p className="text-[14px] font-medium">THE DAILY DROP</p>
              <p className="mt-1 text-lg font-black">Vintage finds</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/50">Current bid</p>
              <p className="text-xl font-black">₹2,400</p>
            </div>
            <button className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black">
              Bid now
            </button>
          </div>
          <div className="mt-4 border-t border-white/10 pt-3 text-[10px] text-white/60">
            <span className="text-[var(--orange)]">●</span> Seller is showing a
            rare handloom piece
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-black text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <BrandMark />

          <div className="flex items-center gap-3">
            <a
              href="#sellers"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/70 hover:text-white hidden md:flex"
            >
              Become a seller
            </a>
            <Link
              href={"/login"}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black active:scale-95 transform duration-200 cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      <section className="hero-grid relative flex min-h-screen items-center px-5 pb-16 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold">
              <span className="size-1.5 animate-pulse rounded-full bg-secondary" />
              India&apos;s live auction marketplace
            </div>
            <h1 className="text-balance text-5xl font-black leading-[0.96] tracking-[-0.065em] sm:text-7xl lg:text-[6.5rem]">
              Live Shopping
              <br />
              <span className="text-secondary">Marketplace.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-white/65 sm:text-xl">
              Shop. Sell. Live auctions that bring India&apos;s community
              together in real time.
            </p>

            <div className="mt-6 flex items-center gap-8 border-t border-white/10 pt-6 text-sm text-white/50">
              <span>
                <b className="block text-xl text-white">1:1</b>real-time
                connection
              </span>
              <span>
                <b className="block text-xl text-white">0%</b>listing fee*
              </span>
              <span>
                <b className="block text-xl text-white">24/7</b>live energy
              </span>
            </div>
          </div>
          <LivePhone />
        </div>
        {/* <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/40 lg:flex">
          <ChevronDown size={16} /> Scroll to discover
        </div> */}
      </section>

      {/* <section
        id="how"
        className="border-y border-white/10 bg-[#c8c5c0] px-5 py-24 text-black sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#c84f0b]">
                Not just a marketplace
              </p>
              <h2 className="max-w-2xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                The thrill is in
                <br />
                <span className="text-[#c84f0b]">the live moment.</span>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-black/60">
              Every bid is a story. Every sale is a connection. Leven makes
              online buying feel human again.
            </p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-3">
            {[
              {
                icon: Gavel,
                n: "01",
                title: "Drop in",
                text: "Find live auctions hosted by people who know and love what they sell.",
              },
              {
                icon: Sparkles,
                n: "02",
                title: "Make your move",
                text: "Bid in real time, chat with the room, and feel the energy build.",
              },
              {
                icon: ShieldCheck,
                n: "03",
                title: "Take it home",
                text: "Secure checkout and reliable delivery across India. No surprises.",
              },
            ].map(({ icon: Icon, n, title, text }) => (
              <div key={n} className="bg-[#f5f1e9] p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <Icon className="text-[#c84f0b]" />
                  <span className="font-mono text-sm text-black/35">{n}</span>
                </div>
                <h3 className="mt-14 text-2xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-black/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section id="sellers" className="relative px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-white">
              For the makers, curators & hustlers
            </p>
            <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              Your audience
              <br />
              is already <span className="text-secondary">waiting.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/60">
              Turn your passion into a business. Host live drops, build a loyal
              community, and make money doing what you know best.
            </p>
            <a
              href="#join"
              className="mt-8 inline-flex items-center gap-2 border-b border-secondary pb-2 font-bold text-secondary"
            >
              Start selling on Leven <ArrowRight size={18} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="seller-card seller-tall">
              <Store size={25} />
              <span>Sell your way</span>
            </div>
            <div className="seller-card">
              <Star size={25} />
              <span>Build your people</span>
            </div>
            <div className="seller-card seller-orange">
              <span className="text-4xl font-black">₹</span>
              <span>Get paid for your passion</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="why"
        className="bg-secondary px-5 py-20 text-black sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              Find your next
              <br />
              favourite thing.
            </h2>
            <p className="max-w-sm text-lg leading-7 text-black/70 font-extrabold">
              From vintage treasures to today&apos;s hottest drops, there&apos;s
              a room for every kind of collector.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                key={category}
                href="#join"
                className="rounded-full border border-black/25 px-5 py-3 text-sm font-bold transition hover:bg-black hover:text-white"
              >
                {category} <ArrowRight className="ml-2 inline" size={15} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="px-5 py-28 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[var(--orange)]">
            The room is live
          </p>
          <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-7xl">
            Don&apos;t just watch.
            <br />
            <span className="text-[var(--orange)]">Be in it.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-white/60">
            Download Leven and find a new way to buy, sell, and connect.
          </p>
          <a
            href="mailto:hello@leven.live"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-black"
          >
            Get early access <ArrowRight />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <BrandMark />
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#how">How it works</a>
            <a href="#sellers">Sell on Leven</a>
            <a href="mailto:hello@leven.live">Contact</a>
          </div>
          <div className="flex items-center gap-3 text-white/50">
            <Heart size={18} fill="currentColor" />
            <span className="text-xs">© 2026 Leven India</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
