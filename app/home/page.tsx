import HomeClient from "@/components/home-page";
import { ApiResponse, User } from "@/types/api";
import api from "@/utils/api";
import { cookies } from "next/headers";

async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  const getUser = async () => {
    try {
      const res = await api.get<ApiResponse<User>>("/auth/get-user", {
        headers: {
          Cookie: `accessToken=${token}`,
        },
      });

      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const currentUser = await getUser();
  return (
    <>
      <HomeClient user={currentUser} />
    </>
  );
}

export default Home;
