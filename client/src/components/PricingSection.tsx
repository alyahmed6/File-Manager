import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Download, Users, Award, Video, BookOpen, Clock, MessageCircle } from "lucide-react";

const features = [
  { icon: BookOpen, text: "10 Comprehensive Modules" },
  { icon: Video, text: "10 Video Lessons" },
  { icon: Download, text: "Downloadable Videos via Discord" },
  { icon: Users, text: "Discord Community Access" },
  { icon: Award, text: "Certificate of Completion" },
  { icon: Clock, text: "2 Months Flexible Learning" },
  { icon: MessageCircle, text: "Community Support" },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-pricing-heading">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Invest in your future with our comprehensive blockchain education program.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <Card className="relative overflow-visible border-primary/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-accent text-accent-foreground px-4 py-1.5 text-sm font-semibold gap-1">
                <Sparkles className="h-4 w-4" />
                30% Early Bird Discount
              </Badge>
            </div>
            
            <CardHeader className="pt-10 pb-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Complete Course Access</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl text-muted-foreground line-through">PKR 10,000</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">PKR 7,000</span>
                  </div>
                </div>
                
                <div className="text-muted-foreground">or</div>
                
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl text-muted-foreground line-through">35 USDT</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">25 USDT</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-accent mt-2 font-medium">Early bird discount valid for 1 month only</p>
            </CardHeader>
            
            <CardContent className="pb-8">
              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/register">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border border-accent" size="lg" data-testid="button-pricing-register">
                  Get Early Access Now
                </Button>
              </Link>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Secure payment via PKR bank transfer or cryptocurrency
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
