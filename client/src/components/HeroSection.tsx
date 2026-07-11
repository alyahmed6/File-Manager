import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import { useState } from "react";
import { MobileScrollReveal } from "@/components/MobileScrollReveal";

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    "Downloadable videos",
    "Live Q&A",
    "Certification included",
    "10 easy modules"
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 md:pt-6 md:pb-20 min-h-[calc(100vh-60px)] md:min-h-0 flex flex-col justify-start pt-[70px] pb-[70px]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYmI1ZTgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhoLTEydjJoMTJ6bTAtNFYyNGgtMTJ2Mmgxem0wLTRWMjBoLTEydjJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
      <div className="container mx-auto px-4">
        <MobileScrollReveal className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Course Launching Soon
          </div>

          {isLoading ? (
            <div className="space-y-4 w-full max-w-3xl">
              <Skeleton className="h-20 w-3/4 mx-auto" />
              <Skeleton className="h-8 w-2/3 mx-auto" />
            </div>
          ) : (
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              data-testid="text-hero-heading"
            >
              Master Crypto &<br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blockchain (Web3)
              </span>
            </h1>
          )}

          <h2
            className="text-xl md:text-2xl font-semibold text-foreground"
            data-testid="text-hero-subheading"
          >
            From zero to confident in 8 weeks
          </h2>

          {/* Pill-style topic tags — 2 columns on all screen sizes */}
          <div className="w-full max-w-xs mx-auto">
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {["Bitcoin", "Ethereum", "Wallets", "Stable Coins", "Tokenization", "AI", "DeFi", "Exchanges"].map((topic) => (
                <div
                  key={topic}
                  className="rounded-full py-2 px-3 flex items-center justify-center text-sm font-medium bg-gradient-to-br from-primary/25 via-primary/20 to-accent/25 text-foreground border border-primary/20 shadow-sm"
                  data-testid={`pill-topic-${topic.toLowerCase()}`}
                >
                  {topic}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">and more</p>
            <p className="text-center text-sm text-muted-foreground/80 mt-1">Simplified for beginners</p>
          </div>

          <div className="flex flex-col items-center pt-2">
            <a href="https://forms.gle/DMo848mtY8u2UbC1A" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground border border-accent"
                data-testid="button-hero-cta"
              >
                Get Early Access
              </Button>
            </a>
            <span className="text-xs text-muted-foreground mt-2">No payment required</span>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 max-w-md mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground justify-start">
                <Check className="h-4 w-4 text-[#22c55e] shrink-0" strokeWidth={3} />
                <span className="text-left whitespace-nowrap">{feature}</span>
              </div>
            ))}
          </div>
        </MobileScrollReveal>
      </div>
    </section>
  );
}
