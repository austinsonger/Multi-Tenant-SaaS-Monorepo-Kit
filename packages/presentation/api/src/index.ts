// @monorepo/api
export const packageName = "@monorepo/api";

// API client interfaces and functions
export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Example API client configuration
export const createApiConfig = (baseUrl: string): ApiConfig => ({
  baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const version = '0.1.0';
