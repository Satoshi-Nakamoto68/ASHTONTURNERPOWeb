import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  Check,
  Truck,
  RefreshCw,
  Shield,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Package,
  Clock,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PRODUCTS, BUSINESS_INFO } from "@/lib/constants";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const product = PRODUCTS.find((p) => p.id === id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product?.category && p.id !== id
  ).slice(0, 4);

  // Get all images for gallery
  const allImages = product
    ? [
        product.image,
        ...(product.imageGallery || []),
        ...(product.hoverImage ? [product.hoverImage] : []),
      ]
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
      } else if (e.key === "ArrowLeft") {
        setLightboxImageIndex(
          (prev) => (prev - 1 + allImages.length) % allImages.length
        );
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
      } else if (e.key === "ArrowRight") {
        setLightboxImageIndex((prev) => (prev + 1) % allImages.length);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, allImages.length]);

  // Handle mouse wheel zoom in lightbox
  const handleWheel = (e: React.WheelEvent) => {
    if (!isLightboxOpen) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel((prev) => Math.max(1, Math.min(5, prev + delta)));
  };

  // Handle pan in lightbox
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || zoomLevel <= 1) return;
    setPanPosition({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Open lightbox with selected image
  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription || product.name,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              to="/shop"
              className="text-muted-foreground hover:text-foreground"
            >
              Shop
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Enhanced Image Gallery with Full Image Display */}
          <AnimatedSection>
            <div className="flex flex-row gap-4">
              {/* Thumbnail Gallery - Left Side */}
              {allImages.length > 1 && (
                <div className="flex flex-col gap-3 flex-shrink-0 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 group/thumb",
                        "flex-shrink-0",
                        selectedImageIndex === index
                          ? "border-primary shadow-lg shadow-primary/30 scale-105 ring-2 ring-primary/20"
                          : "border-border/50 hover:border-primary/50 hover:scale-105"
                      )}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-contain bg-surface transition-transform duration-300 group-hover/thumb:scale-110"
                        loading="lazy"
                      />
                      {selectedImageIndex === index && (
                        <>
                          <div className="absolute inset-0 bg-primary/20 rounded-xl" />
                          <div className="absolute inset-0 border-2 border-primary rounded-xl" />
                        </>
                      )}
                      {/* Active Indicator */}
                      {selectedImageIndex === index && (
                        <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-lg animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image - Right Side with Full Display */}
              <div className="flex-1 relative group min-h-[500px] md:min-h-[600px] bg-gradient-to-br from-surface via-surface/80 to-surface/50 rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                {/* Image Container - Full Display with object-contain */}
                <div className="relative w-full h-full min-h-[500px] md:min-h-[600px] flex items-center justify-center p-4 md:p-8">
                  <img
                    ref={imageRef}
                    src={allImages[selectedImageIndex] || product.image}
                    alt={product.name}
                    className={cn(
                      "max-w-full max-h-full w-auto h-auto object-contain transition-all duration-500",
                      "cursor-zoom-in",
                      isZoomed && "scale-150 cursor-zoom-out"
                    )}
                    onClick={() => openLightbox(selectedImageIndex)}
                    loading="eager"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = product.image;
                    }}
                  />
                </div>

                {/* Badge */}
                {"badge" in product && product.badge && (
                  <div className="absolute top-6 left-6 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-sm font-bold rounded-full shadow-lg backdrop-blur-sm border border-accent/20">
                      <Sparkles className="h-4 w-4" />
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Action Buttons - Top Right */}
                <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => openLightbox(selectedImageIndex)}
                    className="p-3 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg hover:bg-background hover:scale-110 transition-all duration-300"
                    title="View Fullscreen"
                  >
                    <Maximize className="h-5 w-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-3 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg hover:bg-background hover:scale-110 transition-all duration-300"
                    title={isZoomed ? "Zoom Out" : "Zoom In"}
                  >
                    {isZoomed ? (
                      <ZoomOut className="h-5 w-5 text-foreground" />
                    ) : (
                      <ZoomIn className="h-5 w-5 text-foreground" />
                    )}
                  </button>
                </div>

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(
                          (prev) =>
                            (prev - 1 + allImages.length) % allImages.length
                        );
                        setIsZoomed(false);
                      }}
                      className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 z-10",
                        "p-3 bg-background/90 backdrop-blur-md rounded-full",
                        "border border-border/50 shadow-lg",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        "hover:bg-background hover:scale-110 hover:border-primary",
                        "transition-all duration-300"
                      )}
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="h-5 w-5 text-foreground" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(
                          (prev) => (prev + 1) % allImages.length
                        );
                        setIsZoomed(false);
                      }}
                      className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 z-10",
                        "p-3 bg-background/90 backdrop-blur-md rounded-full",
                        "border border-border/50 shadow-lg",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        "hover:bg-background hover:scale-110 hover:border-primary",
                        "transition-all duration-300"
                      )}
                      aria-label="Next image"
                    >
                      <ArrowRight className="h-5 w-5 text-foreground" />
                    </button>
                  </>
                )}

                {/* Image Counter & Info */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
                    <div className="px-4 py-2 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg text-sm font-medium text-foreground">
                      {selectedImageIndex + 1} / {allImages.length}
                    </div>
                    <button
                      onClick={() => openLightbox(selectedImageIndex)}
                      className="px-4 py-2 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg text-sm font-medium text-foreground hover:bg-background hover:border-primary transition-all duration-300"
                    >
                      View Fullscreen
                    </button>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Lightbox Modal for Full Image View */}
          {isLightboxOpen && (
            <div
              ref={lightboxRef}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => {
                setIsLightboxOpen(false);
                setZoomLevel(1);
                setPanPosition({ x: 0, y: 0 });
              }}
              onWheel={handleWheel}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomLevel(1);
                  setPanPosition({ x: 0, y: 0 });
                }}
                className="absolute top-4 right-4 z-20 p-3 bg-background/90 backdrop-blur-md rounded-full border border-border/50 shadow-lg hover:bg-background hover:scale-110 transition-all duration-300"
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6 text-foreground" />
              </button>

              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel((prev) => Math.max(1, prev - 0.5));
                    if (zoomLevel <= 1.5) {
                      setPanPosition({ x: 0, y: 0 });
                    }
                  }}
                  className="p-3 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg hover:bg-background hover:scale-110 transition-all duration-300"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-5 w-5 text-foreground" />
                </button>
                <span className="px-4 py-2 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg text-sm font-medium text-foreground">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel((prev) => Math.min(5, prev + 0.5));
                  }}
                  className="p-3 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg hover:bg-background hover:scale-110 transition-all duration-300"
                  title="Zoom In"
                >
                  <ZoomIn className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel(1);
                    setPanPosition({ x: 0, y: 0 });
                  }}
                  className="px-4 py-2 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg hover:bg-background hover:scale-110 transition-all duration-300 text-sm font-medium text-foreground"
                  title="Reset Zoom"
                >
                  Reset
                </button>
              </div>

              {/* Image Container */}
              <div
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
              >
                <img
                  src={allImages[lightboxImageIndex] || product.image}
                  alt={`${product.name} - Full view ${lightboxImageIndex + 1}`}
                  className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain transition-transform duration-300"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${
                      panPosition.x / zoomLevel
                    }px, ${panPosition.y / zoomLevel}px)`,
                    cursor:
                      zoomLevel > 1
                        ? isPanning
                          ? "grabbing"
                          : "grab"
                        : "default",
                  }}
                  draggable={false}
                  loading="eager"
                />
              </div>

              {/* Navigation Arrows in Lightbox */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImageIndex(
                        (prev) =>
                          (prev - 1 + allImages.length) % allImages.length
                      );
                      setZoomLevel(1);
                      setPanPosition({ x: 0, y: 0 });
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-background/90 backdrop-blur-md rounded-full border border-border/50 shadow-lg hover:bg-background hover:scale-110 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-6 w-6 text-foreground" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImageIndex(
                        (prev) => (prev + 1) % allImages.length
                      );
                      setZoomLevel(1);
                      setPanPosition({ x: 0, y: 0 });
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 bg-background/90 backdrop-blur-md rounded-full border border-border/50 shadow-lg hover:bg-background hover:scale-110 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-6 w-6 text-foreground" />
                  </button>
                </>
              )}

              {/* Image Counter in Lightbox */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg text-sm font-medium text-foreground">
                  {lightboxImageIndex + 1} / {allImages.length}
                </div>
              )}

              {/* Instructions */}
              <div className="absolute bottom-4 right-4 z-20 px-4 py-2 bg-background/90 backdrop-blur-md rounded-lg border border-border/50 shadow-lg text-xs text-muted-foreground">
                <p>Scroll to zoom • Drag to pan • ESC to close</p>
              </div>
            </div>
          )}

          {/* Enhanced Product Info */}
          <AnimatedSection delay={100} className="space-y-6">
            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5 transition-all duration-300",
                        i < Math.floor(product.rating)
                          ? "text-accent fill-accent scale-110"
                          : "text-border"
                      )}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-foreground">
                  {product.rating}
                </span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm text-muted-foreground">
                {product.reviews.toLocaleString()} reviews
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-3">
                {product.name}
              </h1>
              {product.shortDescription && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/10">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-black text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {"originalPrice" in product && product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {"originalPrice" in product && product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-sm font-bold rounded-full shadow-lg">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    (
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF)
                  </span>
                </div>
              )}
            </div>

            {/* Full Description */}
            {product.fullDescription && (
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Product Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="flex-1 sm:flex-none min-w-[250px] h-16 text-base font-bold bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Link to="/contact">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact for Purchase
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "h-16 w-16 border-2 transition-all duration-300",
                    isFavorite
                      ? "bg-accent border-accent text-accent-foreground"
                      : "hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isFavorite && "fill-current"
                    )}
                  />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleShare}
                  className="h-16 w-16 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Enhanced Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50">
              <div className="text-center group cursor-default">
                <div className="relative inline-flex items-center justify-center mb-3">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Truck className="relative h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  Free Shipping
                </p>
                <p className="text-xs text-muted-foreground">On orders $50+</p>
              </div>
              <div className="text-center group cursor-default">
                <div className="relative inline-flex items-center justify-center mb-3">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <RefreshCw className="relative h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  30-Day Returns
                </p>
                <p className="text-xs text-muted-foreground">
                  Money-back guarantee
                </p>
              </div>
              <div className="text-center group cursor-default">
                <div className="relative inline-flex items-center justify-center mb-3">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Shield className="relative h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  1 Year Warranty
                </p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
            </div>

            {/* Enhanced Features Section with Collapsible */}
            {product.features && product.features.length > 0 && (
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Key Features & Benefits
                </h2>
                <div className="grid gap-4">
                  {(showAllFeatures
                    ? product.features
                    : product.features.slice(0, 3)
                  ).map((feature, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-xl",
                        "bg-gradient-to-r from-primary/5 via-transparent to-transparent",
                        "border border-primary/10",
                        "hover:border-primary/30 hover:bg-gradient-to-r hover:from-primary/10 hover:via-primary/5 hover:to-transparent",
                        "transition-all duration-300",
                        "group/feature",
                        !showAllFeatures && index === 2 && "opacity-100"
                      )}
                    >
                      <div className="relative flex-shrink-0 mt-0.5">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300" />
                        <div className="relative w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/feature:bg-primary group-hover/feature:scale-110 transition-all duration-300">
                          <Check className="h-4 w-4 text-primary group-hover/feature:text-primary-foreground transition-colors duration-300" />
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed group-hover/feature:text-foreground transition-colors duration-300">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Show More/Less Button */}
                {product.features.length > 3 && (
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                      className="w-full group/btn"
                    >
                      <span className="flex items-center gap-2">
                        {showAllFeatures ? (
                          <>
                            <span>Show Less</span>
                            <ChevronUp className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                          </>
                        ) : (
                          <>
                            <span>
                              Show All {product.features.length} Features
                            </span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Accordions */}
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem
                value="shipping"
                className="border border-border/50 rounded-xl px-4 bg-card"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Shipping & Returns
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="p-4 rounded-lg bg-surface border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">
                          Free Standard Shipping
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Free standard shipping on orders over $50. Express
                        shipping available for additional cost. Estimated
                        delivery time: 3-5 business days.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-surface border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">
                          30-Day Return Policy
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        30-day money-back guarantee for unused items in original
                        packaging. Return shipping costs apply unless item is
                        defective.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-surface border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">
                          Contact Support
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Email: {BUSINESS_INFO.email} | Phone:{" "}
                        {BUSINESS_INFO.phone}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedSection>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-border">
            <AnimatedSection className="mb-8">
              <h2 className="text-2xl font-bold">Complete Your Pet Setup</h2>
              <p className="text-muted-foreground">
                Products that go great together
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <AnimatedSection key={relatedProduct.id} delay={index * 75}>
                  <ProductCard
                    {...relatedProduct}
                    image={relatedProduct.image}
                  />
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
