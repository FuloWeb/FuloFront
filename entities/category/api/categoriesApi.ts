import { createEndpointHook } from "@/lib/api/lib/endpoints";
import { endpointsMap } from "@/lib/api/lib/endpointsMap";
import { Category } from "../model";

/**
 * Hook para buscar todas as categorias.
 *
 * @returns Objeto contendo:
 * - `data`: lista de categorias (`Category[]`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { data: categories, loading, error, fetchData } = useGetCategories()
 * useEffect(() => { fetchData() }, [])
 * ```
 */
export const useGetCategories = createEndpointHook<Category[]>(
  endpointsMap.category.getCategories
);

/**
 * Hook para buscar uma categoria por ID.
 *
 * @param params Parâmetros da rota: `{ id: string }`
 *
 * @returns Objeto contendo:
 * - `data`: categoria (`Category`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { data: category, fetchData } = useGetCategory()
 * useEffect(() => { fetchData({ id: '123' }) }, [])
 * ```
 */
export const useGetCategory = createEndpointHook<string, Category>(
  endpointsMap.category.getCategory
);

/**
 * Hook para criar uma nova categoria.
 *
 * @param body Corpo da requisição: `{ name: string }`
 *
 * @returns Objeto contendo:
 * - `data`: categoria criada (`Category`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { fetchData } = useCreateCategory()
 * fetchData(undefined, undefined, { name: 'Eletrônicos' })
 * ```
 */
export const useCreateCategory = createEndpointHook<Category>(
  endpointsMap.category.createCategory
);

/**
 * Hook para atualizar uma categoria existente.
 *
 * @param params Parâmetros da rota: `{ id: string }`
 * @param body Corpo da requisição: `{ name?: string }`
 *
 * @returns Objeto contendo:
 * - `data`: categoria atualizada (`Category`)
 * - `loading`: booleano indicando se está carregando
 * - `error`: erro retornado pela requisição, se houver
 * - `fetchData`: função para disparar a requisição
 *
 * @example
 * ```ts
 * const { fetchData } = useUpdateCategory()
 * fetchData({ id: '123' }, undefined, { name: 'Nova categoria' })
 * ```
 */
export const useUpdateCategory = createEndpointHook<Partial<Category>, Category>(
  endpointsMap.category.updateCategory
);

/**
 * Hook para deletar uma categoria por ID.
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
 * const { fetchData } = useDeleteCategory()
 * fetchData({ id: '123' })
 * ```
 */
export const useDeleteCategory = createEndpointHook<string, { success: boolean }>(
  endpointsMap.category.deleteCategory
);