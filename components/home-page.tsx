"use client";
import useAuthStore from "@/store/authStore";

function HomeClient() {
  const { authUser } = useAuthStore();

  return (
    <>
      <div>home page</div>
      <p>{authUser ? `user exist ${authUser.username}` : "no user"}</p>
    </>
  );
}

export default HomeClient;
