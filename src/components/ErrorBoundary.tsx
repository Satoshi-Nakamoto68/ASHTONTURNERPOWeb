import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });

    // Check if error is related to GTranslate DOM manipulation or React Router context
    const isGTranslateError =
      error.message.includes("removeChild") ||
      error.message.includes("Failed to execute") ||
      error.message.includes("Cannot destructure property") ||
      error.message.includes("useContext") ||
      error.name === "NotFoundError" ||
      error.name === "TypeError";

    if (isGTranslateError) {
      // This is likely a GTranslate conflict - reload the page to restore React Router context
      console.warn("GTranslate conflict detected, reloading page...");
      setTimeout(() => {
        // Try to reload the page to restore React Router context
        window.location.reload();
      }, 500);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // If we have a custom fallback, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Check if it's a GTranslate-related error
      const isGTranslateError =
        this.state.error?.message.includes("removeChild") ||
        this.state.error?.message.includes("Failed to execute") ||
        this.state.error?.message.includes("Cannot destructure property") ||
        this.state.error?.message.includes("useContext") ||
        this.state.error?.name === "NotFoundError" ||
        this.state.error?.name === "TypeError";

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-2xl w-full bg-card rounded-2xl border border-border shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
                <AlertCircle className="relative h-16 w-16 text-destructive" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-foreground">
              {isGTranslateError
                ? "Translation Widget Conflict"
                : "Something went wrong"}
            </h1>

            <p className="text-muted-foreground mb-6">
              {isGTranslateError
                ? "There was a conflict with the translation widget. The page should reload automatically, or you can try refreshing manually."
                : "An unexpected error occurred. Please try refreshing the page."}
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left bg-surface rounded-lg p-4 border border-border/50">
                <summary className="cursor-pointer text-sm font-semibold text-foreground mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-muted-foreground overflow-auto max-h-48 mt-2">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
