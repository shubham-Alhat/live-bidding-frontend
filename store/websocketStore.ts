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

    // Check if already connected or connecting
    if (ws) {
      if (ws.readyState === WebSocket.OPEN) {
        console.log("Already connected to WebSocket");
        return;
      }
      if (ws.readyState === WebSocket.CONNECTING) {
        console.log("WebSocket connection in progress");
        return;
      }
      // If CLOSING or CLOSED, clean up before creating new connection
      if (
        ws.readyState === WebSocket.CLOSING ||
        ws.readyState === WebSocket.CLOSED
      ) {
        set({ ws: null, isConnected: false });
      }
    }

    const newSocket = new WebSocket(`ws://localhost:8000/ws?token=${token}`);
    console.log("send a conn req..");

    newSocket.onopen = () => {
      set({ ws: newSocket, isConnected: true });
      console.log("connected to WS server..");
      newSocket.send(
        JSON.stringify({ type: "user_connected", userId: userId }),
      );
    };

    newSocket.onclose = () => {
      set({ ws: null, isConnected: false });
      console.log("disconnect to WS server");
    };

    newSocket.onerror = (err) => {
      console.log(err);
    };
  },
  disconnectToWsServer: () => {
    const { ws } = get();

    if (ws) {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      )
        console.log("diconnect to server called and ws.close()");
      ws.close();
      set({ ws: null, isConnected: false });
    }
  },
}));

export default useWebsocketStore;
