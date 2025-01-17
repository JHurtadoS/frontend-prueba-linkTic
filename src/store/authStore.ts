import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  role: string | null;
  username: string | null;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
  setUsername: (username: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  username: null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    Cookies.set("token", token, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
    set({ token });
  },
  setRole: (role) => {
    localStorage.setItem("role", role);
    set({ role });
  },
  setUsername: (username) => {
    localStorage.setItem("username", username);
    set({ username });
  },
  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    Cookies.remove("token");
    set({ token: null, role: null, username: null });
  },
}));
