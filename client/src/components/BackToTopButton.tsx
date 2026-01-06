import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
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

  useEffect(() => {
    const checkFaqVisibility = () => {
      const faqSection = document.getElementById("faq");
      if (!faqSection) return;

      const rect = faqSection.getBoundingClientRect();
      const headerHeight = 64;
      
      // Show button when FAQ section top is at or above the viewport (accounting for header)
      const faqIsInView = rect.top <= window.innerHeight - headerHeight;
      
      setIsVisible(faqIsInView);
    };

    checkFaqVisibility();
    window.addEventListener("scroll", checkFaqVisibility, { passive: true });
    window.addEventListener("resize", checkFaqVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkFaqVisibility);
      window.removeEventListener("resize", checkFaqVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  };

  return (
    <Button
      size="icon"
      variant="default"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-accent-foreground border border-accent shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        transition: prefersReducedMotion ? "none" : "opacity 300ms ease"
      }}
      aria-label="Scroll to top"
      data-testid="button-back-to-top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
