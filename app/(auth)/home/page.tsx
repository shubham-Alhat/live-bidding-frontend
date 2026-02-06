import HomeClient from "@/components/home-page";
import { ApiRes, ApiResponse, Auction, Product } from "@/types/api";
import api from "@/utils/api";
import { cookies } from "next/headers";

async function Home() {
  return (
    <>
      <HomeClient />
    </>
  );
}

export default Home;
