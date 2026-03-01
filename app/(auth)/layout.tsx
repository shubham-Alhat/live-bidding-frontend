import UserStoreIntializer from "@/components/userStoreIntializer";
import api from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AuthUser {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthApiResponse<T> {
  message: string;
  data: T;
}

const getUser = async (): Promise<AuthUser> => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  if (!token) {
    console.log("not token found");
    redirect("/login");
  }

  try {
    console.log("/auth/getuser called");
    const res = await api.get<AuthApiResponse<AuthUser>>("/auth/get-user", {
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);

    redirect("/login");
  }
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  return (
    <>
      <UserStoreIntializer user={user} token={token} />
      {children}
    </>
  );
}
