import { create } from "zustand";

export type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  updatedAt?: string;
  createdAt?: string;
};

interface AuthState {
  authUser: User | null;
  token: string | undefined;
  setAuthUser: (user: User | null, token: string | undefined) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  token: undefined,
  setAuthUser: (user, token) => {
    set({ authUser: user, token: token });
  },
}));

export default useAuthStore;
