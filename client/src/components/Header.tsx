import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useHeaderVisibility } from "@/hooks/useHeaderVisibility";

const navItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Overview", href: "#course" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHeaderVisible = useHeaderVisibility();
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const isOutsideTrigger = triggerRef.current && !triggerRef.current.contains(target);
      const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);
      
      if (isOutsideTrigger && isOutsideMenu) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      closeMenu();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen, closeMenu]);

  const handleNavigation = (href: string) => {
    closeMenu();
    
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    
    if (location !== "/" && href.startsWith("#")) {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
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
                navigate("/");
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
              <Button size="sm" className="md:h-9 md:px-4 bg-accent hover:bg-accent/90 text-accent-foreground border border-accent" data-testid="button-header-register">Get Early Access</Button>
            </a>
            <Button
              ref={triggerRef}
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div 
          ref={menuRef}
          className="fixed top-16 left-0 right-0 z-[9999] md:hidden bg-card border-b border-border shadow-xl"
          data-testid="mobile-menu-panel"
        >
          <nav className="container mx-auto px-6 py-5 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className="text-base font-medium text-foreground py-3 text-left hover:text-primary transition-colors"
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
