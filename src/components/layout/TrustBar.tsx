import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TrustBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const trustItems = [
    {
      icon: MapPin,
      label: BUSINESS_INFO.shortAddress,
      value: BUSINESS_INFO.shortAddress,
      href: null,
      showOn: "sm",
    },
    {
      icon: Mail,
      label: "Email",
      value: BUSINESS_INFO.email,
      href: `mailto:${BUSINESS_INFO.email}`,
      showOn: "md",
    },
    {
      icon: Phone,
      label: "Phone",
      value: BUSINESS_INFO.phone,
      href: `tel:${BUSINESS_INFO.phone}`,
      showOn: "lg",
    },
  ];

  const Content = ({ item }: { item: (typeof trustItems)[0] }) => {
    const IconComponent = item.icon;
    const content = (
      <div
        className={cn(
          "group/item relative flex items-center gap-2 px-3 py-1.5 rounded-lg",
          "bg-background/80 backdrop-blur-md",
          "border border-primary/20",
          "shadow-sm",
          "hover:bg-background/90 hover:border-primary/40",
          "hover:shadow-lg hover:shadow-primary/20",
          "transition-all duration-300 ease-out",
          "overflow-hidden"
        )}
      >
        {/* Animated Gradient Background */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg",
            "bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0",
            "opacity-0 group-hover/item:opacity-100",
            "transition-opacity duration-300",
            "animate-gradient-move"
          )}
        />

        {/* Shimmer Effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg",
            "bg-gradient-to-r from-transparent via-white/20 to-transparent",
            "opacity-0 group-hover/item:opacity-100",
            "transform -skew-x-12",
            "transition-opacity duration-300",
            "animate-shimmer-trustbar"
          )}
        />

        {/* Icon with Glow */}
        <div className="relative">
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-primary/30 blur-md",
              "opacity-0 group-hover/item:opacity-100",
              "scale-150",
              "transition-opacity duration-300"
            )}
          />
          <IconComponent
            className={cn(
              "relative h-4 w-4 text-primary",
              "group-hover/item:scale-110 group-hover/item:rotate-12",
              "transition-all duration-300"
            )}
          />
        </div>

        {/* Text */}
        <span
          className={cn(
            "relative text-sm font-medium",
            "text-foreground/95 drop-shadow-sm",
            "group-hover/item:text-primary",
            "transition-colors duration-300"
          )}
        >
          {item.value}
        </span>

        {/* Floating Particles on Hover */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full bg-primary/60",
              "opacity-0 group-hover/item:opacity-100",
              "transition-opacity duration-300",
              "animate-float-trustbar"
            )}
            style={{
              top: `${20 + i * 30}%`,
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>
    );

    if (item.href) {
      return (
        <a
          href={item.href}
          className={cn(
            `hidden ${item.showOn}:block`,
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          )}
          style={{
            transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${
              trustItems.indexOf(item) * 100
            }ms`,
          }}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        className={cn(
          `hidden ${item.showOn}:flex`,
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        )}
        style={{
          transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${
            trustItems.indexOf(item) * 100
          }ms`,
        }}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-trust-bar via-trust-bar/95 to-trust-bar border-b border-border/20">
      {/* Light Overlay for Better Text Contrast */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-b from-background/40 via-background/30 to-background/40",
          "backdrop-blur-[0.5px]"
        )}
      />

      {/* Animated Gradient Background */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10",
          "bg-[length:200%_100%]",
          "animate-gradient-slide"
        )}
      />

      {/* Moving Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute top-0 left-0 w-64 h-64",
            "bg-gradient-to-br from-primary/20 to-accent/20",
            "rounded-full blur-3xl",
            "animate-orb-move-1"
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 right-0 w-64 h-64",
            "bg-gradient-to-br from-accent/20 to-primary/20",
            "rounded-full blur-3xl",
            "animate-orb-move-2"
          )}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59,130,246,0.1) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-1 h-1 rounded-full bg-primary/30",
            "animate-float-particle-trustbar"
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="container relative z-10 py-3 md:py-4">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {/* Business Name with Animation */}
          <div
            className={cn(
              "relative group/name",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            )}
            style={{
              transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <div
              className={cn(
                "px-4 py-1.5 rounded-lg",
                "bg-background/90 backdrop-blur-md",
                "border border-primary/30",
                "shadow-md",
                "hover:bg-background hover:border-primary/50",
                "hover:shadow-lg hover:shadow-primary/30",
                "transition-all duration-300"
              )}
            >
              <span className="relative flex items-center gap-2 text-sm font-bold text-foreground drop-shadow-sm group-hover/name:text-primary transition-colors duration-300">
                <Sparkles
                  className={cn(
                    "h-4 w-4 text-primary",
                    "group-hover/name:rotate-180 group-hover/name:scale-110",
                    "transition-all duration-500"
                  )}
                />
                {BUSINESS_INFO.name}
              </span>
            </div>

            {/* Glow Effect */}
            <div
              className={cn(
                "absolute inset-0 rounded-lg",
                "bg-primary/20 blur-xl",
                "opacity-0 group-hover/name:opacity-100",
                "transition-opacity duration-300",
                "-z-10"
              )}
            />
          </div>

          {/* Separator */}
          <div
            className={cn(
              "hidden sm:block w-1 h-1 rounded-full bg-primary/40",
              "animate-pulse"
            )}
          />

          {/* Trust Items */}
          {trustItems.map((item) => (
            <Content key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes gradient-slide {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-slide {
          animation: gradient-slide 8s ease-in-out infinite;
        }

        @keyframes gradient-move {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        .animate-gradient-move {
          animation: gradient-move 3s ease-in-out infinite;
        }

        @keyframes shimmer-trustbar {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        .animate-shimmer-trustbar {
          animation: shimmer-trustbar 2s ease-in-out infinite;
        }

        @keyframes orb-move-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -20px) scale(1.1);
          }
        }
        .animate-orb-move-1 {
          animation: orb-move-1 6s ease-in-out infinite;
        }

        @keyframes orb-move-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, 20px) scale(1.1);
          }
        }
        .animate-orb-move-2 {
          animation: orb-move-2 8s ease-in-out infinite;
        }

        @keyframes float-particle-trustbar {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-5px) translateX(3px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(3px) translateX(-3px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-3px) translateX(-3px);
            opacity: 0.5;
          }
        }
        .animate-float-particle-trustbar {
          animation: float-particle-trustbar 4s ease-in-out infinite;
        }

        @keyframes float-trustbar {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-8px) translateX(5px) scale(1.2);
            opacity: 1;
          }
        }
        .animate-float-trustbar {
          animation: float-trustbar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
