import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useHeaderVisibility } from "@/hooks/useHeaderVisibility";
import { useActiveSection } from "@/hooks/useActiveSection";

const baseNavItems = [
  { label: "Home", href: "/" },
  { label: "Course", href: "/course" },
  { label: "About Us", href: "/about-us" },
];

const courseNavItems = [
  { label: "Overview", href: "#course" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHeaderVisible = useHeaderVisibility();
  const activeSection = useActiveSection();

  const isOnCourse = location === "/course";

  const navItems = isOnCourse ? [...baseNavItems, ...courseNavItems] : baseNavItems;

  const isNavItemActive = (href: string) => {
    if (href.startsWith("#")) {
      if (!isOnCourse) return false;
      const sectionId = href.slice(1);
      return activeSection === sectionId;
    }
    if (href === "/") return location === "/";
    if (href === "/course") return isOnCourse;
    if (href === "/about-us") return location === "/about-us";
    return false;
  };

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
      if (isOutsideTrigger && isOutsideMenu) closeMenu();
    };

    const handleScroll = () => closeMenu();

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

    if (!isOnCourse && href.startsWith("#")) {
      navigate("/course");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const isHome = location === "/";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-out ${!isHome ? "bg-gradient-to-br from-primary/10 via-background to-accent/5" : ""}`}
        style={{
          transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
          ...(isHome && {
            background: "rgba(4, 6, 14, 0.82)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }),
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
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary flex-shrink-0">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="hidden md:flex flex-col">
                <span
                  className="text-sm font-bold leading-tight"
                  style={isHome ? { color: "#e2e8f0" } : undefined}
                  data-testid="text-brand-name"
                >
                  The Blockchain Pulse
                </span>
              </div>
            </button>

            {/* Mobile-only inline nav links */}
            <nav className="flex md:hidden items-center gap-1">
              {baseNavItems.map((item) => {
                const isActive = isNavItemActive(item.href);
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
                    style={{
                      color: isActive
                        ? isHome ? "#3bb5e8" : "hsl(var(--foreground))"
                        : isHome ? "rgba(148,163,184,0.85)" : "hsl(var(--muted-foreground))",
                      borderBottom: isActive ? `2px solid ${isHome ? "#3bb5e8" : "hsl(var(--primary))"}` : undefined,
                    }}
                    data-testid={`link-mobile-inline-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = isNavItemActive(item.href);
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? isHome
                          ? "border-b-2 border-[#3bb5e8] pb-0.5"
                          : "text-foreground border-b-2 border-primary pb-0.5"
                        : ""
                    }`}
                    style={
                      isHome
                        ? { color: isActive ? "#ffffff" : "rgba(148,163,184,0.9)" }
                        : undefined
                    }
                    onMouseEnter={isHome ? (e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; } : undefined}
                    onMouseLeave={isHome ? (e) => { (e.currentTarget as HTMLButtonElement).style.color = isActive ? "#ffffff" : "rgba(148,163,184,0.9)"; } : undefined}
                    data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {!isHome && (
                <a href="https://forms.gle/DMo848mtY8u2UbC1A" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="md:h-9 md:px-4 bg-accent hover:bg-accent/90 text-accent-foreground border border-accent" data-testid="button-header-register">
                    Get Early Access
                  </Button>
                </a>
              )}
              <Button
                ref={triggerRef}
                variant="ghost"
                size="icon"
                className="md:hidden"
                style={isHome ? { color: "#e2e8f0" } : undefined}
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
          className="fixed top-16 left-0 right-0 z-[9999] md:hidden shadow-xl"
          style={
            isHome
              ? { background: "rgba(4,6,14,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }
              : { background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))" }
          }
          data-testid="mobile-menu-panel"
        >
          <nav className="container mx-auto px-6 py-5 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item.href);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className="text-base font-medium py-3 text-left transition-colors"
                  style={
                    isHome
                      ? { color: isActive ? "#3bb5e8" : "#94a3b8", borderLeft: isActive ? "2px solid #3bb5e8" : undefined, paddingLeft: isActive ? "12px" : undefined }
                      : undefined
                  }
                  data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
