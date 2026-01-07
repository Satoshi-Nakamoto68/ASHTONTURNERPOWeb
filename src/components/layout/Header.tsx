import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  ChevronDown,
  Utensils,
  Droplets,
  MapPin,
  Camera,
  Sparkles,
  Gamepad2,
  Heart,
  ArrowRight,
  Star,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, CATEGORIES, PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const categoryIcons: Record<string, React.ReactNode> = {
  feeders: <Utensils className="h-5 w-5" />,
  fountains: <Droplets className="h-5 w-5" />,
  trackers: <MapPin className="h-5 w-5" />,
  cameras: <Camera className="h-5 w-5" />,
  litter: <Sparkles className="h-5 w-5" />,
  toys: <Gamepad2 className="h-5 w-5" />,
  health: <Heart className="h-5 w-5" />,
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search focus
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    setIsSearching(true);
    const query = searchQuery.toLowerCase().trim();
    const results = PRODUCTS.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const descMatch = product.shortDescription?.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      const featuresMatch = product.features.some((feature) =>
        feature.toLowerCase().includes(query)
      );
      return nameMatch || descMatch || categoryMatch || featuresMatch;
    });

    // Simulate slight delay for better UX
    setTimeout(() => setIsSearching(false), 150);
    return results.slice(0, 6); // Limit to 6 results
  }, [searchQuery]);

  // Handle click outside mega menu and search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Handle mega menu
      if (megaMenuRef.current && !megaMenuRef.current.contains(target)) {
        setIsShopOpen(false);
      }

      // Handle search - close when clicking outside search container
      if (isSearchOpen) {
        const isClickInsideSearch =
          searchContainerRef.current?.contains(target) ||
          searchInputRef.current?.contains(target) ||
          searchResultsRef.current?.contains(target);

        if (!isClickInsideSearch) {
          // Close search with smooth animation
          setIsSearchOpen(false);
          setSearchQuery("");
          setSelectedResultIndex(-1);
        }
      }
    };

    if (isShopOpen || isSearchOpen) {
      // Use capture phase to catch clicks early
      document.addEventListener("mousedown", handleClickOutside, true);
      // Also listen for clicks on backdrop
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isShopOpen, isSearchOpen]);

  // Handle keyboard navigation in search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen || searchResults.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedResultIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedResultIndex((prev) =>
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
      } else if (e.key === "Enter" && selectedResultIndex >= 0) {
        e.preventDefault();
        const selectedProduct = searchResults[selectedResultIndex];
        if (selectedProduct) {
          navigate(`/product/${selectedProduct.id}`);
          setIsSearchOpen(false);
          setSearchQuery("");
          setSelectedResultIndex(-1);
        }
      }
    };

    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, searchResults, selectedResultIndex, navigate]);

  // Highlight search term in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={index}
          className="bg-primary/20 text-primary font-semibold rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/98 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/50"
          : "bg-background/95 backdrop-blur-md border-b border-border"
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Enhanced Logo with animations */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group relative"
          aria-label="Home"
        >
          {/* Logo container with glow effect */}
          <div className="relative">
            {/* Glow effect on hover */}
            <div
              className={cn(
                "absolute inset-0 rounded-xl bg-primary/20 blur-xl",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-500 ease-out",
                "scale-150"
              )}
            />
            {/* Logo box */}
            <div
              className={cn(
                "relative w-10 h-10 md:w-12 md:h-12",
                "rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80",
                "flex items-center justify-center",
                "shadow-lg shadow-primary/20",
                "group-hover:scale-110 group-hover:rotate-3",
                "group-hover:shadow-xl group-hover:shadow-primary/30",
                "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              )}
            >
              {/* Animated border */}
              <div
                className={cn(
                  "absolute inset-0 rounded-xl",
                  "border-2 border-primary-foreground/20",
                  "group-hover:border-primary-foreground/40",
                  "transition-all duration-500"
                )}
              />
              <span className="text-primary-foreground font-bold text-base md:text-lg relative z-10">
                SP
              </span>
            </div>
          </div>

          {/* Logo text with animations */}
          <div className="hidden sm:block">
            <div className="relative">
              <span
                className={cn(
                  "font-bold text-lg md:text-xl text-foreground",
                  "group-hover:text-primary",
                  "transition-colors duration-300"
                )}
              >
                Smart Pet
              </span>
              {/* Underline animation */}
              <span
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5",
                  "bg-gradient-to-r from-primary via-primary to-transparent",
                  "opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100",
                  "transition-all duration-300 ease-out",
                  "origin-left"
                )}
              />
            </div>
            <span
              className={cn(
                "block text-xs text-muted-foreground -mt-0.5",
                "group-hover:text-primary/80",
                "transition-colors duration-300"
              )}
            >
              Products
            </span>
          </div>
        </Link>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link, index) =>
            link.label === "Shop" ? (
              <div
                key={link.href}
                ref={megaMenuRef}
                className="relative"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg",
                    "text-sm font-medium transition-all duration-300",
                    "group/nav",
                    location.pathname.startsWith("/shop")
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-secondary/50"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isShopOpen && "rotate-180 text-primary"
                    )}
                  />
                  {/* Active indicator */}
                  {location.pathname.startsWith("/shop") && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2",
                        "w-1 h-1 rounded-full bg-primary",
                        "animate-pulse"
                      )}
                    />
                  )}
                </Link>

                {/* Enhanced Mega Menu with animations */}
                <div
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 pt-3",
                    "transition-all duration-300 ease-out",
                    isShopOpen
                      ? "opacity-100 visible translate-y-0 pointer-events-auto"
                      : "opacity-0 invisible -translate-y-4 pointer-events-none"
                  )}
                >
                  <div
                    className={cn(
                      "relative bg-card/95 backdrop-blur-xl",
                      "rounded-2xl shadow-2xl border border-border/50",
                      "p-6 min-w-[600px]",
                      "before:absolute before:inset-0 before:rounded-2xl",
                      "before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-transparent",
                      "before:-z-10"
                    )}
                  >
                    {/* Grid with stagger animation */}
                    <div className="grid grid-cols-2 gap-3">
                      {CATEGORIES.map((category, catIndex) => (
                        <Link
                          key={category.id}
                          to={category.href}
                          onClick={() => setIsShopOpen(false)}
                          className={cn(
                            "relative flex items-start gap-3 p-4 rounded-xl",
                            "bg-gradient-to-br from-transparent to-secondary/30",
                            "border border-transparent",
                            "hover:border-primary/20 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10",
                            "hover:shadow-lg hover:shadow-primary/10",
                            "hover:-translate-y-1",
                            "transition-all duration-300 ease-out",
                            "group/category"
                          )}
                          style={{
                            animationDelay: isShopOpen
                              ? `${catIndex * 30}ms`
                              : "0ms",
                            opacity: isShopOpen ? 1 : 0,
                            transform: isShopOpen
                              ? "translateY(0)"
                              : "translateY(10px)",
                          }}
                        >
                          {/* Icon container */}
                          <div
                            className={cn(
                              "relative flex-shrink-0",
                              "w-12 h-12 rounded-xl",
                              "bg-gradient-to-br from-primary/10 to-primary/5",
                              "border border-primary/20",
                              "flex items-center justify-center",
                              "text-primary",
                              "group-hover/category:bg-gradient-to-br",
                              "group-hover/category:from-primary group-hover/category:to-primary/80",
                              "group-hover/category:text-primary-foreground",
                              "group-hover/category:scale-110 group-hover/category:rotate-3",
                              "group-hover/category:shadow-lg group-hover/category:shadow-primary/30",
                              "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            )}
                          >
                            {/* Icon glow */}
                            <div
                              className={cn(
                                "absolute inset-0 rounded-xl",
                                "bg-primary/20 blur-md",
                                "opacity-0 group-hover/category:opacity-100",
                                "transition-opacity duration-300"
                              )}
                            />
                            <div className="relative z-10">
                              {categoryIcons[category.id] || (
                                <Sparkles className="h-5 w-5" />
                              )}
                            </div>
                          </div>

                          {/* Text content */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "font-semibold text-sm mb-1",
                                "text-foreground",
                                "group-hover/category:text-primary",
                                "transition-colors duration-300"
                              )}
                            >
                              {category.name}
                            </p>
                            <p
                              className={cn(
                                "text-xs text-muted-foreground",
                                "group-hover/category:text-foreground/70",
                                "transition-colors duration-300",
                                "line-clamp-1"
                              )}
                            >
                              {category.description}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <ArrowRight
                            className={cn(
                              "h-4 w-4 text-muted-foreground/50",
                              "opacity-0 group-hover/category:opacity-100",
                              "group-hover/category:translate-x-1",
                              "transition-all duration-300",
                              "flex-shrink-0 mt-1"
                            )}
                          />
                        </Link>
                      ))}
                    </div>

                    {/* Footer link */}
                    <div className="mt-5 pt-5 border-t border-border/50">
                      <Link
                        to="/shop"
                        onClick={() => setIsShopOpen(false)}
                        className={cn(
                          "inline-flex items-center gap-2",
                          "text-sm font-semibold text-primary",
                          "hover:gap-3 transition-all duration-300",
                          "group/viewall"
                        )}
                      >
                        <span>View all products</span>
                        <ArrowRight
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            "group-hover/viewall:translate-x-1"
                          )}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative px-4 py-2.5 rounded-lg",
                  "text-sm font-medium transition-all duration-300",
                  "group/nav",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-secondary/50"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Underline animation */}
                <span
                  className={cn(
                    "absolute bottom-1.5 left-1/2 -translate-x-1/2",
                    "h-0.5 w-0 bg-primary rounded-full",
                    "group-hover/nav:w-[calc(100%-2rem)]",
                    "transition-all duration-300 ease-out"
                  )}
                />
                {/* Active indicator */}
                {location.pathname === link.href && (
                  <span
                    className={cn(
                      "absolute bottom-1.5 left-1/2 -translate-x-1/2",
                      "h-0.5 w-[calc(100%-2rem)] bg-primary rounded-full",
                      "animate-pulse"
                    )}
                  />
                )}
              </Link>
            )
          )}
        </nav>

        {/* Enhanced Actions */}
        <div className="flex items-center gap-2">
          {/* Enhanced Search with Results Dropdown */}
          <div className="relative hidden md:block">
            {isSearchOpen ? (
              <>
                {/* Backdrop Overlay with smooth fade */}
                <div
                  className={cn(
                    "fixed inset-0 bg-black/30 backdrop-blur-md z-40",
                    "transition-all duration-300 ease-out",
                    isSearchOpen
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Close search with animation
                    setIsSearchOpen(false);
                    setSearchQuery("");
                    setSelectedResultIndex(-1);
                  }}
                  aria-label="Close search"
                />

                {/* Search Container - Fixed positioning for better control */}
                <div
                  ref={searchContainerRef}
                  className={cn(
                    "fixed z-50 w-[calc(100vw-2rem)] max-w-[500px]",
                    "right-4 top-20 md:right-8 md:top-24",
                    "transition-all duration-300 ease-out",
                    isSearchOpen
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95"
                  )}
                  onClick={(e) => {
                    // Prevent closing when clicking inside search container
                    e.stopPropagation();
                  }}
                >
                  {/* Search Input Container */}
                  <div
                    className={cn(
                      "relative flex items-center gap-2",
                      "bg-background border-2 border-primary/30 rounded-xl",
                      "shadow-2xl shadow-primary/20",
                      "px-4 py-3",
                      "backdrop-blur-xl",
                      "before:absolute before:inset-0 before:rounded-xl",
                      "before:bg-gradient-to-br before:from-primary/10 before:via-primary/5 before:to-transparent",
                      "before:-z-10"
                    )}
                  >
                    {/* Search Icon with Animation */}
                    <div className="relative">
                      {isSearching ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <Search className="h-5 w-5 text-primary transition-all duration-300" />
                      )}
                      {/* Pulse Effect */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full bg-primary/20",
                          "animate-ping opacity-0",
                          isSearching && "opacity-100"
                        )}
                      />
                    </div>

                    {/* Input Field */}
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSelectedResultIndex(-1);
                      }}
                      placeholder="Search products, categories, features..."
                      className={cn(
                        "flex-1 bg-transparent border-none outline-none",
                        "text-sm placeholder:text-muted-foreground/60",
                        "focus:ring-0"
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                          setSelectedResultIndex(-1);
                        }
                      }}
                      onFocus={() => setIsSearchOpen(true)}
                    />

                    {/* Clear Button */}
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedResultIndex(-1);
                          searchInputRef.current?.focus();
                        }}
                        className={cn(
                          "text-muted-foreground hover:text-foreground",
                          "transition-all duration-200",
                          "hover:scale-110 hover:rotate-90"
                        )}
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Search Results Dropdown */}
                  {searchQuery.trim() && (
                    <div
                      ref={searchResultsRef}
                      className={cn(
                        "relative mt-3 w-full",
                        "bg-background border-2 border-primary/30 rounded-2xl",
                        "shadow-2xl shadow-primary/30",
                        "overflow-hidden",
                        "transition-all duration-300 ease-out",
                        "backdrop-blur-xl",
                        searchResults.length > 0 || isSearching
                          ? "opacity-100 translate-y-0 pointer-events-auto max-h-[600px]"
                          : "opacity-0 translate-y-2 pointer-events-none max-h-0"
                      )}
                      onClick={(e) => {
                        // Prevent closing when clicking inside results
                        e.stopPropagation();
                      }}
                    >
                      {/* Animated Background Gradient */}
                      <div
                        className={cn(
                          "absolute inset-0 -z-10 rounded-2xl",
                          "bg-gradient-to-br from-background via-background to-surface",
                          "opacity-100"
                        )}
                      />
                      {/* Glowing Border Effect */}
                      <div
                        className={cn(
                          "absolute -inset-0.5 rounded-2xl -z-10",
                          "bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20",
                          "blur-xl opacity-50",
                          "animate-pulse"
                        )}
                      />
                      {/* Shimmer Overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-2xl -z-10",
                          "bg-gradient-to-r from-transparent via-primary/5 to-transparent",
                          "opacity-0 animate-shimmer"
                        )}
                        style={{
                          backgroundSize: "200% 100%",
                          animation: "shimmer 3s ease-in-out infinite",
                        }}
                      />
                      {/* Results Header */}
                      <div
                        className={cn(
                          "relative px-4 py-3 border-b-2 border-primary/20",
                          "bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5",
                          "backdrop-blur-sm"
                        )}
                      >
                        {/* Header Glow Effect */}
                        <div
                          className={cn(
                            "absolute inset-0",
                            "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent",
                            "opacity-50"
                          )}
                        />
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="text-sm font-bold text-foreground">
                            {isSearching ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                  Searching...
                                </span>
                              </span>
                            ) : searchResults.length > 0 ? (
                              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                {searchResults.length} result
                                {searchResults.length > 1 ? "s" : ""} found
                              </span>
                            ) : (
                              "No results found"
                            )}
                          </span>
                          {searchResults.length > 0 && (
                            <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                              ↑↓ Navigate • Enter Select
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Results List */}
                      <div
                        className={cn(
                          "overflow-y-auto custom-scrollbar bg-surface/30",
                          "transition-all duration-300",
                          searchResults.length > 0 || isSearching
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        {searchResults.length > 0 ? (
                          <div className="p-3">
                            {searchResults.map((product, index) => {
                              const isSelected = selectedResultIndex === index;
                              const categoryIcon =
                                categoryIcons[product.category];

                              return (
                                <Link
                                  key={product.id}
                                  to={`/product/${product.id}`}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery("");
                                    setSelectedResultIndex(-1);
                                  }}
                                  className={cn(
                                    "relative block p-4 rounded-xl mb-2",
                                    "transition-all duration-300",
                                    "group/result",
                                    isSelected
                                      ? "bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 border-2 border-primary/50 shadow-xl shadow-primary/20 scale-[1.02]"
                                      : "bg-card/80 border-2 border-border/50 hover:bg-gradient-to-r hover:from-primary/10 hover:via-primary/5 hover:to-transparent hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                                  )}
                                  onMouseEnter={() =>
                                    setSelectedResultIndex(index)
                                  }
                                >
                                  {/* Background Glow Effect */}
                                  <div
                                    className={cn(
                                      "absolute inset-0 rounded-xl",
                                      "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
                                      "opacity-0 group-hover/result:opacity-100",
                                      "transition-opacity duration-300",
                                      "blur-sm"
                                    )}
                                  />
                                  {/* Shine Effect on Hover */}
                                  <div
                                    className={cn(
                                      "absolute inset-0 rounded-xl overflow-hidden",
                                      "opacity-0 group-hover/result:opacity-100",
                                      "transition-opacity duration-300"
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "absolute inset-0",
                                        "bg-gradient-to-r from-transparent via-white/10 to-transparent",
                                        "transform -skew-x-12",
                                        "translate-x-[-100%] group-hover/result:translate-x-[100%]",
                                        "transition-transform duration-700"
                                      )}
                                    />
                                  </div>
                                  {/* Border Glow */}
                                  <div
                                    className={cn(
                                      "absolute -inset-0.5 rounded-xl -z-10",
                                      "bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30",
                                      "opacity-0 group-hover/result:opacity-100",
                                      "blur-md transition-opacity duration-300"
                                    )}
                                  />

                                  <div className="relative z-10 flex items-start gap-4">
                                    {/* Product Image */}
                                    <div
                                      className={cn(
                                        "relative flex-shrink-0 w-16 h-16 rounded-xl",
                                        "overflow-hidden border-2 border-border/70",
                                        "group-hover/result:border-primary/70",
                                        "transition-all duration-300",
                                        "bg-secondary",
                                        "shadow-md group-hover/result:shadow-lg group-hover/result:shadow-primary/20"
                                      )}
                                    >
                                      {/* Image Glow */}
                                      <div
                                        className={cn(
                                          "absolute -inset-1 rounded-xl",
                                          "bg-gradient-to-br from-primary/30 to-primary/10",
                                          "opacity-0 group-hover/result:opacity-100",
                                          "blur-md transition-opacity duration-300",
                                          "-z-10"
                                        )}
                                      />
                                      <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover/result:scale-110 transition-transform duration-300"
                                        loading="lazy"
                                      />
                                      {/* Image Overlay */}
                                      <div
                                        className={cn(
                                          "absolute inset-0",
                                          "bg-gradient-to-t from-black/30 via-transparent to-transparent",
                                          "opacity-0 group-hover/result:opacity-100",
                                          "transition-opacity duration-300"
                                        )}
                                      />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                      {/* Product Name */}
                                      <h4
                                        className={cn(
                                          "font-semibold text-sm mb-1",
                                          "text-foreground group-hover/result:text-primary",
                                          "transition-colors duration-200",
                                          "line-clamp-1"
                                        )}
                                      >
                                        {highlightText(
                                          product.name,
                                          searchQuery
                                        )}
                                      </h4>

                                      {/* Category Badge */}
                                      <div className="flex items-center gap-2 mb-2">
                                        <div
                                          className={cn(
                                            "flex items-center gap-1.5 px-2 py-0.5 rounded-lg",
                                            "bg-primary/10 text-primary",
                                            "text-xs font-medium",
                                            "group-hover/result:bg-primary/20",
                                            "transition-colors duration-200"
                                          )}
                                        >
                                          {categoryIcon && (
                                            <span className="w-3 h-3">
                                              {categoryIcon}
                                            </span>
                                          )}
                                          <span className="capitalize">
                                            {product.category}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Price and Rating */}
                                      <div className="flex items-center gap-3">
                                        <span className="text-base font-bold text-primary">
                                          ${product.price.toFixed(2)}
                                        </span>
                                        {product.originalPrice && (
                                          <span className="text-xs text-muted-foreground line-through">
                                            ${product.originalPrice.toFixed(2)}
                                          </span>
                                        )}
                                        <div className="flex items-center gap-1">
                                          <Star className="h-3 w-3 fill-accent text-accent" />
                                          <span className="text-xs text-muted-foreground">
                                            {product.rating}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Arrow Indicator */}
                                    <ArrowRight
                                      className={cn(
                                        "h-5 w-5 text-muted-foreground/50",
                                        "opacity-0 group-hover/result:opacity-100",
                                        "group-hover/result:translate-x-1",
                                        "transition-all duration-200",
                                        "flex-shrink-0 mt-1"
                                      )}
                                    />
                                  </div>

                                  {/* Selected Indicator */}
                                  {isSelected && (
                                    <div
                                      className={cn(
                                        "absolute right-2 top-1/2 -translate-y-1/2",
                                        "w-2 h-2 rounded-full bg-primary",
                                        "animate-pulse"
                                      )}
                                    />
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        ) : !isSearching ? (
                          <div className="p-8 text-center bg-surface/20">
                            <div className="relative w-16 h-16 mx-auto mb-4">
                              {/* Glow Effect */}
                              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
                              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/50 border-2 border-primary/20 flex items-center justify-center shadow-lg">
                                <Search className="h-8 w-8 text-primary/60" />
                              </div>
                            </div>
                            <p className="text-sm font-bold text-foreground mb-1">
                              No products found
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Try different keywords or browse our categories
                            </p>
                          </div>
                        ) : null}
                      </div>

                      {/* View All Results Link */}
                      {searchResults.length > 0 && (
                        <div
                          className={cn(
                            "relative px-4 py-3 border-t-2 border-primary/20",
                            "bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5",
                            "backdrop-blur-sm"
                          )}
                        >
                          {/* Footer Glow Effect */}
                          <div
                            className={cn(
                              "absolute inset-0",
                              "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent",
                              "opacity-50"
                            )}
                          />
                          <Link
                            to={`/shop?search=${encodeURIComponent(
                              searchQuery
                            )}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                              setSelectedResultIndex(-1);
                            }}
                            className={cn(
                              "relative z-10 flex items-center justify-center gap-2",
                              "text-sm font-bold",
                              "bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
                              "hover:gap-3 transition-all duration-300",
                              "group/viewall"
                            )}
                          >
                            <span>View all results for "{searchQuery}"</span>
                            <ArrowRight
                              className={cn(
                                "h-4 w-4 text-primary transition-transform duration-300",
                                "group-hover/viewall:translate-x-1"
                              )}
                            />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsSearchOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className={cn(
                  "relative group/search",
                  "hover:bg-secondary/50",
                  "transition-all duration-300"
                )}
                aria-label="Search"
              >
                <Search
                  className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    "group-hover/search:scale-110 group-hover/search:rotate-12"
                  )}
                />
                {/* Pulse Effect on Hover */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full bg-primary/20",
                    "opacity-0 group-hover/search:opacity-100",
                    "animate-ping scale-150"
                  )}
                />
              </Button>
            )}
          </div>

          {/* Enhanced Cart with animations */}
          {/* <Link to="/cart" className="relative group/cart">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative",
                "hover:bg-secondary/50",
                "transition-all duration-300"
              )}
              aria-label="Shopping cart"
            >
              <ShoppingCart
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  "group-hover/cart:scale-110 group-hover/cart:-rotate-12"
                )}
              />
              {cartCount > 0 && (
                <>
                  <span
                    className={cn(
                      "absolute -top-1 -right-1",
                      "w-5 h-5 rounded-full",
                      "bg-gradient-to-br from-accent to-accent/80",
                      "text-accent-foreground text-xs font-bold",
                      "flex items-center justify-center",
                      "shadow-lg shadow-accent/30",
                      "border-2 border-background",
                      "opacity-100 scale-100",
                      "duration-300"
                    )}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                </span>
                  <span
                    className={cn(
                      "absolute -top-1 -right-1",
                      "w-5 h-5 rounded-full",
                      "bg-accent/30",
                      "animate-ping"
                    )}
                  />
                </>
              )}
            </Button>
          </Link> */}

          {/* Enhanced Shop Now Button */}
          <Button
            asChild
            className={cn(
              "hidden sm:flex",
              "bg-gradient-to-r from-primary via-primary to-primary/90",
              "hover:from-primary/90 hover:via-primary hover:to-primary",
              "shadow-lg shadow-primary/20",
              "hover:shadow-xl hover:shadow-primary/30",
              "hover:-translate-y-0.5",
              "transition-all duration-300"
            )}
            size="sm"
          >
            <Link to="/shop" className="group/shop">
              <span>Shop Now</span>
              <ArrowRight
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  "group-hover/shop:translate-x-1"
                )}
              />
            </Link>
          </Button>

          {/* Enhanced Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "lg:hidden relative",
              "hover:bg-secondary/50",
              "transition-all duration-300"
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <Menu
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-300",
                  isMenuOpen && "opacity-0 rotate-90 scale-0"
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-300",
                  !isMenuOpen && "opacity-0 -rotate-90 scale-0",
                  isMenuOpen && "opacity-100 rotate-0 scale-100"
                )}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Enhanced Mobile Menu with slide animations */}
      <div
        className={cn(
          "lg:hidden overflow-hidden",
          "border-t border-border/50",
          "bg-background/98 backdrop-blur-xl",
          "transition-all duration-500 ease-out",
          isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "relative px-4 py-3.5 rounded-xl font-medium",
                "transition-all duration-300 ease-out",
                "group/mobile",
                location.pathname === link.href
                  ? "text-primary bg-primary/10 border border-primary/20"
                  : "text-foreground hover:bg-secondary/50 border border-transparent",
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              )}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              <span className="relative z-10 flex items-center justify-between">
                <span>{link.label}</span>
                {link.label === "Shop" && (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </span>
              {/* Active indicator */}
              {location.pathname === link.href && (
                <span
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2",
                    "w-1 h-6 rounded-r-full bg-primary",
                    "animate-pulse"
                  )}
                />
              )}
              {/* Hover background */}
              <span
                className={cn(
                  "absolute inset-0 rounded-xl",
                  "bg-gradient-to-r from-primary/5 to-transparent",
                  "opacity-0 group-hover/mobile:opacity-100",
                  "transition-opacity duration-300"
                )}
              />
            </Link>
          ))}

          {/* Shop Categories in Mobile */}
          {isMenuOpen && location.pathname.startsWith("/shop") && (
            <div
              className={cn(
                "px-4 py-2 space-y-1.5",
                "opacity-100 translate-x-0",
                "duration-300"
              )}
              style={{ transitionDelay: `${NAV_LINKS.length * 50}ms` }}
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Categories
              </p>
              {CATEGORIES.slice(0, 4).map((category, catIndex) => (
                <Link
                  key={category.id}
                  to={category.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg",
                    "text-sm text-muted-foreground",
                    "hover:text-foreground hover:bg-secondary/50",
                    "transition-all duration-300",
                    "group/mobilecat"
                  )}
                  style={{
                    transitionDelay: `${(NAV_LINKS.length + catIndex) * 50}ms`,
                  }}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg",
                      "bg-primary/10 flex items-center justify-center",
                      "text-primary",
                      "group-hover/mobilecat:bg-primary group-hover/mobilecat:text-primary-foreground",
                      "transition-all duration-300"
                    )}
                  >
                    {categoryIcons[category.id] || (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </div>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div
            className={cn(
              "pt-3 mt-2 border-t border-border/50",
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isMenuOpen
                ? `${(NAV_LINKS.length + 4) * 50}ms`
                : "0ms",
            }}
          >
            <Button
              asChild
              className={cn(
                "w-full",
                "bg-gradient-to-r from-primary via-primary to-primary/90",
                "hover:from-primary/90 hover:via-primary hover:to-primary",
                "shadow-lg shadow-primary/20",
                "hover:shadow-xl hover:shadow-primary/30",
                "transition-all duration-300"
              )}
            >
              <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
                <span>Shop Smart Pet Tech</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </nav>
      </div>

      {/* Custom Animations for Search */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </header>
  );
}
