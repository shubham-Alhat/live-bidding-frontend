"use client";
import useAuthStore from "@/store/authStore";
import { ApiResponse, User } from "@/types/api";
import api from "@/utils/api";
import React, { useEffect } from "react";

function HomeClient() {
  const { setAuthUser, authUser } = useAuthStore();

  useEffect(() => {
    const getUser = async () => {
      const res = await api.get<ApiResponse<User>>("/auth/get-user");

      console.log(res.data.data);
      setAuthUser(res.data.data);
    };

    getUser();
  }, []);

  return (
    <>
      <div>home page</div>
      <p>{authUser?.username}</p>
    </>
  );
}

export default HomeClient;
