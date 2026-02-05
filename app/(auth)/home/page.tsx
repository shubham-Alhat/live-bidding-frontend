import HomeClient from "@/components/home-page";
import { ApiRes, ApiResponse, Auction, Product } from "@/types/api";
import api from "@/utils/api";
import { cookies } from "next/headers";

async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  const getAllLiveProducts = async () => {
    try {
      const res = await api.get<ApiRes<Auction[]>>("/product/all-product", {
        headers: {
          Cookie: `accessToken=${token}`,
        },
      });

      return res.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const allAuctions = await getAllLiveProducts();

  return (
    <>
      <HomeClient allAuctions={allAuctions} />
    </>
  );
}

export default Home;
