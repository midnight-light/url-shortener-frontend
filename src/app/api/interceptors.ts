import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { handleApiError } from './utils/api-error-handler';

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

/**
 * @description Transforms axios errors into ApiError
 */
export const responseErrorInterceptor = (error: AxiosError): Promise<never> => {
  const apiError = handleApiError(error);

  return Promise.reject(apiError);
};

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};
