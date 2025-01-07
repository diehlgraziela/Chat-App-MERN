import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

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

  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isGettingUser: boolean;

  getUser: () => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profilePic: string) => Promise<void>;
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

  signUp: async (userData: SignUpData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/user", userData);
      set({ authUser: response.data });

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
}));
