"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Rocket, Trash2 } from "lucide-react";
import { ApiResponse, Product } from "@/types/api";
import useProductStore from "@/store/productStore";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLaunching, setIsLaunching] = useState(false);
  const { productList, deleteProduct } = useProductStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const handleLaunch = async (productId: string) => {
    try {
      const res = await api.put(`/product/launch/${productId}`);
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  };

  // const handleLaunch = async () => {
  //   setIsLaunching(true);
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     onLaunch();
  //   } catch (error) {
  //   } finally {
  //     setIsLaunching(false);
  //   }
  // };

  // const handleDelete = () => {
  //   onDelete();
  // };

  const handleDelete = async (productId: string) => {
    setIsDeleting(true);
    try {
      const res = await api.delete<ApiResponse<Product>>(
        `/product/${productId}`,
      );

      deleteProduct(productId);

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden border-border transition-shadow hover:shadow-lg">
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-secondary">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <CardContent className="flex-1 space-y-3 pt-4">
        {/* Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 text-lg font-semibold text-foreground line-clamp-2">
            {product.name}
          </h3>
          {(() => {
            if (product.status === "LIVE") {
              return (
                <Badge className="shrink-0 animate-pulse bg-primary text-primary-foreground">
                  <span className="mr-1 inline-block text-destructive h-2 w-2 rounded-full bg-current" />
                  Live
                </Badge>
              );
            } else if (product.status === "NOTLIVE") {
              return (
                <Badge variant="secondary" className="shrink-0">
                  Not Launched
                </Badge>
              );
            } else if (product.status === "ARCHIVE") {
              return (
                <Badge variant="outline" className="shrink-0">
                  Archived
                </Badge>
              );
            } else {
              return null;
            }
          })()}
        </div>

        {/* Price */}
        <div>
          <p className="text-2xl font-bold text-primary">
            ${product.initialPrice}
          </p>
          <p className="text-xs text-muted-foreground">Initial Price</p>
        </div>

        {/* Duration */}
        <div className="rounded-lg bg-secondary/50 px-3 py-2">
          <p className="text-sm font-medium text-foreground">
            Duration: {formatDuration(product.durationInSeconds)}
          </p>
        </div>
      </CardContent>

      {/* Card Footer - Actions */}
      <CardFooter className="flex gap-2 border-t border-border">
        {(() => {
          if (product.status === "LIVE") {
            return (
              <>
                <Button
                  disabled
                  className="flex-1 bg-muted text-muted-foreground cursor-pointer"
                >
                  Launched
                </Button>
              </>
            );
          } else if (product.status === "NOTLIVE") {
            return (
              <>
                <Button
                  onClick={() => handleLaunch(product.id)}
                  disabled={isLaunching}
                  className="flex-1 bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90"
                >
                  {isLaunching ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Launching...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-4 w-4" />
                      Launch
                    </>
                  )}
                </Button>
              </>
            );
          } else if (product.status === "ARCHIVE") {
            return (
              <>
                <Button
                  disabled
                  className="flex-1 bg-muted text-muted-foreground"
                >
                  Archived
                </Button>
              </>
            );
          }
        })()}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              disabled={isDeleting}
              className="border-border hover:bg-destructive-foreground hover:text-destructive bg-transparent cursor-pointer"
            >
              {/* <Trash2 className="h-4 w-4" /> */}
              {isDeleting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                </>
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{product.name}"? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel className="border-border">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(product.id)}
                className="bg-destructive-foreground text-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
