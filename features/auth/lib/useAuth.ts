import { selectUser, useSessionStore } from "@/entities";


export function useAuth() {

  // login

  // logout

  const user = useSessionStore(
    selectUser
  );

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
  };
}