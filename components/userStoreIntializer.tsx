"use client";
import useAuthStore from "@/store/authStore";
import { User } from "@/types/api";
import { useEffect } from "react";

function UserStoreIntializer({
  user,
  token,
}: {
  user: User;
  token: string | undefined;
}) {
  const { setAuthUser } = useAuthStore();

  useEffect(() => {
    setAuthUser(user, token);
  }, []);

  return null;
}

export default UserStoreIntializer;
