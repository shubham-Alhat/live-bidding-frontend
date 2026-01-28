"use client";
import useAuthStore from "@/store/authStore";
import { User } from "@/types/api";
import { useEffect } from "react";

function UserStoreIntializer({ user }: { user: User }) {
  const { setAuthUser } = useAuthStore();

  useEffect(() => {
    setAuthUser(user);
  }, []);

  return null;
}

export default UserStoreIntializer;
