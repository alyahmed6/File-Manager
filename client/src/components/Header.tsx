import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useHeaderVisibility } from "@/hooks/useHeaderVisibility";

const navItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Overview", href: "#course" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHeaderVisible = useHeaderVisibility();

  const handleNavigation = (href: string) => {
    if (href.startsWith("/")) {
      // Internal page link
      window.location.href = href;
      return;
    }
    if (location !== "/" && href.startsWith("#")) {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-gradient-to-br from-primary/10 via-background to-accent/5 transition-transform duration-300 ease-out"
      style={{
        transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
      }}
      data-testid="header-sticky"
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <button 
          onClick={() => {
            if (location === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              window.location.href = "/";
            }
          }}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          data-testid="button-logo-home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight" data-testid="text-brand-name">The Blockchain Pulse</span>
            <span className="hidden md:block text-xs text-muted-foreground leading-tight">Bridging Financial Intelligence</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="https://forms.gle/DMo848mtY8u2UbC1A" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="md:h-9 md:px-4" data-testid="button-header-register">Get Early Access</Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className="text-sm font-medium text-muted-foreground py-2 text-left hover:text-foreground"
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
