import { Button } from "@/components/ui/button";
import { MobileScrollReveal } from "@/components/MobileScrollReveal";
import { SectionHeadingReveal } from "@/components/SectionHeadingReveal";
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
    <section id="pricing" className="pt-[92px] pb-14 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeadingReveal className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-pricing-heading">
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Invest in your future. Be the First to Learn Crypto the Right Way.
          </p>
        </SectionHeadingReveal>

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
              <MobileScrollReveal key={index} delay={index * 0.08}>
                <div className="flex items-center gap-3" data-testid={`text-benefit-${index}`}>
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22c55e]/10">
                    <Check className="h-3 w-3 text-[#22c55e]" strokeWidth={3} />
                  </div>
                  <span className="text-sm md:text-base">{benefit}</span>
                </div>
              </MobileScrollReveal>
            ))}
          </div>
          
          <div className="flex flex-col items-center">
            <a href="https://forms.gle/DMo848mtY8u2UbC1A" target="_blank" rel="noopener noreferrer">
              <Button 
                className="bg-accent hover:bg-accent/90 text-accent-foreground border border-accent" 
                size="lg" 
                data-testid="button-pricing-cta"
              >
                Join the Early Access Waitlist
              </Button>
            </a>
            <span className="text-xs text-muted-foreground mt-2">No payment required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
