export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
} as const;

export const API_ENDPOINTS = {
  URLS_METADATA: {
    PARSE: '/urls-metadata/parse',
  },
} as const;
