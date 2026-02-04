"use client";

import { useEffect, useState } from "react";
import { CreateProductForm } from "@/components/create-product-form";
import { ProductList } from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ApiResponse, getAllProductResponse, Product } from "@/types/api";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/utils/api";
import useProductStore from "@/store/productStore";

export default function Create() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const { setProductList } = useProductStore();

  const addProduct = (product: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toString(),
    };
    setProducts([newProduct, ...products]);
  };

  const launchProduct = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isLaunched: true } : p)),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res =
          await api.get<getAllProductResponse<Product[]>>("/product/get-all");

        setProductList(res.data.data);
      } catch (error) {
        toast.error(getErrorMessage(error));
        console.log(error);
      }
    };
    getAllProducts();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CircleArrowLeft
          onClick={() => router.push("/home")}
          className="mb-4 hover:text-muted-foreground/80 cursor-pointer duration-200"
        />

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            Auction Product Manager
          </h1>
          <p className="mt-2 text-muted-foreground">
            Create, manage, and launch your auction products
          </p>
        </div>

        {/* Create Product Section */}
        <div className="mb-12">
          <CreateProductForm onAddProduct={addProduct} />
        </div>

        {/* Products List Section */}
        <ProductList
          products={products}
          onLaunch={launchProduct}
          onDelete={deleteProduct}
        />
      </div>
    </main>
  );
}
