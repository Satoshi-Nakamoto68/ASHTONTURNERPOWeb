import { Shield, Headphones, RefreshCw, BadgeCheck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const badges = [
  { icon: Shield, label: "Secure Checkout", description: "SSL encrypted" },
  { icon: Headphones, label: "Fast Support", description: "Quick responses" },
  { icon: RefreshCw, label: "Easy Returns", description: "30-day policy" },
  { icon: BadgeCheck, label: "Verified Business", description: "Transparent info" },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {badges.map((badge, index) => (
        <AnimatedSection
          key={badge.label}
          delay={index * 100}
          animation="scale-in"
          className="flex flex-col items-center text-center p-4 md:p-6 bg-card rounded-xl border border-border hover:border-primary/20 hover:shadow-glow transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <badge.icon className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-semibold text-sm mb-1">{badge.label}</h4>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </AnimatedSection>
      ))}
    </div>
  );
}
