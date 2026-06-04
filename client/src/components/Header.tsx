import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useHeaderVisibility } from "@/hooks/useHeaderVisibility";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Course", href: "/course" },
  { label: "About Us", href: "/about-us" },
];

export default function Header() {
  const [location, navigate] = useLocation();
  const isHeaderVisible = useHeaderVisibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location === "/";

  const isNavItemActive = (href: string) => {
    if (href === "/") return location === "/";
    if (href === "/course") return location === "/course";
    if (href === "/about-us") return location === "/about-us";
    return false;
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <header
      className="sticky top-0 z-50 w-full transition-transform duration-300 ease-out bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-border/50"
      style={{
        transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
      }}
      data-testid="header-sticky"
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
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
              className="text-sm font-bold leading-tight text-foreground"
              data-testid="text-brand-name"
            >
              The Blockchain Pulse
            </span>
          </div>
        </button>

        {/* Mobile hamburger menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md transition-colors hover:bg-primary/10"
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-muted-foreground" />
          )}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item.href);
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={`text-sm font-medium transition-colors text-muted-foreground hover:text-foreground ${
                  isActive ? "text-foreground border-b-2 border-primary pb-0.5" : ""
                }`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA button */}
        <a
          href="https://forms.gle/DMo848mtY8u2UbC1A"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex"
        >
          <Button
            size="sm"
            className="md:h-9 md:px-4 bg-accent hover:bg-accent/90 text-accent-foreground border border-accent"
            data-testid="button-header-register"
          >
            Get Early Access
          </Button>
        </a>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden border-t border-border/50 flex flex-col gap-1 p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5"
          data-testid="mobile-menu-dropdown"
        >
          {navItems.map((item) => {
            const isActive = isNavItemActive(item.href);
            return (
              <button
                key={item.label}
                onClick={() => {
                  handleNavigation(item.href);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors text-left ${
                  isActive
                    ? "text-foreground bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-mobile-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
