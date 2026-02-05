import LiveProductsPage from "@/components/live-product";
import { ApiRes, ApiResponse, Product } from "@/types/api";
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

  const getProduct = async () => {
    try {
      const res = await api.get<ApiRes<Product>>(`/product/${id}`, {
        headers: {
          Cookie: `accessToken=${token}`,
        },
      });

      return res.data.data;
    } catch (error) {
      console.log(error);
      redirect("/home/create?error=product_not_found");
    }
  };

  const product = await getProduct();

  return (
    <>
      <LiveProductsPage product={product} id={id} />
    </>
  );
}

export default LiveProductStatus;
