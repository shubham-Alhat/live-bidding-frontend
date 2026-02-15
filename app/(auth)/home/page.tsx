import HomeClient from "@/components/home-page";
import { ApiRes, ApiResponse, Auction, Product } from "@/types/api";
import api from "@/utils/api";
import { cookies } from "next/headers";

async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  return (
    <>
      <HomeClient token={token} />
    </>
  );
}

export default Home;
