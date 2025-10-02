// AppProviders.tsx
import { Provider } from "react-redux";
import { store } from "@app/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function QueryDevTools() {
  return process.env.NODE_ENV === "development" ? (
    <ReactQueryDevtools initialIsOpen={false} />
  ) : null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <QueryDevTools />
      </QueryClientProvider>
    </Provider>
  );
}
