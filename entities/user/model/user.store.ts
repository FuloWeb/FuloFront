import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./users.type";

type UserState = {
  users: User[];
  selected: User | null;
  loading: boolean;
};

type UserActions = {
  setUsers: (u: User[]) => void;
  addUser: (u: User) => void;
  updateUser: (u: User) => void;
  deleteUser: (id: string) => void;
  selectUser: (u: User | null) => void;
  setLoading: (v: boolean) => void;
};

export const userStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      users: [],
      selected: null,
      loading: false,

      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (user) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === user.id ? user : u)),
        })),
      deleteUser: (id) =>
        set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
      selectUser: (user) => set({ selected: user }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: "user-storage" }
  )
);