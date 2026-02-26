import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  contacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isContactsLoading: false,
  isChatsLoading: false,
  isMessagesLoading: false,
  isUserLoggingOut: false,
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  getAllContacts: async () => {
    try {
      set({ isContactsLoading: true });
      const res = await axiosInstance.get("/message/contacts");
      set({ contacts: res.data.User });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isContactsLoading: false });
    }
  },
  getMyChatPartners: async () => {
    try {
      set({ isChatsLoading: true });
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isChatsLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error occur in messages fetching");
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMsg = {
      _id: tempId,
      senderId: authUser.user._id || authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // ✅ Add optimistic message
    set((state) => ({
      messages: {
        ...state.messages,
        messages: [...(state.messages?.messages || []), optimisticMsg],
      },
    }));

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData,
      );

      // ✅ Replace optimistic message
      set((state) => ({
        messages: {
          ...state.messages,
          messages: state.messages.messages.map((msg) =>
            msg._id === tempId ? res.data : msg,
          ),
        },
      }));
    } catch (error) {
      // ✅ Remove optimistic message on failure
      set((state) => ({
        messages: {
          ...state.messages,
          messages: state.messages.messages.filter((msg) => msg._id !== tempId),
        },
      }));

      console.log("Error in sending message:", error);
      toast.error(error?.response?.data?.message);
    }
  },
}));
