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
    const checkVisibility = () => {
      const faqSection = document.getElementById("faq");
      if (!faqSection) {
        setIsVisible(false);
        return;
      }

      const rect = faqSection.getBoundingClientRect();
      // Show button when FAQ section is visible or has been scrolled past
      const shouldShow = rect.top < window.innerHeight;
      setIsVisible(shouldShow);
    };

    // Check on mount after a brief delay
    const timeoutId = setTimeout(checkVisibility, 200);
    
    // Check on scroll
    window.addEventListener("scroll", checkVisibility, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="default"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-accent-foreground border border-accent shadow-lg"
      aria-label="Scroll to top"
      data-testid="button-back-to-top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
