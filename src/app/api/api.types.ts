export interface ApiResponse<T = unknown> {
  ok: boolean;
  data: T;
  error?: ApiErrorResponse;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface RequestConfig {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
