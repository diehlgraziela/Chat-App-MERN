import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

// TODO - Create folder for interfaces
interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

interface AuthState {
  authUser: {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
    createdAt: string;
  } | null;
  onlineUsers: string[];

  socket: ReturnType<typeof io> | null;

  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isGettingUser: boolean;

  getUser: () => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profilePic: string) => Promise<void>;

  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isGettingUser: true,
  onlineUsers: [],

  socket: null,

  getUser: async () => {
    set({ isGettingUser: true });
    try {
      const response = await axiosInstance.get("/auth/user");

      set({ authUser: response.data });

      get().connectSocket();
    } catch (error) {
      console.error(error);
      set({ authUser: null });
    } finally {
      set({ isGettingUser: false });
    }
  },

  signUp: async (userData: SignUpData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/user", userData);
      set({ authUser: response.data });

      get().connectSocket();

      toast.success("Cadastro realizado com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      set({ authUser: response.data });

      get().connectSocket();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      axiosInstance.post("/auth/logout");

      set({ authUser: null });

      get().disconnectSocket();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (profilePic: string) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/user", { profilePic });
      set({ authUser: response.data });

      toast.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
