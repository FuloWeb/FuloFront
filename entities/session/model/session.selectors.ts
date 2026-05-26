import { SessionStore } from "./session.types";

export const selectUser = (state: SessionStore) => state.user;