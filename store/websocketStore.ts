import { create } from "zustand";

interface WebSocketStoreState {
  ws: null | WebSocket;
  isConnected: boolean;
  connectToWsServer: (userId: string, token: string | undefined) => void;
  disconnectToWsServer: () => void;
}

const useWebsocketStore = create<WebSocketStoreState>((set, get) => ({
  ws: null,
  isConnected: false,

  connectToWsServer: (userId, token) => {
    const { ws } = get();

    if (ws && ws.readyState === WebSocket.OPEN) return;

    const newSocket = new WebSocket(`ws://localhost:8000/ws?token=${token}`);
    console.log("send a conn req..");

    newSocket.onopen = () => {
      set({ ws: newSocket, isConnected: true });
      console.log("connected to server..");
      newSocket.send(
        JSON.stringify({ type: "user_connected", userId: userId }),
      );
    };

    newSocket.onclose = () => {
      set({ ws: null, isConnected: false });
      console.log("disconnect to server");
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
