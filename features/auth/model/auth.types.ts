import { User } from "@/entities";

interface IAuthStore {
  initSession(user: User): void;
  endSession(): void;
  finishAuthCheck(): void;
};

type AuthState = {
  user: User | null
  loading: boolean
};

type AuthStoreType = AuthState & {
  auth: IAuthStore;
};

interface IRegisterFormData {
  name: string;
  email: string;
  password: string;
  address: string;
}

type ILoginFormData = Omit<IRegisterFormData, 'name' | 'address'>

export type {
  IAuthStore,
  AuthState,
  AuthStoreType,
  IRegisterFormData,
  ILoginFormData
}