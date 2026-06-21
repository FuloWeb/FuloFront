import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./products.type";

type ProductState = {
  products: Product[];
  selected: Product | null;
  loading: boolean;
};

type ProductActions = {
  setProducts: (p: Product[]) => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;
  selectProduct: (p: Product | null) => void;
  setLoading: (v: boolean) => void;
};

export const productStore = create<ProductState & ProductActions>()(
  persist(
    (set) => ({
      products: [],
      selected: null,
      loading: false,

      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === product.id ? product : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
      selectProduct: (product) => set({ selected: product }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: "product-storage" }
  )
);