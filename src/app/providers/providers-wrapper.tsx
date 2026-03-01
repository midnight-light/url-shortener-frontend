import { QueryProvider } from './query-provider';

export const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};
