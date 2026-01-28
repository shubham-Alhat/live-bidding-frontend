"use client";

import React from "react";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { Product } from "@/app/(auth)/home/create/page";

interface CreateProductFormProps {
  onAddProduct: (product: Omit<Product, "id" | "createdAt">) => void;
}

export function CreateProductForm({ onAddProduct }: CreateProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [durationValue, setDurationValue] = useState("30");
  const [durationUnit, setDurationUnit] = useState<"seconds" | "minutes">(
    "minutes",
  );
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.warning("File too large", {
          description: "Image size should be less than 5MB",
        });
        // toast({
        //   title: "File too large",
        //   description: "Image size should be less than 5MB",
        //   variant: "destructive",
        // });
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

  const handleDragAndDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateDuration = (): number => {
    const value = parseInt(durationValue, 10);
    return durationUnit === "seconds" ? value : value * 60;
  };

  const formatDuration = (): string => {
    const totalSeconds = calculateDuration();
    if (durationUnit === "seconds") {
      return `${durationValue}s`;
    }
    return `${durationValue}m ${totalSeconds % 60 || 0}s`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!productName.trim()) {
      toast.error("Validation error", {
        description: "Please enter a product name",
      });
      //   toast({
      //     title: "Validation error",
      //     description: "Please enter a product name",
      //     variant: "destructive",
      //   });
      return;
    }

    if (!initialPrice) {
      toast.error("Validation error", {
        description: "Please enter an initial price",
      });
      //   toast({
      //     title: "Validation error",
      //     description: "Please enter an initial price",
      //     variant: "destructive",
      //   });
      return;
    }

    if (!imagePreview) {
      toast.error("Validation error", {
        description: "Please upload a product image",
      });
      //   toast({
      //     title: "Validation error",
      //     description: "Please upload a product image",
      //     variant: "destructive",
      //   });
      return;
    }

    setIsLoading(true);

    try {
      const price = parseFloat(initialPrice);
      if (isNaN(price) || price < 0) {
        throw new Error("Invalid price");
      }

      onAddProduct({
        name: productName.trim(),
        image: imagePreview,
        price,
        duration: calculateDuration(),
        durationUnit,
        isLaunched: false,
      });

      // Reset form
      setProductName("");
      setInitialPrice("");
      setImagePreview(null);
      setImageFile(null);
      setDurationValue("30");
      setDurationUnit("minutes");

      toast.success("Success!", {
        description: "Product created successfully",
      });

      //   toast({
      //     title: "Success!",
      //     description: "Product created successfully",
      //   });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create product. Please check your inputs.",
      });
      //   toast({
      //     title: "Error",
      //     description: "Failed to create product. Please check your inputs.",
      //     variant: "destructive",
      //   });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
        <CardDescription>
          Add a new product and set up your auction details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image-upload" className="text-base font-semibold">
              Product Image
            </Label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="h-48 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                  className="absolute right-2 top-2 rounded-full bg-destructive p-2 text-destructive-foreground hover:bg-destructive/90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onDrop={handleDragAndDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 px-6 py-12 transition-colors hover:border-primary hover:bg-secondary/50"
              >
                <Upload className="mb-2 h-8 w-8 text-primary" />
                <p className="text-sm font-medium text-foreground">
                  Drag and drop your image here
                </p>
                <p className="text-xs text-muted-foreground">
                  or click to browse
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Supports JPG, PNG (max 5MB)
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              aria-label="Upload product image"
            />
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-base font-semibold">
              Product Name
            </Label>
            <Input
              id="product-name"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border-border"
              disabled={isLoading}
            />
          </div>

          {/* Initial Price */}
          <div className="space-y-2">
            <Label htmlFor="initial-price" className="text-base font-semibold">
              Initial Price
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">$</span>
              <Input
                id="initial-price"
                type="number"
                placeholder="0.00"
                value={initialPrice}
                onChange={(e) => setInitialPrice(e.target.value)}
                step="0.01"
                min="0"
                className="border-border"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Auction Duration */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Auction Duration</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                value={durationValue}
                onChange={(e) => setDurationValue(e.target.value)}
                className="flex-1 border-border"
                disabled={isLoading}
              />
              <Select
                value={durationUnit}
                onValueChange={(value: any) => setDurationUnit(value)}
                disabled={isLoading}
              >
                <SelectTrigger className="w-32 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">Seconds</SelectItem>
                  <SelectItem value="minutes">Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              Duration:{" "}
              <span className="font-semibold text-foreground">
                {formatDuration()}
              </span>
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
