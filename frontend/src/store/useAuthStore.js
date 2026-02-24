import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AccessibilityIcon } from "lucide-react";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggedIn: false,
  isUpdatingProfilePhoto: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in auth check: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error) {
      console.log("ERROR DATA:", error.response?.data);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message ||
          "Signup failed",
      );
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggedIn: true });
    try {
      await axiosInstance.post("/auth/login", data);

      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      toast.success("Account login successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          error.message ||
          "Signup failed",
      );
    } finally {
      set({ isLoggedIn: false });
    }
  },
  logout: async () => {
    try {
      set({ isUserLoggingOut: true });
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("error occurs while logging Out", error);
      toast.error(error.response.data.messages);
    } finally {
      set({ isUserLoggingOut: false });
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfilePhoto: true });
      await axiosInstance.put("/auth/update-profile", data);

      // refresh authenticated user
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      toast.success("Profile update successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUpdatingProfilePhoto: false });
    }
  },
}));
