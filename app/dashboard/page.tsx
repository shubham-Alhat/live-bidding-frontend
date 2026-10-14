import SellerStudio from "@/components/seller-studio";
import { getSeller } from "@/utils/getSeller";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const res = await getSeller();

  if (!res) redirect("/login?ref=unAuthSeller");

  return (
    <>
      <div>
        <SellerStudio />
      </div>
    </>
  );
}
