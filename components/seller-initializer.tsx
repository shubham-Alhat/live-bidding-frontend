"use client";
import useAuthStore from "@/store/authStore";
import useWebsocketStore from "@/store/websocketStore";
import { AuthUser } from "@/types/api";
import { useEffect } from "react";

export default function SellerInitializer({
  seller,
  token,
}: {
  seller: AuthUser;
  token: string;
}) {
  const { setAuthUser } = useAuthStore();
  const { setToken } = useWebsocketStore();

  useEffect(() => {
    if (seller && token) setAuthUser(seller, token);
    if (token) setToken(token);
  }, [seller, token]);

  return null;
}
