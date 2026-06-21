import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, CategoryState } from "./category.type";

type CategoryActions = {
  setCategories: (c: Category[]) => void;
  addCategory: (c: Category) => void;
  updateCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  selectCategory: (c: Category | null) => void;
  setLoading: (v: boolean) => void;
};

export const categoryStore = create<CategoryState & CategoryActions>()(
  persist(
    (set) => ({
      categories: [],
      selected: null,
      loading: false,

      setCategories: (categories) => set({ categories }),

      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),

      updateCategory: (category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === category.id ? category : c
          ),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      selectCategory: (category) =>
        set({ selected: category }),

      setLoading: (loading) =>
        set({ loading }),
    }),
    {
      name: "category-storage",
    }
  )
);