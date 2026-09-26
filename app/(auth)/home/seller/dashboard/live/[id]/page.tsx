import { ApiResponse, AuthApiResponse, AuthUser, Show } from "@/types/api";
import api, { CustomError } from "@/utils/api";
import { cookies, headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { AccessToken } from "livekit-server-sdk";
import StreamContainer from "@/components/stream-container";

function isCustomError(error: unknown): error is CustomError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error &&
    "statusText" in error
  );
}

const getUser = async (): Promise<AuthUser> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) redirect("/login");

  try {
    const res = await api.get<AuthApiResponse<AuthUser>>(
      `${process.env.INTERNAL_API_URL}/auth/get-user`,
      { headers: { Cookie: `accessToken=${token}` } },
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    redirect("/login");
  }
};

const getCurrentShow = async (id: string): Promise<Show> => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  if (!token) {
    console.log("no token found");
    redirect("/login");
  }

  try {
    const res = await api.get<ApiResponse<Show>>(
      `${process.env.INTERNAL_API_URL}/show/${id}`,
      {
        headers: {
          Cookie: `accessToken=${token}`,
        },
      },
    );

    if (!res.data.data) notFound();

    return res.data.data;
  } catch (error) {
    if (isCustomError(error)) {
      console.log("status:", error.status, "message:", error.message);

      if (error.status === 401) {
        redirect("/login");
      }

      if (error.status === 404) {
        notFound();
      }

      throw new Error(error.message);
    }

    console.log("unexpected error:", error);
    throw error;
  }
};

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("show Id : ", id);

  const authUser = await getUser();

  console.log(authUser);

  const currentShow = await getCurrentShow(id);

  console.log(currentShow);

  if (authUser.id !== currentShow.ownerId) redirect("/home?unauthorized=true");

  if (currentShow.status === "ENDED") redirect(`/home?auction-ended=true`);

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /iPhone|iPad|Android/i.test(userAgent);

  console.log(userAgent);

  let initialToken: string | undefined = undefined;

  if (currentShow.status === "ACTIVE") {
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY!,
      process.env.LIVEKIT_API_SECRET!,
      {
        identity: authUser.id,
        name: authUser.username || "Streamer",
      },
    );
    at.addGrant({
      room: id,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });
    initialToken = await at.toJwt();
  }

  return (
    <>
      <StreamContainer
        show={currentShow}
        isMobile={isMobile}
        initialToken={initialToken}
      />
    </>
  );
}
