import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface User {
  _id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  fullName: string;
  profilePic: string;
}

interface Messages {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ChatState {
  messages: Messages[];
  users: User[];
  selectedUser: User | null;
  isMessagesLoading: boolean;
  isUsersLoading: boolean;
  isSendingMessage: boolean;

  setSelectedUser: (selectedUser: User | null) => void;
  getUsers: () => Promise<void>;
  getMessages: (receiverId: string) => Promise<void>;
  sendMessage: (text: string, image: string | null) => Promise<void>;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isMessagesLoading: false,
  isUsersLoading: false,
  isSendingMessage: false,

  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (receiverId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${receiverId}`);
      set({ messages: response.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (text: string, image: string | null) => {
    const { selectedUser, messages } = get();

    set({ isSendingMessage: true });
    try {
      const response = await axiosInstance.post(`/message/${selectedUser?._id}`, { text, image });
      set({ messages: [...messages, response.data] });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSendingMessage: true });
    }
  },
}));
