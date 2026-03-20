"use client";
import useAuthStore from "@/store/authStore";
import useWebsocketStore from "@/store/websocketStore";
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
  const { setToken } = useWebsocketStore();

  useEffect(() => {
    setAuthUser(user, token);
    if (token) setToken(token);
  }, []);

  return null;
}

export default UserStoreIntializer;
