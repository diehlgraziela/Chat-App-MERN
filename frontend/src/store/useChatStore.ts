import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";
import { IUser } from "../types/IUser";
import { IMessage } from "../types/IMessage";

interface ChatState {
  messages: IMessage[];
  users: IUser[];
  selectedUser: IUser | null;
  isMessagesLoading: boolean;
  isUsersLoading: boolean;
  isSendingMessage: boolean;

  setSelectedUser: (selectedUser: IUser | null) => void;
  getUsers: () => Promise<void>;
  getMessages: (receiverId: string) => Promise<void>;
  sendMessage: (text: string, image: string | null) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isMessagesLoading: false,
  isUsersLoading: false,
  isSendingMessage: false,

  setSelectedUser: (selectedUser: IUser | null) => set({ selectedUser }),

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
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (socket)
      socket.on("newMessage", (message: IMessage) => {
        if (message.senderId !== selectedUser._id) return;

        set({ messages: [...get().messages, message] });
      });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (socket) socket.off("newMessage");
  },
}));
