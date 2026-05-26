import { User } from "@/entities/user"

type SessionStore = {
  user: User | null;
  initSession: (user: User) => void;
  endSession: () => void;
};

export type {
  SessionStore
}