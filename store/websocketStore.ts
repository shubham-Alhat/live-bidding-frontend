import { create } from "zustand";
import useAuthStore from "./authStore";
import { liveAuctionsViewerCount, Participants } from "@/types/api";

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
  status: "active" | "ended";
  startTime: number;
  endTime: number;
}

interface WebSocketStoreState {
  ws: null | WebSocket;
  isConnected: boolean;
  selectedLiveAuction: AuctionState | null;
  liveAuctionsViewerCount: liveAuctionsViewerCount[];
  liveAuctionMembersCount: number;
  liveAuctionParticipants: Participants[];
  bidCount: number;
  currentHighestBidAmount: number;
  currentHighestBidder: null | string;
  nextMinBidAmount: number;
  startTime: number;
  endTime: number;
  auctionStatus: "active" | "ended";
  setAuctionStatus: (status: "active" | "ended") => void;
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  connectToWsServer: (userId: string, token: string | undefined) => void;
  disconnectToWsServer: () => void;
  sendWsMessage: (data: RawDataState) => void;
}

let reconnectAttempts = 0;
let reconnectTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

const MAX_RETRIES = 10;

const getBackoffTime = (attempt: number) => {
  return Math.min(1000 * 2 ** attempt, 10000);
};

const useWebsocketStore = create<WebSocketStoreState>((set, get) => ({
  ws: null,
  isConnected: false,
  liveAuctionsViewerCount: [],
  liveAuctionMembersCount: 0,
  liveAuctionParticipants: [],
  bidCount: 0,
  currentHighestBidAmount: 0,
  currentHighestBidder: null,
  nextMinBidAmount: 1,
  startTime: 0,
  endTime: 0,
  auctionStatus: "active",
  setAuctionStatus: (status: "active" | "ended") => {
    set({ auctionStatus: status });
  },
  token: undefined,
  setToken: (token) => {
    set({ token: token });
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

      if (
        ws.readyState === WebSocket.CLOSING ||
        ws.readyState === WebSocket.CLOSED
      ) {
        set({ ws: null, isConnected: false });
      }
    }

    const newSocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`,
    );
    console.log("send a conn req..");

    newSocket.onopen = () => {
      // reconnectAttempts = 0;
      // clearTimeout(reconnectTimeout);
      set({ ws: newSocket, isConnected: true });
      console.log("connected to WS server..");

      // if selectedLiveAuction is there, send event to rejoin auction
      const { selectedLiveAuction } = get();
      if (selectedLiveAuction) {
        newSocket.send(
          JSON.stringify({
            type: "rejoin_auction",
            payload: {
              auctionId: selectedLiveAuction.auctionId,
              userId: userId,
              username: useAuthStore.getState().authUser?.username,
            },
          }),
        );
      }
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("------  ws data ----------");
      console.log(data);

      switch (data.type) {
        case "live_auctions_feed":
          set({
            liveAuctionsViewerCount: data.payload.liveAuctionsViewerCount,
          });
          break;
        case "new_user_joined":
          set({
            liveAuctionMembersCount: data.payload.viewerCount,
            liveAuctionParticipants: data.payload.participants,
          });
          break;
        case "current_auction_data":
          set({
            bidCount: data.payload.bidCount,
            currentHighestBidAmount: data.payload.currentHighestBidAmount,
            currentHighestBidder: data.payload.currentHighestBidder,
            nextMinBidAmount: data.payload.nextMinBidAmount,
            startTime: data.payload.startTime,
            endTime: data.payload.endTime,
            auctionStatus: data.payload.auctionStatus,
          });

          set({
            selectedLiveAuction: {
              auctionId: data.payload.auctionId,
              status: data.payload.auctionStatus,
              startTime: data.payload.startTime,
              endTime: data.payload.endTime,
            },
          });

          break;
        case "new_bid_placed":
          set({
            currentHighestBidAmount: data.payload.bidAmount,
            currentHighestBidder: data.payload.username,
            bidCount: data.payload.bidCount,
            nextMinBidAmount: data.payload.nextMinBid,
          });
          console.log("new bid placed - ", Date.now());

          break;
        case "rejoin_auction_state":
          set({ selectedLiveAuction: data.payload.auctionState });
          break;

        case "user_leave_auction":
          set({
            liveAuctionMembersCount: data.payload.viewerCount,
            liveAuctionParticipants: data.payload.participants,
          });
          break;
        case "auction_ended":
          // set({ selectedLiveAuction: data.payload.auctionState });
          // if (data.payload.auctionState.status === "ended") {
          //   set({ isSelectedLiveAuctionEnded: true });
          //   set({
          //     winner: data.payload.auctionState.currentHighestBid.userName,
          //   });
          // }
          break;
        default:
        // set({ isBidProcessing: false });
      }
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

    if (ws) {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        console.log("diconnect to server called and ws.close()");
        ws.close();
        set({ ws: null, isConnected: false });
      }
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
