import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState } from "./cart.types";

type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, color: string) => void;
  updateItemQuantity: (productId: number, color: string, quantity: number) => void;
  clear: () => void;
};

export const cartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.color === item.color
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (productId, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.color === color)
          ),
        })),

      updateItemQuantity: (productId, color, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.color === color
              ? { ...i, quantity }
              : i
          ),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);
