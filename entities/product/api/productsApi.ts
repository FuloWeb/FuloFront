import { createEndpointHook } from "@/lib/api/lib/endpoints";
import { endpointsMap } from "@/lib/api/lib/endpointsMap";
import { Product } from "../model";

export const useGetProducts = createEndpointHook<Product[]>(endpointsMap.products.getProducts);
export const useGetProduct = createEndpointHook<Product>(endpointsMap.products.getProduct);
export const useCreateProduct = createEndpointHook<FormData, Product>(endpointsMap.products.createProduct);
export const useUpdateProduct = createEndpointHook<Partial<Product>, Product>(endpointsMap.products.updateProduct);
export const useDeleteProduct = createEndpointHook<void, { success: boolean }>(endpointsMap.products.deleteProduct);