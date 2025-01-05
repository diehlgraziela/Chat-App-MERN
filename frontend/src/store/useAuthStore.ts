import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthState {
  authUser: {
    id: string;
    email: string;
    profilePic: string;
  } | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isGettingUser: boolean;

  getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isGettingUser: true,

  getUser: async () => {
    set({ isGettingUser: true });
    try {
      const response = await axiosInstance.get("/auth/user");

      set({ authUser: response.data });
    } catch (error) {
      console.error(error);
      set({ authUser: null });
    } finally {
      set({ isGettingUser: false });
    }
  },
}));
