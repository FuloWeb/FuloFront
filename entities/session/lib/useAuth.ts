import { selectIsAuthenticated, selectSession, useSessionStore } from "../model";

export function useAuth() {
  const session = useSessionStore(
    selectSession
  );

  const isAuthenticated = useSessionStore(
    selectIsAuthenticated
  );

  const login = useSessionStore(
    (state) => state.login
  );

  const logout = useSessionStore(
    (state) => state.logout
  );

  const user = session?.user;

  return {
    user,
    session,
    isAuthenticated,
    login,
    logout,
  };
}
