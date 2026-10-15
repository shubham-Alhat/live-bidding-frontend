import { AuthUser, MainUser } from "@/types/api";
import { create } from "zustand";

interface AuthState {
  authUser: AuthUser | MainUser | null;
  token: string | undefined;
  setAuthUser: (
    user: AuthUser | MainUser | null,
    token: string | undefined,
  ) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  token: undefined,
  setAuthUser: (user, token) => {
    set({ authUser: user, token: token });
  },
}));

export default useAuthStore;
