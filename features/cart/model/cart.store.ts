import { create } from "zustand";
import { CartServer } from "./cart.types";

type CartState = {
  cart: CartServer | null;
  loading: boolean;
  error: string | null;
};

type CartActions = {
  setCart: (cart: CartServer | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const cartStore = create<CartState & CartActions>()((set) => ({
  cart: null,
  loading: false,
  error: null,

  setCart: (cart) => set({ cart }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
