import SellerStudio from "@/components/seller-studio";
import { getSeller } from "@/utils/getSeller";
import { redirect } from "next/navigation";

export default async function page() {
  const res = await getSeller();

  if (!res) redirect("/login?authSeller=false");

  return (
    <>
      <SellerStudio />
    </>
  );
}
