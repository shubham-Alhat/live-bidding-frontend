"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

import { Trash2 } from "lucide-react";
import { ApiResponse, Product } from "@/types/api";
import useProductStore from "@/store/productStore";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { deleteProduct } = useProductStore();
  const [isDeleting, setIsDeleting] = useState(false);

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
    <Card className="flex flex-col overflow-hidden rounded-2xl border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="relative m-3 h-48 overflow-hidden rounded-xl bg-secondary">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card Content */}
      <CardContent className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-0">
        <h3 className="text-base font-semibold text-foreground line-clamp-1">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price + Delete row */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Initial Price</p>
            <p className="text-xl font-bold text-primary">
              ${product.initialPrice}
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                disabled={isDeleting}
                className="border-border bg-transparent hover:bg-destructive-foreground hover:text-destructive cursor-pointer"
              >
                {isDeleting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
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
                  className="bg-destructive-foreground text-destructive hover:bg-destructive/90 cursor-pointer"
                >
                  Delete
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
