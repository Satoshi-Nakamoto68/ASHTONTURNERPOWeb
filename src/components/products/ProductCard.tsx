import { Link } from "react-router-dom";
import { Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  features?: readonly string[];
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  hoverImage,
  badge,
  features,
  className,
}: ProductCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        "group block h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        className
      )}
    >
      {/* Image Section - Fixed Height */}
      <div className="relative aspect-square bg-surface overflow-hidden flex-shrink-0">
        {/* Main Image */}
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            "group-hover:scale-110",
            hoverImage && "group-hover:opacity-0"
          )}
          loading="lazy"
        />

        {/* Hover Image */}
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${name} - alternate view`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-500",
              "opacity-0 group-hover:opacity-100 group-hover:scale-110"
            )}
            loading="lazy"
          />
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-lg">
              {badge}
            </Badge>
          </div>
        )}

        {/* Quick View Action */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg backdrop-blur-sm"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Section - Fixed Height with Flex */}
      <div className="flex flex-col flex-1 p-4 min-h-[180px]">
        {/* Rating - Fixed Height */}
        <div className="flex items-center gap-1.5 mb-2 h-5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5 transition-all duration-300",
                  i < Math.floor(rating)
                    ? "text-accent fill-accent"
                    : "text-border"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {rating} ({reviews.toLocaleString()})
          </span>
        </div>

        {/* Name - Fixed Height with Line Clamp */}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3 min-h-[3rem] flex items-start">
          {name}
        </h3>

        {/* Features - Fixed Height Container */}
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[2rem] flex-grow">
          {features && features.length > 0 ? (
            features.slice(0, 2).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 line-clamp-1"
              >
                {feature.length > 30
                  ? `${feature.substring(0, 30)}...`
                  : feature}
              </span>
            ))
          ) : (
            <div className="h-6" /> // Spacer to maintain height
          )}
        </div>

        {/* Price - Fixed at Bottom */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {originalPrice && (
            <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
