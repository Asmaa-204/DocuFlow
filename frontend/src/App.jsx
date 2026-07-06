import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "@context/DarkModeContext";

import AppRoutes from "@components/AppRoutes";
import GlobalStyles from "@styles/GlobalStyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <AppRoutes />
        <Toaster
          toastOptions={{
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-color)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
