"use client";

import { QueryClient, QueryClientProvider as ReactQueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}
