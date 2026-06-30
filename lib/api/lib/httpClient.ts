import { HttpError } from '@/lib/api/types/http-errors'
import { HttpRequestConfig, HttpResponse } from '@/lib/api/types/http-types'
import axios, { AxiosInstance } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/'

if (!BASE_URL) {
  console.error('[HttpClient] NEXT_PUBLIC_API_BASE_URL is not defined')
}

/**
 * HttpClient
 *
 * Wrapper centralizado sobre o Axios para comunicação HTTP.
 *
 * Responsabilidades:
 * - Configurar baseURL, timeout e headers padrões
 * - Normalizar erros de rede e resposta
 * - Expor uma API tipada para requisições HTTP
 *
 * Este client é agnóstico de domínio e pode ser reutilizado
 * por qualquer service da aplicação.
 */
export class HttpClient {
  /**
   * Instância interna do Axios
   */
  private client: AxiosInstance

  /**
   * Cria uma nova instância do HttpClient
   *
   * - Define configurações padrão do Axios
   * - Registra interceptors globais
   */
  constructor(client?: AxiosInstance) {
    this.client = client ?? axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      withCredentials: true,
    })

    this.setupInterceptors()
  }

  /**
   * Registra interceptors globais do Axios
   *
   * Atualmente:
   * - Intercepta erros de resposta
   * - Normaliza erros para o formato HttpError
   */
  private setupInterceptors() {
    this.client.interceptors.response.use(
      response => response,
      error => {
        console.error('[HttpClient] Request error', error)
        return Promise.reject(this.normalizeError(error))
      }
    )
  }

  /**
   * Normaliza qualquer erro lançado pelo Axios
   *
   * @param error Erro bruto retornado pela requisição
   * @returns HttpError normalizado
   *
   * - AxiosError → mapeia status, message e code
   * - Erros desconhecidos → retorna erro genérico
   */
  private normalizeError(error: unknown): HttpError {
    if (axios.isAxiosError(error)) {
      return {
        message:
          error.response?.data?.message ??
          error.message ??
          'HTTP Error',
        status: error.response?.status,
        code: error.code,
        raw: error,
      }
    }

    return {
      message: 'Unknown HTTP error',
      raw: error,
    }
  }

  /**
   * Executa uma requisição HTTP
   *
   * @typeParam TResponse Tipo esperado da resposta
   * @typeParam TBody Tipo do corpo da requisição
   *
   * @param config Configuração da requisição HTTP
   *
   * @returns Promise com:
   * - data: payload da resposta
   * - status: status HTTP
   * - headers: headers da resposta
   *
   * @throws HttpError Erro normalizado quando a requisição falhar
   */
  async request<TResponse = unknown, TBody = unknown>(
    config: HttpRequestConfig<TBody>
  ): Promise<HttpResponse<TResponse> | undefined> {
    try {
      const isFormData = config.body instanceof FormData;

      const response = await this.client.request<TResponse>({
        url: config.url,
        method: config.method ?? 'GET',
        data: config.body,
        responseType: config.responseType ?? 'json',
        headers: isFormData
          ? config.headers
          : { 'Content-Type': 'application/json', ...config.headers },
      })

      return {
        data: response.data,
        status: response.status,
        headers: response.headers as Record<string, string>,
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.raw.response.data.error)
    }
  }
}

/**
 * Instância singleton do HttpClient
 *
 * Deve ser utilizada por services da aplicação
 * (ex: UserService, AuthService, etc.)
 */
export const httpClient = new HttpClient()
