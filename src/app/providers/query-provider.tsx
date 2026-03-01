import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../api/query-client';
import { isDevelopment } from '../../shared/utils/feature-flag';

interface QueryProviderProps {
  children: React.ReactNode;
}

const DEV_MODE = isDevelopment();

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {DEV_MODE && <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />}
    </QueryClientProvider>
  );
};
