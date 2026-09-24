"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  CircleArrowLeft,
  Clock3,
  ImagePlus,
  Package,
  Play,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";
import { ApiResponse, getAllShowResponse, Show } from "@/types/api";
import useShowStore from "@/store/showStore";

export default function SellerStudio() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { addNewShow, setShowList, showList } = useShowStore();

  // handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warning("File too large", {
          description: "Image size should be less than 5MB",
        });

        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateShow = async () => {
    if (!title.trim()) {
      toast.error("Validation error", {
        description: "Please enter a show title",
      });

      return;
    }

    if (!description.trim()) {
      toast.error("Validation error", {
        description: "Please enter a show description!",
      });

      return;
    }

    if (!imagePreview) {
      toast.error("Validation error", {
        description: "Please upload a thumbnail for show",
      });

      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        toast.error("image file not found");
        return;
      }

      formData.append("showTitle", title.trim());
      formData.append("showDescription", description.trim());

      const res = await api.post<ApiResponse<Show>>("/show/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.data) addNewShow(res.data.data);

      // Reset form
      setTitle("");
      setDescription("");
      setImagePreview(null);
      setImageFile(null);

      toast.success("Success!", {
        description: "Show created successfully",
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch all shows of seller
  useEffect(() => {
    const getAllShows = async () => {
      try {
        const res =
          await api.get<getAllShowResponse<Show[] | []>>("/show/get-all");

        setShowList(res.data.data);
      } catch (error) {
        toast.error(getErrorMessage(error));
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    getAllShows();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1fr_340px] lg:px-8">
        <div className="flex min-w-0 w-full flex-col gap-8">
          <section id="shows" aria-labelledby="show-heading">
            <div className="mb-5 grid grid-cols-[auto_1fr_auto] items-center gap-4">
              <CircleArrowLeft
                onClick={() => router.push("/home")}
                size={22}
                className="cursor-pointer"
              />
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
                    htmlFor="thumbnail"
                    className="group relative flex aspect-4/5 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted transition duration-300"
                  >
                    {imagePreview ? (
                      <>
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Show cover preview"
                          fill
                          className="object-cover"
                          sizes="220px"
                        />
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setImagePreview(null);
                            setImageFile(null);
                          }}
                          className="absolute right-2 top-2 rounded-full bg-destructive p-2 text-destructive-foreground hover:bg-destructive/90"
                        >
                          <X className="h-3 w-3" strokeWidth={4} />
                        </span>
                      </>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-2 px-4 text-center"
                      >
                        <span className="grid size-12 place-items-center rounded-full bg-background text-muted-foreground transition">
                          <ImagePlus size={22} className="text-primary" />
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          Upload thumbnail
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          PNG or JPG, 4:5 recommended
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    id="thumbnail"
                    onChange={handleImageChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    aria-label="Upload Thumbnail image"
                    disabled={isLoading}
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
                      disabled={isLoading}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      e.g. Fragrance Friday: designer scents
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="description">Show description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      className="mt-2 h-11"
                      disabled={isLoading}
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
                      onClick={handleCreateShow}
                      className="w-full sm:w-fit cursor-pointer"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus data-icon="inline-start" /> Create show
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="shows" aria-labelledby="shows-heading">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2
                  id="shows-heading"
                  className="text-2xl font-bold tracking-tight"
                >
                  Your shows
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start a show or manage your upcoming ones.
                </p>
              </div>
            </div>
            <div className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {showList.map((show) => (
                <Card
                  key={show.id}
                  className="group relative aspect-3/4 overflow-hidden border-border/70 shadow-sm"
                >
                  {/* Thumbnail fills the whole card */}
                  <Image
                    src={show.thumbnail}
                    alt={show.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 240px"
                  />

                  {/* Scrim so text stays readable over any image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                  {/* Title, description, CTA pinned to the bottom of the card */}
                  <CardContent className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
                    <p className="line-clamp-2 text-sm font-semibold leading-5 text-white">
                      {show.name}
                    </p>
                    <p className="line-clamp-2 text-xs text-white/75">
                      {show.description}
                    </p>
                    <Button
                      size="sm"
                      className="mt-2 h-8 w-full gap-1.5 bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
                      // onClick={() => handleStartShow(show.id)}
                    >
                      <Play className="size-3.5" />
                      Start show
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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
