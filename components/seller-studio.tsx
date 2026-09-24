"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CircleArrowLeft,
  Clock3,
  ImagePlus,
  Package,
  Plus,
  Sparkles,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Tom Ford Oud Wood Eau de Parfum",
    category: "Perfume & Cologne",
    price: "$89.00",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Maison Francis Kurkdjian Baccarat Rouge",
    category: "Perfume & Cologne",
    price: "$145.00",
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Le Labo Santal 33",
    category: "Perfume & Cologne",
    price: "$120.00",
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=85",
  },
  {
    name: "Jo Malone Wood Sage & Sea Salt",
    category: "Perfume & Cologne",
    price: "$76.00",
    stock: 16,
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=600&q=85",
  },
  // {
  //   name: "Le Labo Santal 33",
  //   category: "Perfume & Cologne",
  //   price: "$120.00",
  //   stock: 5,
  //   image:
  //     "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=85",
  // },
];

export default function SellerStudio() {
  const [goLive, setGoLive] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "shows">("products");
  const [cover, setCover] = useState(
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85",
  );
  const [title, setTitle] = useState("");

  return (
    <main className="min-h-screen bg-muted/30 text-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1fr_340px] lg:px-8">
        <div className="flex min-w-0 w-full flex-col gap-8">
          <section id="shows" aria-labelledby="show-heading">
            <div className="mb-5 grid grid-cols-[auto_1fr_auto] items-center gap-4">
              <CircleArrowLeft size={22} className="cursor-pointer" />
              <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Seller studio
              </p>
              <div /> {/* empty spacer to balance the arrow's width */}
            </div>
            <Card className="overflow-hidden border-border/70 shadow-sm">
              <CardContent className="grid gap-7 p-4 md:grid-cols-[220px_1fr] md:p-7">
                <div>
                  <Label htmlFor="thumbnail" className="mb-2 block text-center">
                    Show thumbnail
                  </Label>
                  <label
                    htmlFor="cover"
                    className="group relative flex aspect-4/5 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted transition hover:border-primary/60"
                  >
                    {false ? (
                      <>
                        <Image
                          src={cover}
                          alt="Show cover preview"
                          fill
                          className="object-cover"
                          sizes="220px"
                        />
                        <span className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-lg bg-background/90 px-3 py-2 text-xs font-medium shadow-sm">
                          <Upload data-icon="inline-start" /> Change image
                        </span>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 px-4 text-center">
                        <span className="grid size-12 place-items-center rounded-full bg-background text-muted-foreground transition group-hover:text-primary">
                          <ImagePlus size={22} className="text-primary" />
                        </span>
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">
                          Upload thumbnail
                        </span>
                        <span className="text-[11px] text-muted-foreground/70">
                          PNG or JPG, 4:5 recommended
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    id="cover"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    aria-label="Upload cover image"
                  />
                </div>
                <div className="flex min-w-0 w-full flex-col gap-4">
                  <div>
                    <Label htmlFor="title">Show title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="mt-2 h-11"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      e.g. Fragrance Friday: designer scents
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="description">Show description</Label>
                    <Input
                      id="description"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="mt-2 h-11"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      e.g. Selling designer fragrances - new drops every Friday
                      !
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2">
                    <div className="w-full sm:w-64">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="beauty">
                        <SelectTrigger id="category" className="mt-2 h-11">
                          <SelectValue placeholder="Choose a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beauty">
                            Beauty & Fragrance
                          </SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="collectibles">
                            Collectibles
                          </SelectItem>
                          <SelectItem value="home">Home & Garden</SelectItem>
                          <SelectItem value="decor">Home & Garden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      size="lg"
                      className="w-full sm:w-fit"
                      disabled={!title.trim()}
                    >
                      <Plus data-icon="inline-start" /> Create show
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="products-shows-section">
            <div className="relative mb-5 grid grid-cols-2 rounded-lg bg-neutral-900 p-1">
              {/* sliding background indicator */}
              <div
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-blue-400 transition-transform duration-300 ease-out",
                  activeTab === "shows" && "translate-x-full",
                )}
              />
              <button
                onClick={() => setActiveTab("products")}
                className={cn(
                  "relative z-10 py-2 text-sm font-medium transition-colors cursor-pointer",
                  activeTab === "products" ? "text-black" : "text-neutral-400",
                )}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("shows")}
                className={cn(
                  "relative z-10 py-2 text-sm font-medium transition-colors cursor-pointer",
                  activeTab === "shows" ? "text-black" : "text-neutral-400",
                )}
              >
                Shows
              </button>
            </div>

            {activeTab === "products" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* your product cards, unchanged */}
              </div>
            )}

            {activeTab === "shows" && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* shows cards */}
              </div>
            )}
          </section>
        </div>
        <aside className="hidden lg:flex lg:flex-col gap-5 lg:pt-16">
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Before you go live</CardTitle>
              <CardDescription>Make your show easy to shop.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
              <div className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Package />
                </span>
                <p>
                  <strong className="block">Add products</strong>
                  <span className="text-muted-foreground">
                    Choose what you&apos;ll feature during the stream.
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Clock3 />
                </span>
                <p>
                  <strong className="block">Set a schedule</strong>
                  <span className="text-muted-foreground">
                    Give buyers time to set a reminder.
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles />
                </span>
                <p>
                  <strong className="block">Make it yours</strong>
                  <span className="text-muted-foreground">
                    A strong cover gets more clicks.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-sm">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">
                Your next show
              </p>
              <h3 className="mt-2 text-xl font-bold text-muted">
                Ready to sell live?
              </h3>
              <p className="mt-2 text-sm opacity-80 text-background">
                Create your show first. You can add products any time before
                going live.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
