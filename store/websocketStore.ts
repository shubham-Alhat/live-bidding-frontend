import { create } from "zustand";

export interface RawDataState {
  type: string;
  payload: object;
}

export interface AuctionBid {
  id: number;
  userId: string;
  amount: number;
  timestamp: number;
  userName: string;
}

export interface AuctionState {
  auctionId: string;
  viewerCount: number;
  bids: AuctionBid[];
  startingPrice: number;
  nextBidAmount: number;
  currentHighestBid: AuctionBid | null;
  startTime: number;
  endTime: number;
  remainingTime: number;
  status: "pending" | "active" | "ended";
  participants: {
    userId: string;
    username: string;
    joinedAt: number;
  }[];
}

interface WebSocketStoreState {
  ws: null | WebSocket;
  isConnected: boolean;
  selectedLiveAuction: AuctionState | null;
  isSelectedLiveAuctionEnded: boolean;

  setIsSelectedLiveAuctionEnded: (value: boolean) => void;
  liveAuctionsViewerCount: AuctionState[];
  connectToWsServer: (userId: string, token: string | undefined) => void;
  disconnectToWsServer: () => void;
  sendWsMessage: (data: RawDataState) => void;
}

const useWebsocketStore = create<WebSocketStoreState>((set, get) => ({
  ws: null,
  isConnected: false,
  liveAuctionsViewerCount: [],
  currentHighestBid: 0,

  isSelectedLiveAuctionEnded: false,
  setIsSelectedLiveAuctionEnded: (value) => {
    set({ isSelectedLiveAuctionEnded: value });
  },
  selectedLiveAuction: null,
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
      // newSocket.send(
      //   JSON.stringify({ type: "user_connected", userId: userId }),
      // );
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("------  ws data ----------");
      console.log(data);

      switch (data.type) {
        case "live_auctions_feed":
          set({ liveAuctionsViewerCount: data.payload.liveAuctions });
          break;
        case "new_user_joined":
          set({ selectedLiveAuction: data.payload.auctionState });

          if (data.payload.auctionState.status === "ended") {
            set({ isSelectedLiveAuctionEnded: true });
          }
          break;
        case "new_bid_placed":
          set({ selectedLiveAuction: data.payload.auctionState });

        case "user_leave_auction":
          set({ selectedLiveAuction: data.payload.auctionState });
          break;
        case "auction_ended":
          set({ selectedLiveAuction: data.payload.auctionState });
          if (data.payload.auctionState.status === "ended") {
            set({ isSelectedLiveAuctionEnded: true });
          }
          break;
      }
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

  sendWsMessage: (data) => {
    const { ws } = get();

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    } else {
      console.log("Websocket not connected, cant send messages..");
    }
  },
}));

export default useWebsocketStore;
