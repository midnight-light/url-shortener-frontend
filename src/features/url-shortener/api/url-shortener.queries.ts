import { useMutation } from '@tanstack/react-query';
import type { ShortenUrlRequest } from './url-shortener.schemas';
import { urlShortenerApi } from './url-shortener.api';

export const useShortenUrl = () => {
  return useMutation({
    mutationFn: (data: ShortenUrlRequest) => urlShortenerApi.shortenUrl(data),
  });
};
