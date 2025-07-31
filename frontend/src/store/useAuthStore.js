import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);

      set({ user: response?.data.user });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      toast.success("Logged out successfully");
      set({ user: null });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    } finally {
      set({ isLoggingOut: false });
    }
  },
  authCheck: async () => {
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user });
    } catch (error) {
      console.error("Auth check failed:", error);
      set({ user: null });
      // toast.error(
      //   error.response?.data?.message || "Authentication check failed."
      // );
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
