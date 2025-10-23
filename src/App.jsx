import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

/**
 * Main App component
 * Sets up all providers and initializes the app
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />

          {/* Toast notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#ffffff",
                color: "#0a0a0a",
                border: "1px solid #e5e5e5",
                borderRadius: "0.625rem",
                padding: "16px",
                fontSize: "14px",
                fontWeight: "500",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
              success: {
                style: {
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #86efac",
                },
                iconTheme: {
                  primary: "#16a34a",
                  secondary: "#ffffff",
                },
              },
              error: {
                style: {
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fca5a5",
                },
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
