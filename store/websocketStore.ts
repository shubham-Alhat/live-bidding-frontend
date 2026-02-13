import { create } from "zustand";

interface WebSocketStoreState {
  ws: null | WebSocket;
  isConnected: boolean;
  setWs: (ws: WebSocket | null) => void;
  setIsConnected: (value: boolean) => void;
  connectToWsServer: (userId: string) => void;
}

const useWebsocketStore = create<WebSocketStoreState>((set, get) => ({
  ws: null,
  isConnected: false,
  setWs: (ws) => {
    set({ ws: ws });
  },
  setIsConnected: (value) => {
    set({ isConnected: value });
  },
  connectToWsServer: (userId) => {
    const { ws } = get();

    if (ws) return;

    const newSocket = new WebSocket("ws://localhost:8000/ws");

    newSocket.onopen = () => {
      get().setWs(newSocket);
      get().setIsConnected(true);
      newSocket.send(
        JSON.stringify({ type: "user_on_homepage", userId: userId }),
      );
    };

    newSocket.onerror = () => {
      if (newSocket.OPEN && ws) {
        get().setWs(null);
        get().setIsConnected(false);
      }
    };
  },
}));

export default useWebsocketStore;
