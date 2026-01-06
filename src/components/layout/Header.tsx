import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";
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
  const location = useLocation();
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const searchInputRef = useRef<HTMLInputElement>(null);
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

  // Handle click outside mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node)
      ) {
        setIsShopOpen(false);
      }
    };
    if (isShopOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isShopOpen]);

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
          {/* Search with expand animation */}
          <div className="relative hidden md:block">
            {isSearchOpen ? (
              <div
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 z-50",
                  "flex items-center gap-2",
                  "bg-card/95 backdrop-blur-xl border border-border rounded-lg",
                  "shadow-xl shadow-black/10",
                  "px-3 py-2",
                  "opacity-100 translate-x-0",
                  "transition-all duration-200 ease-out"
                )}
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-48 bg-transparent border-none outline-none text-sm"
                  onBlur={() => {
                    if (!searchQuery) setIsSearchOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
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
    </header>
  );
}
