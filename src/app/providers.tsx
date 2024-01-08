"use client";

import { makeServer } from "@/data/mockserver";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

makeServer(); // start mockserver

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } })
  );

  // const localStoragePersister = createSyncStoragePersister({
  //   storage: window.localStorage,
  // });

  // persistQueryClient({
  //   queryClient,
  //   persister: localStoragePersister,
  // });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
