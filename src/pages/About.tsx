import { Link } from "react-router-dom";
import { Heart, Users, Award, Clock, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BUSINESS_INFO } from "@/lib/constants";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-background py-16 md:py-24">
        <div className="container text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Smart Pet Products</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're passionate about making life better for pets and their owners through innovative smart technology.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-primary font-medium">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Making Pet Care Smarter
              </h2>
              <p className="text-muted-foreground mb-4">
                At Smart Pet Products, we believe every pet deserves the best care possible. That's why we've dedicated ourselves to sourcing and developing the most innovative pet technology on the market.
              </p>
              <p className="text-muted-foreground mb-6">
                From automatic feeders that ensure your pet never misses a meal, to GPS trackers that give you peace of mind, our products are designed with both pets and their owners in mind.
              </p>
              <Button asChild>
                <Link to="/shop">Explore Our Products</Link>
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card rounded-2xl border border-border text-center">
                  <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-2xl mb-1">10K+</h3>
                  <p className="text-sm text-muted-foreground">Happy Pets</p>
                </div>
                <div className="p-6 bg-card rounded-2xl border border-border text-center">
                  <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-2xl mb-1">5K+</h3>
                  <p className="text-sm text-muted-foreground">Customers</p>
                </div>
                <div className="p-6 bg-card rounded-2xl border border-border text-center">
                  <Award className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-2xl mb-1">50+</h3>
                  <p className="text-sm text-muted-foreground">Products</p>
                </div>
                <div className="p-6 bg-card rounded-2xl border border-border text-center">
                  <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-2xl mb-1">24/7</h3>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our commitment to pets and their families
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "We only offer products that meet our rigorous quality standards. Your pet's safety is our priority.",
              },
              {
                title: "Innovation",
                description: "We stay at the forefront of pet technology, constantly seeking new ways to improve pet care.",
              },
              {
                title: "Transparency",
                description: "We believe in honest, open communication. Our policies, contact info, and business details are always available.",
              },
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <div className="p-8 bg-card rounded-2xl border border-border h-full">
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24">
        <div className="container">
          <AnimatedSection>
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-lg font-semibold mb-4">{BUSINESS_INFO.name}</p>
              <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {BUSINESS_INFO.fullAddress}
                </div>
                <a href={`mailto:${BUSINESS_INFO.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  {BUSINESS_INFO.email}
                </a>
                <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
