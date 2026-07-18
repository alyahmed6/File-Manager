import { useState, useEffect } from "react";

export function useHeaderVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const getThreshold = () => {
      const heroSection = document.querySelector<HTMLElement>("main section");
      if (heroSection) {
        return heroSection.offsetTop + heroSection.offsetHeight;
      }
      return window.innerHeight * 2;
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
