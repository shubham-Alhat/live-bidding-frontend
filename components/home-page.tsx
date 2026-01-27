"use client";
import useAuthStore from "@/store/authStore";
import { ApiResponse, User } from "@/types/api";
import api from "@/utils/api";
import React, { useEffect } from "react";

interface HomeClientProps {
  user: User;
}

function HomeClient({ user }: HomeClientProps) {
  const { setAuthUser, authUser } = useAuthStore();

  return (
    <>
      <div>home page</div>
      <p>{authUser?.username}</p>
    </>
  );
}

export default HomeClient;
