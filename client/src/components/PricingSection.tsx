import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Get notified when applications open",
  "Unlock early-bird discounted pricing",
  "Full course access (10 modules)",
  "Step-by-step downloadable videos",
  "Community access & live support",
  "Certificate of completion",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-pricing-heading">
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Invest in your future. Be the First to Learn Crypto the Right Way.
          </p>
        </div>

        <div className="text-center mb-10">
          <p className="text-2xl md:text-3xl font-semibold text-primary" data-testid="text-pricing-coming-soon">
            Pricing Coming Soon
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <p className="text-center text-muted-foreground mb-6">
            Join the early access waitlist to:
          </p>
          
          <div className="space-y-3 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3" data-testid={`text-benefit-${index}`}>
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm md:text-base">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/register">
              <Button 
                className="bg-accent hover:bg-accent/90 text-accent-foreground border border-accent" 
                size="lg" 
                data-testid="button-pricing-cta"
              >
                Join the Early Access Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
