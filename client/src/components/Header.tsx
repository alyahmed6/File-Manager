import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useHeaderVisibility } from "@/hooks/useHeaderVisibility";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Course", href: "/course" },
  { label: "About Us", href: "/about-us" },
];

export default function Header() {
  const [location, navigate] = useLocation();
  const isHeaderVisible = useHeaderVisibility();

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
      <div className="container mx-auto relative flex h-14 md:h-16 items-center justify-between gap-4 px-4">
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
          <span
            className="text-sm font-bold leading-tight text-foreground"
            data-testid="text-brand-name-mobile"
          >
            The Blockchain Pulse
          </span>
        </button>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
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

        <a
          href="https://forms.gle/DMo848mtY8u2UbC1A"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-shrink-0"
        >
          <Button
            size="sm"
            className="h-8 whitespace-nowrap px-2.5 text-xs bg-accent hover:bg-accent/90 text-accent-foreground border border-accent md:h-9 md:px-4 md:text-sm"
            data-testid="button-header-register"
          >
            Get Early Access
          </Button>
        </a>
      </div>

      <nav
        className="md:hidden border-t border-border/50 bg-background/80 backdrop-blur-sm"
        data-testid="mobile-menu-bar"
      >
        <div className="container mx-auto flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item.href);
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={`flex-1 py-1.5 text-center text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-mobile-menu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}