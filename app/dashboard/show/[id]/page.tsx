import PreviewStage from "@/components/preview-stage";
import { ApiResponse, Product, Show } from "@/types/api";
import api from "@/utils/api";
import { getSeller } from "@/utils/getSeller";

import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

const getShowAndProducts = async (id: string, token: string) => {
  // check if show exists && seller is owner of this show
  // fetch the products also
  try {
    const res = await api.get<
      ApiResponse<{ show: Show; sellerProducts: Product[] | [] }>
    >(`${process.env.INTERNAL_API_URL}/show/${id}`, {
      headers: {
        Cookie: `accessToken=${token}`,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.data) notFound();
    return res.data.data;
  } catch (error) {
    console.log(error);
    redirect("/login?message=error_in_live_show");
  }
};

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("show Id : ", id);

  // token check
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) redirect("/login?message=auth_required");

  // access user
  const user = await getSeller();
  if (!user) redirect("/login?message=auth_required");

  // get the show
  const showAndProducts = await getShowAndProducts(id, token);
  console.log("show & products : ", showAndProducts);

  // access userAgent to know whether we are on mobile/desktop
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /iPhone|iPad|Android/i.test(userAgent);

  // render preview stage when show is scheduled
  if (showAndProducts.show.status === "SCHEDULED") {
    return (
      <>
        <PreviewStage
          isMobile={isMobile}
          show={showAndProducts.show}
          sellerProductList={showAndProducts.sellerProducts}
          seller={user.seller}
        />
      </>
    );
  }

  // let initialToken: string | undefined = undefined;

  // if (currentShow.status === "ACTIVE") {
  //   const at = new AccessToken(
  //     process.env.LIVEKIT_API_KEY!,
  //     process.env.LIVEKIT_API_SECRET!,
  //     {
  //       identity: authUser.id,
  //       name: authUser.username || "Streamer",
  //     },
  //   );
  //   at.addGrant({
  //     room: id,
  //     roomJoin: true,
  //     canPublish: true,
  //     canSubscribe: true,
  //   });
  //   initialToken = await at.toJwt();
  // }

  return (
    <>
      <div>
        liev stream page, status: {JSON.stringify(showAndProducts.show.status)}
      </div>
    </>
  );
}
