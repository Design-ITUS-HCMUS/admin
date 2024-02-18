'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClientConfig } from '@/libs/queryClient';

const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient(queryClientConfig);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
