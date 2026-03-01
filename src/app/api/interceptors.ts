import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { handleApiError } from './utils/api-error-handler';

const isDevelopment = import.meta.env.DEV;

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  console.log('requestInterceptor', config);

  return config;
};

/**
 * @description Transforms axios errors into ApiError
 */
export const responseErrorInterceptor = (error: AxiosError): Promise<never> => {
  const apiError = handleApiError(error);

  if (isDevelopment) {
    console.error('[API Error]:', {
      status: apiError.statusCode,
      message: apiError.message,
      errors: apiError.errors,
    });
  }

  return Promise.reject(apiError);
};

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  if (isDevelopment) {
    console.log(`[API Success] ${response.config.method?.toUpperCase()} ${response.config.url}`);
  }
  return response;
};
