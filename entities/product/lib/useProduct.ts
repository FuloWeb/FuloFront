"use client";

import { productStore, Product, ProductFormData } from "../model";
import {
  useGetProducts,
  useGetProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../api";

export function useProduct() {
  const store = productStore();

  const getProductsApi = useGetProducts();
  const getProductApi = useGetProduct();
  const createProductApi = useCreateProduct();
  const updateProductApi = useUpdateProduct();
  const deleteProductApi = useDeleteProduct();

  const fetchProducts = async () => {
    store.setLoading(true);
    try {
      const res = await getProductsApi.fetchData();
      store.setProducts(res.data);
    } finally {
      store.setLoading(false);
    }
  };

  const fetchProductById = async (id: number) => {
    const res = await getProductApi.fetchData(undefined, { id });
    store.selectProduct(res.data);
    return res.data;
  };

  const addProduct = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("quantity", String(data.quantity));
    formData.append("color", data.color);
    formData.append("categoryId", String(data.categoryId));
    if (data.description) formData.append("description", data.description);
    if (data.file) formData.append("file", data.file);


  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

    const res = await createProductApi.fetchData(formData);
    store.addProduct(res.data);
    return res.data;
  };

  const updateProduct = async ({ id, ...rest }: Product) => {
    const res = await updateProductApi.fetchData(rest, { id });
    store.updateProduct(res.data);
    return res.data;
  };

  const deleteProduct = async (id: number) => {
    await deleteProductApi.fetchData(undefined, { id });
    store.deleteProduct(id);
  };

  return {
    ...store,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}