import { HttpMethods } from "../types/http-types"

/**
 * Mapa de endpoints da API.
 *
 * Organiza os endpoints por recurso e operação.
 * Cada endpoint contém:
 * - `path`: caminho da rota, podendo ter parâmetros (`/users/:id`)
 * - `method`: método HTTP (`GET`, `POST`, `PUT`, `DELETE`)
 *
 * Exemplo de uso:
 * ```ts
 * import { endpointsMap } from './endpointsMap'
 * const userEndpoint = endpointsMap.users.getUser
 * console.log(userEndpoint.path)   // '/users/:id'
 * console.log(userEndpoint.method) // 'GET'
 * ```
 */
export const endpointsMap = {
  auth: {
    postRegister: {
      path: '/auth/register',
      method: HttpMethods.POST
    },
    postLogin: {
      path: '/auth/login',
      method: HttpMethods.POST
    },
    postLogout: {
      path: '/auth/logout',
      method: HttpMethods.POST
    },
  },
  users: {
    getUsers: {
      path: '/users',
      method: HttpMethods.GET,
    },
    getUser: {
      path: '/users/:id',
      method: HttpMethods.GET,
    },
    createUser: {
      path: '/users',
      method: HttpMethods.POST,
    },
    updateUser: {
      path: '/users/:id',
      method: HttpMethods.PUT,
    },
    deleteUser: {
      path: '/users/:id',
      method: HttpMethods.DELETE,
    },
  },
  category: {
    getCategories: {
      path: '/category',
      method: HttpMethods.GET,
    },
    getCategory: {
      path: '/category/:id',
      method: HttpMethods.GET,
    },
    createCategory: {
      path: '/category',
      method: HttpMethods.POST,
    },
    updateCategory: {
      path: '/category/:id',
      method: HttpMethods.PUT,
    },
    deleteCategory: {
      path: '/category/:id',
      method: HttpMethods.DELETE,
    },
  },
  products: {
    getProducts: {
      path: '/products',
      method: HttpMethods.GET,
    },
    getProduct: {
      path: '/products/:id',
      method: HttpMethods.GET,
    },
    createProduct: {
      path: '/products',
      method: HttpMethods.POST,
    },
    updateProduct: {
      path: '/products/:id',
      method: HttpMethods.PUT,
    },
    deleteProduct: {
      path: '/products/:id',
      method: HttpMethods.DELETE,
    },
  },
} as const

/**
 * Tipo derivado do `endpointsMap`.
 *
 * Permite acessar os endpoints de forma tipada, útil para criar hooks
 * ou funções que consumam a API sem perder a tipagem dos paths e métodos.
 *
 * Exemplo:
 * ```ts
 * type UsersEndpoints = EndpointsMap['users']
 * const getUsersPath: string = endpointsMap.users.getUsers.path
 * ```
 */
export type EndpointsMap = typeof endpointsMap
