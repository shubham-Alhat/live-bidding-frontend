"use client";
import useAuthStore from "@/store/authStore";
import { ApiResponse, User } from "@/types/api";
import api from "@/utils/api";
import React, { useEffect } from "react";

interface HomeClientProps {
  user: User | null;
}

function HomeClient({ user }: HomeClientProps) {
  const { setAuthUser, authUser } = useAuthStore();

  useEffect(() => {
    setAuthUser(user);
  }, []);

  return (
    <>
      <div>home page</div>
      <p>{authUser ? `user exist ${authUser.username}` : "no user"}</p>
    </>
  );
}

export default HomeClient;
