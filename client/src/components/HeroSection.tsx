import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Users, Clock, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYmI1ZTgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhoLTEydjJoMTJ6bTAtNFYyNGgtMTJ2Mmgxem0wLTRWMjBoLTEydjJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Course Launching Soon
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" data-testid="text-hero-heading">
              Master Crypto &{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Blockchain
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-semibold text-foreground" data-testid="text-hero-subheading">
              From zero to confident in 8 weeks
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0" data-testid="text-hero-description">
              Learn how crypto actually works — Bitcoin, Ethereum, wallets, exchanges, and real-world use cases, explained simply for beginners.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground border border-accent" data-testid="button-hero-cta">
                  Get Early Access
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>2 Months Duration</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>Discord Community</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                <span>Certification Included</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg">
            <div className="relative rounded-xl overflow-hidden bg-card border border-border shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYmI1ZTgiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMjAgMjBjMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMC0xMC00LjQ3Ny0xMC0xMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
                <button 
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
                  data-testid="button-play-video"
                  onClick={() => console.log("Video play triggered")}
                >
                  <Play className="h-6 w-6 ml-1" fill="currentColor" />
                </button>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm font-medium">How to Register</p>
                <p className="text-xs text-muted-foreground">Watch this 2-minute guide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
