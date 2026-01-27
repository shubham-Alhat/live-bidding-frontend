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
  setAuthUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  setAuthUser: (user) => {
    set({ authUser: user });
  },
}));

export default useAuthStore;
