import { User } from "@/entities/user"

type Session = {
  user: User | null;
  token: string | null;
}

type SessionStore = {
  session: Session | null;
  isAuthenticated: boolean;

  login: () => Promise<void>;
  logout: () => void;
};

export type {
  Session,
  SessionStore
}