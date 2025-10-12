import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { initializeNotifications } from "./lib/notifications";
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
  // Initialize push notifications
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await initializeNotifications();
      } catch (error) {
        console.error("Failed to initialize notifications:", error);
      }
    };

    setupNotifications();
  }, []);

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
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                padding: "16px",
                fontSize: "14px",
                fontWeight: "500",
              },
              success: {
                iconTheme: {
                  primary: "hsl(var(--primary))",
                  secondary: "hsl(var(--primary-foreground))",
                },
              },
              error: {
                iconTheme: {
                  primary: "hsl(var(--destructive))",
                  secondary: "hsl(var(--destructive-foreground))",
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
