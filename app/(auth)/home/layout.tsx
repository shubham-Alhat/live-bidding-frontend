"use client";

import useAuthStore from "@/store/authStore";
import useWebsocketStore from "@/store/websocketStore";
import { useEffect } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, authUser } = useAuthStore();
  const { ws, connectToWsServer, disconnectToWsServer, isConnected } =
    useWebsocketStore();

  useEffect(() => {
    console.log("HomeLayout in useEFFect : check how many time runs");
    if (!ws && !isConnected) {
      if (authUser && token) connectToWsServer(authUser.id, token);
    }

    return () => {
      console.log("layout unmounts return runs...");
      disconnectToWsServer();
    };
  }, [authUser]);

  return <>{children}</>;
}
