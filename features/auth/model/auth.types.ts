import { User } from "@/entities/user"

interface IAuthStore {
  initSession(user: User): void;
  endSession(): void;
  finishAuthCheck(): void;
};

type AuthState = {
  user: User | null;
  loading: boolean
};

type AuthStoreType = AuthState & {
  auth: IAuthStore;
};

export type {
  IAuthStore,
  AuthState,
  AuthStoreType
}