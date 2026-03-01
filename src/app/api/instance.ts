import axios, { type AxiosInstance } from 'axios';
import { API_CONFIG } from './api.config';
import { requestInterceptor, responseErrorInterceptor, responseInterceptor } from './interceptors';

const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(requestInterceptor);

  instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

  return instance;
};

export const apiInstance = createApiInstance();
export default apiInstance;
