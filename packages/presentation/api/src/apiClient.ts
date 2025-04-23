import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiConfig, ApiResponse } from './index';

export class ApiClient {
  private client: AxiosInstance;
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers || {},
    });

    // Add response interceptor for consistent response format
    this.client.interceptors.response.use(
      (response) => this.handleSuccess(response),
      (error) => this.handleError(error)
    );
  }

  private handleSuccess(response: AxiosResponse): ApiResponse<any> {
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  }

  private handleError(error: any): Promise<never> {
    const response: ApiResponse<null> = {
      data: null,
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'Unknown error',
    };
    
    return Promise.reject(response);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.get<T, ApiResponse<T>>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.post<T, ApiResponse<T>>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.put<T, ApiResponse<T>>(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.patch<T, ApiResponse<T>>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.delete<T, ApiResponse<T>>(url, config);
  }
}

export function createApiClient(config: ApiConfig): ApiClient {
  return new ApiClient(config);
}