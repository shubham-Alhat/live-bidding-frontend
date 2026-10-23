import { ProductList } from "@/components/product-list";
import ProductListingForm from "@/components/product-listing-form";
import { CircleArrowLeft } from "lucide-react";

export default function page() {
  return (
    <>
      <main className="min-h-screen bg-background">
        {/* create product form */}
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
          <ProductListingForm />
        </div>
        {/* product cards to render when created */}
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 pb-8">
          <ProductList />
        </div>
      </main>
    </>
  );
}
