import { createEndpointHook } from "@/lib/api/lib/endpoints";
import { endpointsMap } from "@/lib/api/lib/endpointsMap";
import { Product } from "../model";

/**
 * Hook para buscar todos os produtos.
 *
 * @returns Objeto contendo:
 * - `data`: lista de produtos (`Product[]`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { data: products, loading, error, fetchData } = useGetProducts()
 * useEffect(() => { fetchData() }, [])
 * ```
 */
export const useGetProducts = createEndpointHook<Product[]>(endpointsMap.products.getProducts)

/**
 * Hook para buscar um produto por ID.
 *
 * @param params Parâmetros da rota: `{ id: string }`
 *
 * @returns Objeto contendo:
 * - `data`: produto (`Product`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { data: user, fetchData } = useGetProduct()
 * useEffect(() => { fetchData({ id: '123' }) }, [])
 * ```
 */
export const useGetProduct = createEndpointHook<Product>(endpointsMap.products.getProduct)

/**
 * Hook para criar um novo produto.
 *
 * @param body Corpo da requisição: `{ name: string, email: string }`
 *
 * @returns Objeto contendo:
 * - `data`: produto criado (`Product`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { fetchData } = useCreateProduct()
 * fetchData(undefined, undefined, { name: 'Gustavo', email: 'gusto@test.com' })
 * ```
 */
export const useCreateProduct = createEndpointHook<Product>(endpointsMap.products.createProduct)

/**
 * Hook para atualizar um produto existente.
 *
 * @param params Parâmetros da rota: `{ id: string }`
 * @param body Corpo da requisição com os campos a atualizar
 *
 * @returns Objeto contendo:
 * - `data`: produto atualizado (`Product`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { fetchData } = useUpdateProduct()
 * fetchData({ id: '123' }, undefined, { name: 'Novo Nome' })
 * ```
 */
export const useUpdateProduct = createEndpointHook<Product>(endpointsMap.products.updateProduct)

/**
 * Hook para deletar um produto por ID.
 *
 * @param params Parâmetros da rota: `{ id: string }`
 *
 * @returns Objeto contendo:
 * - `data`: resultado da exclusão `{ success: boolean }`
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { fetchData } = useDeleteProduct()
 * fetchData({ id: '123' })
 * ```
 */
export const useDeleteProduct = createEndpointHook<{ success: boolean }>(endpointsMap.products.deleteProduct)
