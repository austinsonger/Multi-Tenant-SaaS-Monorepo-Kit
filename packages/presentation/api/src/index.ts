// Export API utilities and types
export * from './apiClient';

// Package version
export const packageName = "@monorepo/api";

// API configuration types
export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

// API response interface
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Helper function to create API config
export const createApiConfig = (baseUrl: string): ApiConfig => ({
  baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const version = '0.1.0';