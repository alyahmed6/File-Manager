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
              className="text-sm font-bold leading-tight"
              style={isHome ? { color: "#e2e8f0" } : undefined}
              data-testid="text-brand-name"
            >
              The Blockchain Pulse
            </span>
          </div>
        </button>

        {/* Mobile inline nav */}
        <nav className="flex md:hidden items-center gap-1">
          {navItems.map((item) => {
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
                  borderBottom: isActive
                    ? `2px solid ${isHome ? "#3bb5e8" : "hsl(var(--primary))"}`
                    : undefined,
                }}
                data-testid={`link-mobile-inline-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop nav */}
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
                style={isHome ? { color: isActive ? "#ffffff" : "rgba(148,163,184,0.9)" } : undefined}
                onMouseEnter={isHome ? (e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; } : undefined}
                onMouseLeave={isHome ? (e) => { (e.currentTarget as HTMLButtonElement).style.color = isActive ? "#ffffff" : "rgba(148,163,184,0.9)"; } : undefined}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTA — spacer keeps nav centred on home page */}
        {isHome ? (
          <div className="hidden md:block w-[130px]" />
        ) : (
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
        )}
      </div>
    </header>
  );
}
