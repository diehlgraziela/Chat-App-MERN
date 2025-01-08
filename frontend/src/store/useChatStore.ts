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

interface ChatState {
  messages: any[];
  users: User[];
  selectedUser: User | null;
  isMessagesLoading: boolean;
  isUsersLoading: boolean;
  isSendingMessage: boolean;

  setSelectedUser: (selectedUser: User) => void;
  getUsers: () => Promise<void>;
  getMessages: (userId: string, receiverId: string, text: string, image: string) => Promise<void>;
}

export const useChatStore = create<ChatState>()((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isMessagesLoading: false,
  isUsersLoading: false,
  isSendingMessage: false,

  setSelectedUser: (selectedUser: User) => set({ selectedUser }),

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

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      set({ messages: response.data });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (receiverId: string, text: string, image: string) => {
    set({ isSendingMessage: true });
    try {
      await axiosInstance.post(`/messages/${receiverId}`, { text, image });
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSendingMessage: true });
    }
  },
}));
