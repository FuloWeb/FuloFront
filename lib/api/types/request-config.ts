import { HttpMethod } from "./http-types"

export interface RequestConfig<TBody = unknown> {
  method?: HttpMethod
  endpoint: string
  params?: Record<string, string | number>
  query?: Record<string, string | number>
  body?: TBody
  headers?: Record<string, string>
  /**
   * Tipo de resposta esperado pelo Axios.
   * Use 'blob' para downloads de arquivos (ex: relatórios em PDF).
   * @default 'json'
   */
  responseType?: "json" | "blob"
}
