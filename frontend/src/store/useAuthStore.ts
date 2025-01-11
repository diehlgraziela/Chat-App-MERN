import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { IUser, ISignUpData, ILoginData } from "../types/IUser";

const BASE_URL = "http://localhost:3000";

interface AuthState {
  authUser: IUser | null;
  onlineUsers: string[];

  socket: Socket;

  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isGettingUser: boolean;

  getUser: () => Promise<void>;
  signUp: (userData: ISignUpData) => Promise<void>;
  login: (userData: ILoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profilePic: string) => Promise<void>;

  connectSocket: () => void;
  disconnectSocket: () => void;
}

const savedAuthUser = localStorage.getItem("authUser");

export const useAuthStore = create<AuthState>()((set, get) => ({
  authUser: savedAuthUser ? JSON.parse(savedAuthUser) : null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isGettingUser: true,
  onlineUsers: [],

  socket: io(),

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

  signUp: async (userData: ISignUpData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/user", userData);
      set({ authUser: response.data });

      localStorage.setItem("authUser", JSON.stringify(response.data));

      get().connectSocket();

      toast.success("Cadastro realizado com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (userData: ILoginData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      set({ authUser: response.data });

      localStorage.setItem("authUser", JSON.stringify(response.data));

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

      localStorage.removeItem("authUser");

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

      localStorage.setItem("authUser", JSON.stringify(response.data));

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
