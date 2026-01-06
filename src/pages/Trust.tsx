import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, FileCheck, Clock, Users, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { BUSINESS_INFO } from "@/lib/constants";
import { toast } from "sonner";

const Trust = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    purpose: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `VRF-${Date.now().toString(36).toUpperCase()}`;
    setReferenceId(refId);
    setSubmitted(true);
    toast.success("Inquiry submitted successfully!");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-background py-16 md:py-24">
        <div className="container text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Transparency & Trust
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Trust Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We believe in complete transparency. Here you'll find everything you need to know about our business.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 md:py-16">
        <div className="container">
          <TrustBadges />
        </div>
      </section>

      {/* Business Details */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Commitment to Transparency</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make it easy for customers, banks, and partners to verify our business
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Clear Contact Information",
                description: "Our full contact details are displayed on every page. Reach us anytime via email or phone.",
                link: "/contact",
                linkText: "Contact Us",
              },
              {
                icon: FileCheck,
                title: "Transparent Policies",
                description: "Clear terms, shipping info, return policy, and privacy policy available for review.",
                link: "/policies/terms",
                linkText: "View Policies",
              },
              {
                icon: Clock,
                title: "Responsive Support",
                description: "We respond to all inquiries promptly. Your satisfaction is our priority.",
                link: "/contact",
                linkText: "Get Support",
              },
              {
                icon: Users,
                title: "Real Business",
                description: `Operated by ${BUSINESS_INFO.name} from ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state}.`,
                link: "/about",
                linkText: "About Us",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <div className="p-6 bg-card rounded-2xl border border-border h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{item.description}</p>
                  <Link to={item.link} className="text-primary text-sm font-medium hover:underline">
                    {item.linkText} →
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Verification / Business Inquiry</h2>
            <p className="text-muted-foreground">
              For banks, partners, or anyone who needs to verify our business details
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            {submitted ? (
              <div className="bg-card rounded-2xl border border-border p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">Inquiry Submitted</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for your inquiry. We'll respond within 24-48 hours.
                </p>
                <div className="bg-surface rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground">Your Reference ID:</p>
                  <p className="text-lg font-mono font-bold text-primary">{referenceId}</p>
                </div>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Organization</label>
                    <Input
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Purpose of Inquiry *</label>
                  <Input
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="e.g., Bank verification, Partnership inquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please describe your inquiry in detail..."
                    rows={4}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4" />
                  Submit Inquiry
                </Button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Trust;
