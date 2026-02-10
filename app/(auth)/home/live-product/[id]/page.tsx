import LiveProductsPage from "@/components/live-product";
import { ApiRes, ApiResponse, Auction, Product } from "@/types/api";
import api from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function LiveProductStatus({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  const getAuction = async () => {
    try {
      const res = await api.get<ApiRes<Auction>>(
        `/auction/get-by-productId/${id}`,
        {
          headers: {
            Cookie: `accessToken=${token}`,
          },
        },
      );

      return res.data.data;
    } catch (error) {
      console.log(error);
      redirect("/home/create?error=product_not_found");
    }
  };

  const auction = await getAuction();

  return (
    <>
      <LiveProductsPage auction={auction} />
    </>
  );
}

export default LiveProductStatus;
