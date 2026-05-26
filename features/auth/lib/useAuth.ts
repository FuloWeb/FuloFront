import { User } from "@/entities";
import { authStore } from "../model";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const user = authStore((state) => state.user);
  const loading = authStore((state) => state.loading);
  const auth = authStore((state) => state.auth);

  const login = async () => {
    try {
      // VEM DA API
      const userData: User = {
        id: "1",
        admin: true,
        email: "aaaa",
        address: "aaaa",
        name: "aaaaaaaa",
        login: "aaaaa",
      };
      
      auth.initSession(userData);

      if(userData) {
        router.replace("/");
        return
      }
    } catch {
      auth.finishAuthCheck();
    }
  };

  const logout = () => {
    auth.endSession();
  };

  const isAdmin = user?.admin

  return {
    user,
    loading,
    isAdmin,
    isAuthenticated: !!user,
    login,
    logout,
  };
}