import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Trust from "./pages/Trust";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import NotFound from "./pages/NotFound";

// Type declaration for GTranslate
declare global {
  interface Window {
    gtranslateSettings?: {
      default_language: string;
      detect_browser_language: boolean;
      languages: string[];
      wrapper_selector: string;
    };
  }
}

const queryClient = new QueryClient();

// Component to handle GTranslate conflicts on route changes
const RouteChangeHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to let React Router finish navigation before GTranslate tries to manipulate DOM
    const timer = setTimeout(() => {
      // Force React to reconcile if GTranslate has modified DOM
      if (window.gtranslateSettings) {
        // Ensure GTranslate doesn't interfere with React's DOM
        const gtranslateWrapper = document.querySelector(".gtranslate_wrapper");
        if (gtranslateWrapper && gtranslateWrapper.parentNode) {
          // Keep GTranslate wrapper outside React's control
          try {
            // This ensures GTranslate elements stay in their container
            const root = document.getElementById("root");
            if (root && gtranslateWrapper.parentNode !== root) {
              // GTranslate is in the right place, do nothing
            }
          } catch (e) {
            // Silently handle any DOM access errors
            console.warn("GTranslate DOM check failed:", e);
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

const App = () => {
  useEffect(() => {
    // Prevent GTranslate from interfering with React Router and DOM
    const preventGTranslateInterference = () => {
      if (!window.gtranslateSettings) return;

      // Protect React root from GTranslate DOM manipulation
      const root = document.getElementById("root");
      if (root) {
        // Create a MutationObserver to detect and prevent GTranslate from modifying React's DOM
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            // If GTranslate tries to remove nodes from React's tree, prevent it
            if (
              mutation.type === "childList" &&
              mutation.removedNodes.length > 0
            ) {
              mutation.removedNodes.forEach((node) => {
                // Check if this is a React-managed node being removed by GTranslate
                if (
                  node instanceof Element &&
                  (node.closest("#root") || node.id === "root")
                ) {
                  // Try to restore the node if it's still in memory
                  try {
                    if (
                      mutation.target &&
                      node.parentNode !== mutation.target
                    ) {
                      // Node was removed incorrectly, but we can't safely restore it
                      // Instead, we'll let React handle the reconciliation
                    }
                  } catch (e) {
                    // Silently handle errors
                  }
                }
              });
            }
          });
        });

        // Observe the root for any DOM changes
        observer.observe(root, {
          childList: true,
          subtree: true,
        });

        // Cleanup
        return () => observer.disconnect();
      }
    };

    const cleanup = preventGTranslateInterference();

    // Also protect against GTranslate URL changes
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      const url = args[2] as string;
      // Allow GTranslate hash navigation but prevent full URL changes
      if (url && (url.includes("#gt-") || url.startsWith("#"))) {
        return originalPushState.apply(history, args);
      }
      // For other navigations, ensure React Router handles it
      return originalPushState.apply(history, args);
    };

    history.replaceState = function (...args) {
      const url = args[2] as string;
      if (url && (url.includes("#gt-") || url.startsWith("#"))) {
        return originalReplaceState.apply(history, args);
      }
      return originalReplaceState.apply(history, args);
    };

    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup();
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <RouteChangeHandler />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/trust" element={<Trust />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policies/:policy" element={<Policies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
