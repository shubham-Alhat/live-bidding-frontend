import { create } from "zustand";

interface WebSocketStoreState {
  ws: null | WebSocket;
  isConnected: boolean;
  connectToWsServer: (userId: string) => void;
  disconnectToWsServer: () => void;
}

const useWebsocketStore = create<WebSocketStoreState>((set, get) => ({
  ws: null,
  isConnected: false,

  connectToWsServer: (userId) => {
    const { ws } = get();

    if (ws && ws.readyState === WebSocket.OPEN) return;

    const newSocket = new WebSocket("ws://localhost:8000/ws");

    newSocket.onopen = () => {
      set({ ws: newSocket, isConnected: true });
      newSocket.send(
        JSON.stringify({ type: "user_connected", userId: userId }),
      );
    };

    newSocket.onclose = () => {
      set({ ws: null, isConnected: false });
    };

    newSocket.onerror = (err) => {
      console.log(err);
    };
  },
  disconnectToWsServer: () => {
    const { ws } = get();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
      set({ ws: null, isConnected: false });
    }
  },
}));

export default useWebsocketStore;
