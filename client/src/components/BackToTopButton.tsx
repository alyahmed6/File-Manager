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
    let observer: IntersectionObserver | null = null;
    
    const setupObserver = () => {
      const faqSection = document.getElementById("faq");
      if (!faqSection) {
        setIsVisible(false);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting || entry.boundingClientRect.top < 0);
        },
        { 
          threshold: 0,
          rootMargin: "0px 0px 0px 0px"
        }
      );

      observer.observe(faqSection);
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(setupObserver, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
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
      className={`fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-accent-foreground border border-accent shadow-lg ${
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
