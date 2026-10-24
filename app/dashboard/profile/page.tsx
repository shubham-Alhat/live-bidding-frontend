import ProfilePage from "@/components/profile";
import { getSeller } from "@/utils/getSeller";
import { redirect } from "next/navigation";

export default async function page() {
  const res = await getSeller();

  if (!res) redirect("/login?message=auth_user_not_found");

  return (
    <>
      <ProfilePage seller={res.seller} />
    </>
  );
}
