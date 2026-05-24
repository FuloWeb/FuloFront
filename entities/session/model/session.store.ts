import { create } from "zustand";
import { SessionStore } from "./session.types";
import { postLogin } from "../api";

export const useSessionStore =
  create<SessionStore>((set) => ({
    session: null,
    isAuthenticated: false,
    login: async () => {
      const session = await postLogin();

      set({
        session,
        isAuthenticated: true,
      });
    },
    logout: () => {
      set({
        session: null,
        isAuthenticated: false,
      });
    },
  }));