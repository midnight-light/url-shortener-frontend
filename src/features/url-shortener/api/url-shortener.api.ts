import { API_ENDPOINTS } from '../../../app/api/api.config';
import type { ApiResponse } from '../../../app/api/api.types';
import { apiInstance } from '../../../app/api/instance';
import type { ShortenUrlRequest, ShortenUrlResponse } from './url-shortener.schemas';

export const urlShortenerApi = {
  shortenUrl: async (data: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
    console.log('shortenUrl', data);
    const response = await apiInstance.post<ApiResponse<ShortenUrlResponse>>(API_ENDPOINTS.URLS_METADATA.PARSE, data);
    return response.data.data;
  },
};
