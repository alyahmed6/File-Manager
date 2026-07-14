import { useState, useEffect } from "react";

export function useHeaderVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const getThreshold = () => {
      const heroSection = document.querySelector("main section");
      if (heroSection) {
        return (heroSection as HTMLElement).offsetHeight;
      }
      return window.innerHeight;
    };

    const handleScroll = () => {
      setIsVisible(window.scrollY < getThreshold());
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return isVisible;
}
