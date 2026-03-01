/**
 * @description React Query Client Configuration
 * Centralized configuration for all queries and mutations
 */

import { QueryClient, type DefaultOptions } from '@tanstack/react-query';
import { handleApiError } from './utils/api-error-handler';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,

    retry: (failureCount, error) => {
      // dont retry on 4xx errors
      if (error instanceof Error && 'statusCode' in error) {
        const statusCode = (error as { statusCode: number }).statusCode;
        if (statusCode >= 400 && statusCode < 500) {
          return false;
        }
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // stale time - data is considered fresh for 1 minute
    staleTime: 1 * 60 * 1000,
    gcTime: 2 * 60 * 1000,

    // error handling
    throwOnError: false,
  },

  mutations: {
    retry: false,

    // global error handling
    onError: (error) => {
      const apiError = handleApiError(error);
      console.error('[Mutation Error]:', apiError);
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

/**
 * @description Query Keys Factory
 * Centralized query keys management
 */
export const queryKeys = {
  all: ['api'] as const,

  auth: {
    all: () => [...queryKeys.all, 'auth'] as const,
    me: () => [...queryKeys.auth.all(), 'me'] as const,
  },

  urls: {
    all: () => [...queryKeys.all, 'urls'] as const,
    lists: () => [...queryKeys.urls.all(), 'list'] as const,
    list: (filters?: unknown) => [...queryKeys.urls.lists(), filters] as const,
    details: () => [...queryKeys.urls.all(), 'detail'] as const,
    detail: (code: string) => [...queryKeys.urls.details(), code] as const,
    stats: (code: string) => [...queryKeys.urls.detail(code), 'stats'] as const,
  },
} as const;
