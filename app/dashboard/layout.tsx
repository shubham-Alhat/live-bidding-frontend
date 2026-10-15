import SellerInitializer from "@/components/seller-initializer";
import { getSeller } from "@/utils/getSeller";
import { redirect } from "next/navigation";
import React from "react";

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getSeller();

  if (!res) redirect("/login?AuthSeller=false");

  return (
    <>
      <SellerInitializer seller={res.seller} token={res.sellerToken} />
      {children}
    </>
  );
}
