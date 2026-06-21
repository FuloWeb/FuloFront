"use client";

import { Category, categoryStore } from "../model";

import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useGetCategory,
} from "../api";

export function useCategory() {
  const store = categoryStore();

  const getCategoriesApi = useGetCategories();
  const getCategoryApi = useGetCategory();
  const createCategoryApi = useCreateCategory();
  const updateCategoryApi = useUpdateCategory();
  const deleteCategoryApi = useDeleteCategory();

  const fetchCategories = async () => {
    store.setLoading(true);

    try {
      const res = await getCategoriesApi.fetchData();
      store.setCategories(res.data);
    } finally {
      store.setLoading(false);
    }
  };

  const fetchCategoryById = async (id: string) => {
    const res = await getCategoryApi.fetchData(undefined, { id });
    store.selectCategory(res.data);
    return res.data;
  };

  const addCategory = async (data: { name: string }) => {
    const res = await createCategoryApi.fetchData(data as Category);
    
    store.addCategory(res.data);
    return res.data;
  };

  const updateCategory = async ({ id, ...rest }: Category) => {
    const res = await updateCategoryApi.fetchData(
      rest, 
      { id },      
    );
    store.updateCategory(res.data);
    return res.data;
  };

  const deleteCategory = async (id: string) => {
    await deleteCategoryApi.fetchData(undefined, { id });
    store.deleteCategory(id);
  };

  return {
    ...store,
    fetchCategories,
    fetchCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}