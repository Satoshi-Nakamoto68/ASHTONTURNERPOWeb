import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Utensils,
  Droplets,
  MapPin,
  Camera,
  Sparkles,
  Gamepad2,
  Heart,
  Mail,
  Phone,
  CheckCircle,
  Zap,
  Shield,
  Star,
  Headphones,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PRODUCTS, CATEGORIES, BUSINESS_INFO } from "@/lib/constants";
import { getProductImage } from "@/lib/productImages";
import { cn } from "@/lib/utils";

// Using Unsplash image for modern pet technology theme
const HERO_IMAGE_URL = "https://gemini.google.com/share/e6402757c13a";

const categoryIcons: Record<string, React.ReactNode> = {
  feeders: <Utensils className="h-6 w-6" />,
  fountains: <Droplets className="h-6 w-6" />,
  trackers: <MapPin className="h-6 w-6" />,
  cameras: <Camera className="h-6 w-6" />,
  litter: <Sparkles className="h-6 w-6" />,
  toys: <Gamepad2 className="h-6 w-6" />,
  health: <Heart className="h-6 w-6" />,
};

// Hero Section Component with Advanced Animations
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Parallax effect for image on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.02;
        const deltaY = (e.clientY - centerY) * 0.02;
        imageRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-surface/50 to-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full bg-primary/20",
              "animate-float"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Enhanced Content Side */}
          <div className="space-y-8 relative">
            {/* Badge with animation */}
            <div
              className={cn(
                "inline-flex items-center gap-3 px-5 py-2.5 rounded-full",
                "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent",
                "border border-primary/20 backdrop-blur-sm",
                "group/badge",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              )}
              style={{
                transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <div className="relative">
                <span className="absolute inset-0 w-3 h-3 rounded-full bg-primary animate-ping opacity-75" />
                <span className="relative w-3 h-3 rounded-full bg-primary" />
              </div>
              <span className="text-sm font-semibold text-primary">
                Premium Pet Technology
              </span>
              <Zap className="h-4 w-4 text-primary group-hover/badge:rotate-12 transition-transform duration-300" />
            </div>

            {/* Main Heading with Split Animation */}
            <div className="space-y-4">
              <h1
                className={cn(
                  "text-5xl md:text-6xl lg:text-7xl font-black leading-tight",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
                }}
              >
                <span className="block text-foreground">Smarter Tech</span>
                {/* Gradient text with contained animation - only animates within text bounds */}
                <span className="relative inline-block overflow-hidden">
                  <span
                    className="block bg-gradient-to-r from-primary via-accent via-primary to-accent bg-clip-text text-transparent"
                    style={{
                      backgroundSize: "200% 100%",
                      animation:
                        "shimmer-text-contained 4s ease-in-out infinite",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    for Happier Pets
                  </span>
                  {/* Subtle shine overlay that moves within text bounds only */}
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                      transform: "translateX(-100%)",
                      animation:
                        "shimmer-overlay-contained 4s ease-in-out infinite",
                      mixBlendMode: "overlay",
                    }}
                  />
                </span>
              </h1>

              {/* Subtitle with fade */}
              <p
                className={cn(
                  "text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transition: "all 0.8s ease-out 0.4s",
                }}
              >
                Discover innovative smart devices designed to enhance your pet's
                life. From automated feeders to GPS trackers – we've got your
                furry friends covered.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div
              className={cn(
                "flex flex-wrap gap-4",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transition: "all 0.8s ease-out 0.6s",
              }}
            >
              <Button
                asChild
                variant="hero"
                size="xl"
                className="group/cta relative overflow-hidden"
              >
                <Link
                  to="/shop"
                  className="relative z-10 flex items-center gap-2"
                >
                  <span>Shop Smart Pet Tech</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="group/outline border-2"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <span>Contact Us</span>
                  <Phone className="h-4 w-4 transition-transform duration-300 group-hover/outline:scale-110" />
                </Link>
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div
              className={cn(
                "flex flex-wrap items-center gap-6 pt-6",
                "border-t border-border/50",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transition: "all 0.8s ease-out 0.8s",
              }}
            >
              {[
                {
                  icon: CheckCircle,
                  text: "Verified Business",
                  color: "text-primary",
                },
                {
                  icon: Shield,
                  text: "Secure Shopping",
                  color: "text-primary",
                },
                {
                  icon: Star,
                  text: "4.9/5 Rating",
                  color: "text-accent",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 group/trust"
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      item.color,
                      "group-hover/trust:scale-125"
                    )}
                  />
                  <span className="text-sm text-muted-foreground group-hover/trust:text-foreground transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Floating Stats */}
            <div
              className={cn(
                "grid grid-cols-3 gap-4 pt-6",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transition: "all 0.8s ease-out 1s",
              }}
            >
              {[
                { number: "10K+", label: "Happy Pets" },
                { number: "4.9★", label: "Avg Rating" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group/stat"
                >
                  <div className="text-2xl font-bold text-primary group-hover/stat:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Hero Image with Parallax */}
          <div
            ref={imageRef}
            className={cn(
              "relative lg:sticky lg:top-24",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            style={{
              transition: "all 1s cubic-bezier(0.34,1.56,0.64,1) 0.3s",
            }}
          >
            {/* Glow Effects */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-2xl opacity-50 animate-pulse" />
            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl" />

            {/* Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 group/image">
              {/* Image */}
              <img
                src="/hero-pets.jpg"
                alt="Happy pets with smart technology - Modern pet care with innovative devices"
                className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover transition-transform duration-700 group-hover/image:scale-110"
                loading="eager"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 p-4 bg-card/90 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      Smart Tech
                    </div>
                    <div className="text-xs text-muted-foreground">
                      AI Powered
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-card/90 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      Trusted by 10,000+ Pet Owners
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-accent text-accent"
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">
                        4.9/5
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
          <span className="text-xs font-medium">Scroll to explore</span>
          <ArrowRight className="h-4 w-4 rotate-90" />
        </div>
      </div>

      {/* Custom animations for contained text shimmer - only within text bounds */}
      <style>{`
        @keyframes shimmer-text-contained {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
        @keyframes shimmer-overlay-contained {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(calc(100% + 100px)) skewX(-12deg);
          }
        }
      `}</style>
    </section>
  );
};

// Enhanced Categories Section Component with Creative Animations
const CategoriesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Magnetic hover effect
  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMousePosition({ x, y });
    setHoveredIndex(index);

    // Magnetic effect - card follows cursor slightly
    const moveX = x * 0.15;
    const moveY = y * 0.15;

    card.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${
      -y * 0.05
    }deg) rotateY(${x * 0.05}deg) scale(1.05)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      card.style.transform = "";
    }
    setHoveredIndex(null);
  };

  // Category gradient colors
  const categoryGradients: Record<string, string> = {
    feeders: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
    fountains: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    trackers: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    cameras: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    litter: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
    toys: "from-red-500/20 via-orange-500/20 to-yellow-500/20",
    health: "from-rose-500/20 via-pink-500/20 to-red-500/20",
  };

  // Unsplash images for each category - high quality, relevant images
  const categoryImages: Record<string, string> = {
    feeders: "/feeders.jpg",
    fountains: "/fountains.jpg",
    trackers: "/trackers.jpg",
    cameras: "/cameras.jpg",
    litter: "/litter.jpg",
    toys: "/toys.jpg",
    health: "/health.jpg",
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-surface/30 to-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full bg-primary/10",
              "animate-float-category"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className={cn(
              "inline-block mb-6",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            )}
            style={{
              transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              Explore Categories
            </span>
          </div>

          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black mb-6",
              "bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            style={{
              transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
            }}
          >
            Shop by Category
          </h2>

          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transition: "all 0.8s ease-out 0.4s",
            }}
          >
            Discover our curated collection of smart pet products designed to
            make life easier for you and your pets. Each category offers
            innovative solutions tailored to your pet's needs.
          </p>
        </div>

        {/* Enhanced Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {CATEGORIES.map((category, index) => {
            const IconComponent = categoryIcons[category.id];
            const gradient =
              categoryGradients[category.id] || "from-primary/20 to-primary/10";
            const delay = index * 100;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={category.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={cn(
                  "relative group/card",
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                )}
                style={{
                  transition: `all 0.8s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <Link
                  to={category.href}
                  className={cn(
                    "relative block h-full min-h-[500px] md:min-h-[550px]",
                    "transform-gpu transition-transform duration-300",
                    "group/card-link"
                  )}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Card Container with Split Layout */}
                  <div
                    className={cn(
                      "relative h-full rounded-3xl",
                      "overflow-hidden",
                      "bg-card",
                      "border border-border/50",
                      "shadow-lg shadow-black/5",
                      // Hover effects
                      "group-hover/card-link:border-primary/40",
                      "group-hover/card-link:shadow-2xl group-hover/card-link:shadow-primary/20",
                      "transition-all duration-500 ease-out"
                    )}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Image Section - Top 60% */}
                    <div className="relative h-[60%] overflow-hidden">
                      <img
                        src={categoryImages[category.id]}
                        alt={`${category.name} - ${category.description}`}
                        className={cn(
                          "w-full h-full object-cover",
                          "transition-transform duration-700 ease-out",
                          "group-hover/card-link:scale-110",
                          "group-hover/card-link:brightness-110"
                        )}
                        loading="lazy"
                      />

                      {/* Subtle Top Gradient - Only at bottom of image section */}
                      <div
                        className={cn(
                          "absolute bottom-0 left-0 right-0 h-20",
                          "bg-gradient-to-t from-background/80 via-background/40 to-transparent"
                        )}
                      />

                      {/* Hover Gradient Overlay */}
                      <div
                        className={cn(
                          "absolute inset-0",
                          "bg-gradient-to-br",
                          gradient,
                          "opacity-0 group-hover/card-link:opacity-20",
                          "transition-opacity duration-500"
                        )}
                      />

                      {/* Top Icon Badge - Floating */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={cn(
                            "relative",
                            "transform-gpu transition-all duration-500",
                            "group-hover/card-link:scale-110 group-hover/card-link:rotate-6"
                          )}
                        >
                          {/* Icon Glow */}
                          <div
                            className={cn(
                              "absolute inset-0 rounded-2xl",
                              "bg-gradient-to-br from-primary/40 to-primary/20",
                              "blur-xl opacity-0 group-hover/card-link:opacity-100",
                              "transition-opacity duration-500",
                              "scale-150"
                            )}
                          />

                          {/* Icon Background with Glassmorphism */}
                          <div
                            className={cn(
                              "relative w-14 h-14 md:w-16 md:h-16",
                              "rounded-2xl",
                              "bg-background/90 backdrop-blur-xl",
                              "border-2 border-primary/40",
                              "flex items-center justify-center",
                              "shadow-xl shadow-black/20",
                              "group-hover/card-link:bg-primary",
                              "group-hover/card-link:border-primary",
                              "group-hover/card-link:shadow-2xl group-hover/card-link:shadow-primary/50",
                              "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            )}
                          >
                            {/* Pulsing Ring */}
                            <div
                              className={cn(
                                "absolute inset-0 rounded-2xl",
                                "border-2 border-primary/0",
                                "group-hover/card-link:border-primary/70",
                                "group-hover/card-link:animate-pulse",
                                "transition-all duration-500"
                              )}
                            />

                            {/* Icon */}
                            <div
                              className={cn(
                                "relative z-10 text-primary",
                                "group-hover/card-link:text-primary-foreground",
                                "transition-colors duration-500"
                              )}
                            >
                              {IconComponent}
                            </div>

                            {/* Floating Particles around Icon */}
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "absolute w-1.5 h-1.5 rounded-full bg-primary/80",
                                  "opacity-0 group-hover/card-link:opacity-100",
                                  "transition-opacity duration-500",
                                  "animate-float-particle"
                                )}
                                style={{
                                  top: `${20 + i * 30}%`,
                                  left: `${20 + i * 30}%`,
                                  animationDelay: `${i * 0.2}s`,
                                  animationDuration: "2s",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Corner Badge - Top Right */}
                      <div
                        className={cn(
                          "absolute top-4 right-4",
                          "px-3 py-1.5 rounded-full",
                          "bg-background/90 backdrop-blur-xl",
                          "border border-primary/40",
                          "text-primary text-xs font-bold",
                          "shadow-lg",
                          "opacity-0 group-hover/card-link:opacity-100",
                          "group-hover/card-link:translate-y-0",
                          "translate-y-2",
                          "transition-all duration-500"
                        )}
                      >
                        New
                      </div>
                    </div>

                    {/* Content Section - Bottom 40% */}
                    <div className="relative h-[40%] bg-gradient-to-b from-background to-card p-6 md:p-8 flex flex-col justify-center">
                      {/* Animated Gradient Background Glow */}
                      <div
                        className={cn(
                          "absolute inset-0",
                          "bg-gradient-to-br",
                          gradient,
                          "opacity-0 group-hover/card-link:opacity-10",
                          "transition-opacity duration-500",
                          "blur-2xl"
                        )}
                        style={{
                          transform: isHovered
                            ? `scale(${1.2}) translate(${
                                mousePosition.x * 0.05
                              }px, ${mousePosition.y * 0.05}px)`
                            : "scale(1)",
                        }}
                      />

                      {/* Shimmer Effect */}
                      <div
                        className={cn(
                          "absolute inset-0",
                          "bg-gradient-to-r from-transparent via-white/10 to-transparent",
                          "opacity-0 group-hover/card-link:opacity-100",
                          "transform -skew-x-12",
                          "transition-opacity duration-500",
                          "pointer-events-none"
                        )}
                        style={{
                          animation: isHovered
                            ? "shimmer-card 3s ease-in-out infinite"
                            : "none",
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10 space-y-3">
                        {/* Title */}
                        <h3
                          className={cn(
                            "text-2xl md:text-3xl font-black",
                            "text-foreground",
                            "group-hover/card-link:text-primary",
                            "transition-colors duration-500"
                          )}
                        >
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p
                          className={cn(
                            "text-sm md:text-base",
                            "text-muted-foreground",
                            "group-hover/card-link:text-foreground",
                            "transition-colors duration-500",
                            "leading-relaxed"
                          )}
                        >
                          {category.description}
                        </p>

                        {/* Arrow Indicator */}
                        <div
                          className={cn(
                            "flex items-center gap-2 pt-2",
                            "text-primary opacity-0 group-hover/card-link:opacity-100",
                            "group-hover/card-link:translate-x-0",
                            "-translate-x-4",
                            "transition-all duration-500"
                          )}
                        >
                          <span className="text-sm font-bold">Explore Now</span>
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/card-link:translate-x-2" />
                        </div>
                      </div>
                    </div>

                    {/* Glowing Border - Only on hover */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-3xl",
                        "bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0",
                        "opacity-0 group-hover/card-link:opacity-100",
                        "transition-opacity duration-500",
                        "pointer-events-none"
                      )}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes shimmer-card {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        @keyframes float-category {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(5px) translateX(-5px);
          }
          75% {
            transform: translateY(-5px) translateX(-5px);
          }
        }
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-15px) translateX(10px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

// Enhanced Trust Strip Section Component
const TrustStripSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const trustBadges = [
    {
      icon: Shield,
      label: "Secure Checkout",
      description: "SSL encrypted",
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
      color: "text-green-500",
    },
    {
      icon: Headphones,
      label: "Fast Support",
      description: "Quick responses",
      gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
      color: "text-blue-500",
    },
    {
      icon: RefreshCw,
      label: "Easy Returns",
      description: "30-day policy",
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
      color: "text-orange-500",
    },
    {
      icon: CheckCircle,
      label: "Verified Business",
      description: "Transparent info",
      gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
      color: "text-purple-500",
    },
  ];

  // IntersectionObserver for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-surface via-background/50 to-surface"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full bg-primary/10",
              "animate-float-trust"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className={cn(
              "inline-block mb-6",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            )}
            style={{
              transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              <Shield className="h-4 w-4" />
              Trust & Security
            </span>
          </div>

          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-black mb-6",
              "bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            style={{
              transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
            }}
          >
            Why Trust Us
          </h2>

          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transition: "all 0.8s ease-out 0.4s",
            }}
          >
            We believe in complete transparency and customer satisfaction. Every
            transaction is secure, every support request is handled quickly, and
            every return is hassle-free.
          </p>
        </div>

        {/* Enhanced Trust Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            const delay = index * 100;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={badge.label}
                className={cn(
                  "relative group/trust",
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                )}
                style={{
                  transition: `all 0.8s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Trust Badge Card */}
                <div
                  className={cn(
                    "relative h-full p-8 rounded-3xl",
                    "bg-gradient-to-br from-card/90 via-card/70 to-card/50",
                    "backdrop-blur-xl",
                    "border-2 border-border/50",
                    "shadow-lg shadow-black/5",
                    "overflow-hidden",
                    // Hover effects
                    "group-hover/trust:border-primary/40",
                    "group-hover/trust:shadow-2xl group-hover/trust:shadow-primary/20",
                    "group-hover/trust:-translate-y-2",
                    "transition-all duration-500 ease-out"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Animated Gradient Background */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-3xl",
                      "bg-gradient-to-br",
                      badge.gradient,
                      "opacity-0 group-hover/trust:opacity-100",
                      "transition-opacity duration-500",
                      "blur-xl -z-10"
                    )}
                    style={{
                      transform: isHovered ? "scale(1.2)" : "scale(1)",
                    }}
                  />

                  {/* Shimmer Effect */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-3xl",
                      "bg-gradient-to-r from-transparent via-white/10 to-transparent",
                      "opacity-0 group-hover/trust:opacity-100",
                      "transform -skew-x-12",
                      "transition-opacity duration-500",
                      "pointer-events-none"
                    )}
                    style={{
                      animation: isHovered
                        ? "shimmer-trust 3s ease-in-out infinite"
                        : "none",
                    }}
                  />

                  {/* Glowing Border */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-3xl",
                      "bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0",
                      "opacity-0 group-hover/trust:opacity-100",
                      "transition-opacity duration-500",
                      "-z-[1]"
                    )}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon Container with 3D Effect */}
                    <div
                      className={cn(
                        "relative mb-6",
                        "transform-gpu transition-all duration-500",
                        "group-hover/trust:scale-110 group-hover/trust:rotate-6"
                      )}
                    >
                      {/* Icon Glow */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-2xl",
                          "bg-gradient-to-br from-primary/40 to-primary/20",
                          "blur-2xl opacity-0 group-hover/trust:opacity-100",
                          "transition-opacity duration-500",
                          "scale-150"
                        )}
                      />

                      {/* Icon Background with Glassmorphism */}
                      <div
                        className={cn(
                          "relative w-20 h-20 md:w-24 md:h-24",
                          "rounded-2xl",
                          "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
                          "backdrop-blur-md",
                          "border-2 border-primary/30",
                          "flex items-center justify-center",
                          "group-hover/trust:bg-gradient-to-br",
                          "group-hover/trust:from-primary group-hover/trust:to-primary/80",
                          "group-hover/trust:border-primary/60",
                          "group-hover/trust:shadow-xl group-hover/trust:shadow-primary/30",
                          "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        )}
                      >
                        {/* Pulsing Ring */}
                        <div
                          className={cn(
                            "absolute inset-0 rounded-2xl",
                            "border-2 border-primary/0",
                            "group-hover/trust:border-primary/50",
                            "group-hover/trust:animate-pulse",
                            "transition-all duration-500"
                          )}
                        />

                        {/* Icon */}
                        <div
                          className={cn(
                            "relative z-10",
                            badge.color,
                            "group-hover/trust:text-primary-foreground",
                            "transition-colors duration-500"
                          )}
                        >
                          <IconComponent className="h-8 w-8 md:h-10 md:w-10" />
                        </div>

                        {/* Floating Particles around Icon */}
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "absolute w-1.5 h-1.5 rounded-full bg-primary/60",
                              "opacity-0 group-hover/trust:opacity-100",
                              "transition-opacity duration-500",
                              "animate-float-particle"
                            )}
                            style={{
                              top: `${20 + i * 30}%`,
                              left: `${20 + i * 30}%`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: "2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "text-xl md:text-2xl font-bold mb-2",
                        "text-foreground",
                        "group-hover/trust:text-primary",
                        "transition-colors duration-500"
                      )}
                    >
                      {badge.label}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-sm md:text-base text-muted-foreground",
                        "group-hover/trust:text-foreground/80",
                        "transition-colors duration-500",
                        "leading-relaxed"
                      )}
                    >
                      {badge.description}
                    </p>

                    {/* Decorative Line */}
                    <div
                      className={cn(
                        "mt-4 w-12 h-0.5",
                        "bg-gradient-to-r from-transparent via-primary to-transparent",
                        "opacity-0 group-hover/trust:opacity-100",
                        "group-hover/trust:scale-x-150",
                        "transition-all duration-500"
                      )}
                    />
                  </div>

                  {/* Corner Accent */}
                  <div
                    className={cn(
                      "absolute top-0 right-0 w-24 h-24",
                      "bg-gradient-to-br from-primary/10 to-transparent",
                      "rounded-bl-full opacity-0 group-hover/trust:opacity-100",
                      "transition-opacity duration-500"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes shimmer-trust {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        @keyframes float-trust {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(5px) translateX(-5px);
          }
          75% {
            transform: translateY(-5px) translateX(-5px);
          }
        }
      `}</style>
    </section>
  );
};

// Enhanced Featured Products Section Component
const FeaturedProductsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-surface/30 to-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Enhanced Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div
              className={cn(
                "inline-block",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-8"
              )}
              style={{
                transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                Best Sellers
              </span>
            </div>

            <h2
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-black",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{
                transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
              }}
            >
              Featured Products
            </h2>

            <p
              className={cn(
                "text-lg md:text-xl text-muted-foreground max-w-2xl",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transition: "all 0.8s ease-out 0.4s",
              }}
            >
              Our most popular smart pet devices trusted by thousands of pet
              owners worldwide
            </p>
          </div>

          <div
            className={cn(
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transition: "all 0.8s ease-out 0.6s",
            }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group/viewall border-2 hover:border-primary hover:bg-primary/5"
            >
              <Link to="/shop" className="flex items-center gap-2">
                <span>View All Products</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/viewall:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Products Grid with Equal Heights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.slice(0, 8).map((product, index) => {
            const delay = index * 75;
            return (
              <div
                key={product.id}
                className={cn(
                  "h-full",
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                )}
                style={{
                  transition: `all 0.8s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                }}
              >
                <ProductCard
                  {...product}
                  image={product.image}
                  className="h-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <Layout>
      {/* Enhanced Hero Section with Creative Design */}
      <HeroSection />

      {/* Enhanced Categories Section with Creative Design */}
      <CategoriesSection />

      {/* Enhanced Trust Strip Section */}
      <TrustStripSection />

      {/* Enhanced Featured Products Section */}
      <FeaturedProductsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 gradient-hero text-primary-foreground">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Upgrade Your Pet's Life?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of happy pet owners who trust our smart technology
              for their beloved companions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="xl"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/trust">Learn About Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-12 bg-surface border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {BUSINESS_INFO.name}
              </h3>
              <p className="text-muted-foreground">
                {BUSINESS_INFO.fullAddress}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {BUSINESS_INFO.email}
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
