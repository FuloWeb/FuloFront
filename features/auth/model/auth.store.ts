import { User } from "@/entities";
import { AuthState, AuthStoreType, IAuthStore } from "./auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

class AuthStore implements IAuthStore {
  private set: (
    partial:
      | Partial<AuthState>
      | ((state: AuthState) => Partial<AuthState>)
  ) => void;

  private get: () => AuthState;

  constructor(set: AuthStore["set"], get: AuthStore["get"]) {
    this.set = set;
    this.get = get;
  }

  initSession(user: User) {
    this.set({
      user,
      loading: false,
    });
  }

  endSession() {
    this.set({
      user: null,
      loading: false,
    });
  }

  finishAuthCheck() {
    this.set({
      loading: false,
    });
  }
}

export const authStore = create<AuthStoreType>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      
      initSession: (user: User) => set({ user, loading: false }),
      endSession: () => set({ user: null, loading: false }),
      finishAuthCheck: () => set({ loading: false }),

      auth: new AuthStore(
        set,
        () => ({
          user: get().user,
          loading: get().loading,
        })
      ),
    }),

    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        // @ts-expect-error dont have time
        state?.finishAuthCheck()
      },
    }
  )
);