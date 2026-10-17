import ProductListingForm from "@/components/product-listing-form";

export default function page() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
          <header className="mx-auto w-full">
            <div className="w-full flex items-center justify-center text-[18px] font-semibold">
              Create Product Listings
            </div>
          </header>
          {/* actual form */}
          <ProductListingForm />
        </div>
      </main>
    </>
  );
}
