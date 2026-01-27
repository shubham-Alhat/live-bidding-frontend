import HomeClient from "@/components/home-page";
import { ApiResponse, User } from "@/types/api";
import api from "@/utils/api";

function Home() {
  const getUser = async () => {
    try {
      const res = await api.get<ApiResponse<User>>("/auth/get-user");

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = getUser();

  return (
    <>
      <HomeClient user={currentUser} />
    </>
  );
}

export default Home;
