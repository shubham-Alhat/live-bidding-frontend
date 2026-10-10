"use client";

import useAuthStore from "@/store/authStore";
import useWebsocketStore from "@/store/websocketStore";
import { MainUser } from "@/types/api";

import { useEffect } from "react";

export default function WsProvider({
  children,
  initialUser,
  initialToken,
}: {
  children: React.ReactNode;
  initialUser: MainUser | null;
  initialToken: string | undefined;
}) {
  const { authUser, setAuthUser } = useAuthStore();
  const {
    ws,
    connectToWsServer,
    disconnectToWsServer,
    isConnected,
    token,
    setToken,
  } = useWebsocketStore();

  // first set the user and token in zustand
  useEffect(() => {
    if (initialUser && initialToken) setAuthUser(initialUser, initialToken);

    if (initialToken) setToken(initialToken);
  }, [initialUser, initialToken]);

  useEffect(() => {
    console.log("ws layout in useEFFect : check how many time runs");
    if (!ws && !isConnected) {
      if (authUser && token) connectToWsServer(authUser.id, token);
    }

    return () => {
      console.log("layout unmounts return runs...");
      disconnectToWsServer();
    };
  }, [authUser, token]);

  return <>{children}</>;
}
