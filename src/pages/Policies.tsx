import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BUSINESS_INFO, POLICY_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const policyContent: Record<string, { title: string; content: React.ReactNode }> = {
  terms: {
    title: "Terms & Conditions",
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="lead">
          Welcome to Smart Pet Products. By accessing and using our website, you agree to be bound by these Terms & Conditions.
        </p>
        
        <h2>1. General Terms</h2>
        <p>
          By placing an order through our website, you agree to provide accurate, current, and complete information. We reserve the right to refuse service to anyone for any reason at any time.
        </p>

        <h2>2. Products</h2>
        <p>
          All products are subject to availability. We strive to display accurate product images and descriptions, but we cannot guarantee that colors will be exactly as they appear on your screen.
        </p>

        <h2>3. Pricing</h2>
        <p>
          All prices are in USD and are subject to change without notice. We are not responsible for typographical errors in pricing. If a product is listed at an incorrect price, we reserve the right to cancel the order.
        </p>

        <h2>4. Payment</h2>
        <p>
          We accept major credit cards and other payment methods as displayed at checkout. Payment must be received before orders are processed.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and images, is the property of Smart Pet Products and is protected by copyright laws.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          Smart Pet Products shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to update these terms at any time. Continued use of the website constitutes acceptance of updated terms.
        </p>
      </div>
    ),
  },
  shipping: {
    title: "Shipping Policy",
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="lead">
          We are committed to delivering your smart pet products safely and efficiently.
        </p>

        <h2>Shipping Options</h2>
        <ul>
          <li><strong>Standard Shipping:</strong> 5-7 business days - Free on orders over $50</li>
          <li><strong>Express Shipping:</strong> 2-3 business days - $14.99</li>
          <li><strong>Overnight Shipping:</strong> Next business day - $29.99</li>
        </ul>

        <h2>Processing Time</h2>
        <p>
          Orders are typically processed within 1-2 business days. Orders placed after 2 PM MST may be processed the following business day.
        </p>

        <h2>Shipping Locations</h2>
        <p>
          We currently ship to all 50 US states. International shipping is not available at this time.
        </p>

        <h2>Order Tracking</h2>
        <p>
          Once your order ships, you will receive a confirmation email with tracking information. You can track your package through the carrier's website.
        </p>

        <h2>Delivery Issues</h2>
        <p>
          If your package is lost, damaged, or delayed, please contact us immediately. We will work with the carrier to resolve the issue promptly.
        </p>

        <h2>Contact</h2>
        <p>
          For shipping inquiries, please contact us at {BUSINESS_INFO.email} or {BUSINESS_INFO.phone}.
        </p>
      </div>
    ),
  },
  returns: {
    title: "Returns & Refunds",
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="lead">
          Your satisfaction is important to us. If you're not completely happy with your purchase, we're here to help.
        </p>

        <h2>Return Policy</h2>
        <p>
          You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error.
        </p>

        <h2>Non-Returnable Items</h2>
        <ul>
          <li>Items that have been opened or used</li>
          <li>Items damaged by misuse</li>
          <li>Items returned after 30 days</li>
        </ul>

        <h2>How to Return</h2>
        <ol>
          <li>Contact us at {BUSINESS_INFO.email} to initiate a return</li>
          <li>Receive a return authorization number</li>
          <li>Pack items securely in original packaging</li>
          <li>Ship to our returns address</li>
        </ol>

        <h2>Refund Process</h2>
        <p>
          Once we receive and inspect your return, we will process your refund within 5-7 business days. Refunds will be credited to your original payment method.
        </p>

        <h2>Exchanges</h2>
        <p>
          If you need to exchange an item, please return it for a refund and place a new order for the replacement item.
        </p>

        <h2>Damaged or Defective Items</h2>
        <p>
          If you receive a damaged or defective item, contact us immediately. We will arrange for a replacement or refund at no cost to you.
        </p>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="prose prose-slate max-w-none">
        <p className="lead">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li>Name and contact information</li>
          <li>Shipping and billing addresses</li>
          <li>Payment information (processed securely)</li>
          <li>Order history</li>
          <li>Device and browser information</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Communicate about your orders</li>
          <li>Send promotional emails (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Prevent fraud</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share information with service providers who help us operate our business (shipping carriers, payment processors).
        </p>

        <h2>Data Security</h2>
        <p>
          We implement appropriate security measures to protect your information. All payment transactions are encrypted using SSL technology.
        </p>

        <h2>Cookies</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. You can adjust your browser settings to refuse cookies.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related inquiries, contact us at {BUSINESS_INFO.email}.
        </p>
      </div>
    ),
  },
};

const Policies = () => {
  const { policy } = useParams();
  const currentPolicy = policy && policyContent[policy];

  if (!currentPolicy) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Policy not found</h1>
          <Link to="/policies/terms" className="text-primary hover:underline">
            View Terms & Conditions
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{currentPolicy.title}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold mb-4">Policies</h3>
              <ul className="space-y-2">
                {POLICY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        link.href === `/policies/${policy}`
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-3">
            <AnimatedSection>
              {/* Header Info */}
              <div className="bg-surface rounded-xl p-6 mb-8 border border-border">
                <p className="text-sm text-muted-foreground">
                  This site is operated by <strong>{BUSINESS_INFO.name}</strong>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Contact: {BUSINESS_INFO.email} • {BUSINESS_INFO.phone} • {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
                </p>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-8">{currentPolicy.title}</h1>
              {currentPolicy.content}

              <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
                <p>Last updated: January 2026</p>
                <p className="mt-2">
                  Questions? Contact us at{" "}
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary hover:underline">
                    {BUSINESS_INFO.email}
                  </a>
                </p>
              </div>
            </AnimatedSection>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Policies;
