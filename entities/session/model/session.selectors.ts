import { SessionStore } from "./session.types";

export const selectSession = (state: SessionStore) => state.session;

export const selectIsAuthenticated = (state: SessionStore) => state.isAuthenticated;