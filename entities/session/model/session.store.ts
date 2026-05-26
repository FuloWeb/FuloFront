import { create } from "zustand";
import { SessionStore } from "./session.types";

export const useSessionStore =
  create<SessionStore>((set) => ({
    user: null,
    // Usado em login na feature de auth
    initSession: (updatedUser) => {
      set({
        user: updatedUser,
      });
    },
    // Usado em logout na feature de auth
    endSession: () => {
      set({
        user: null,
      });
    },
  }));