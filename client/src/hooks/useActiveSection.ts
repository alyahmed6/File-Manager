import { useState, useEffect } from "react";

const sectionIds = ["course", "curriculum", "pricing", "faq"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const headerHeight = 64;
    const offset = headerHeight + 100;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      // Check if we're near the top of the page
      if (window.scrollY < 200) {
        setActiveSection(null);
        return;
      }

      // Find the current section
      let currentSection: string | null = null;
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // If no section found but we're past the hero, check if we're above first section
      if (!currentSection && window.scrollY >= 200) {
        const firstSection = document.getElementById(sectionIds[0]);
        if (firstSection) {
          const rect = firstSection.getBoundingClientRect();
          if (rect.top + window.scrollY > scrollPosition) {
            currentSection = null;
          } else {
            // We're past all sections, highlight the last one
            currentSection = sectionIds[sectionIds.length - 1];
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}
