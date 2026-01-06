import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const checkFaqVisibility = useCallback(() => {
    const faqSection = document.getElementById("faq");
    if (!faqSection) {
      setIsVisible(false);
      return false;
    }
    
    const rect = faqSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if FAQ section is in viewport or above it (user scrolled past)
    const isInView = rect.top < windowHeight && rect.bottom > 0;
    setIsVisible(isInView);
    return true;
  }, []);

  useEffect(() => {
    // Initial check
    checkFaqVisibility();
    
    // Check on scroll
    const handleScroll = () => {
      checkFaqVisibility();
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Also check periodically in case the DOM changes (page navigation)
    const interval = setInterval(() => {
      checkFaqVisibility();
    }, 500);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [checkFaqVisibility]);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: prefersReducedMotion ? "auto" : "smooth" 
    });
  };

  return (
    <Button
      size="icon"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-accent-foreground border border-accent shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
      data-testid="button-back-to-top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
