import { Link, useLocation } from "wouter";
import { SiDiscord, SiInstagram, SiLinkedin, SiFacebook } from "react-icons/si";
import { Shield } from "lucide-react";

const socialLinks = [
  { icon: SiFacebook, href: "#", label: "Facebook" },
  { icon: SiInstagram, href: "https://www.instagram.com/theblockchainpulse/", label: "Instagram" },
  { icon: "X", href: "https://x.com/theblockchainpulse", label: "X (Twitter)" },
  { icon: SiLinkedin, href: "#", label: "LinkedIn" },
  { icon: SiDiscord, href: "#", label: "Discord" },
];

export default function Footer() {
  const [location] = useLocation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity text-left"
              data-testid="button-footer-logo-home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight">The Blockchain Pulse</span>
                <span className="text-xs text-muted-foreground leading-tight">Bridging Financial Intelligence With Blockchain</span>
              </div>
            </button>
            <p className="text-sm text-muted-foreground">
              Empowering the next generation of blockchain enthusiasts with comprehensive, practical education.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Course</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button onClick={() => scrollToSection("#overview")} className="hover:text-foreground transition-colors" data-testid="link-footer-overview">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("#curriculum")} className="hover:text-foreground transition-colors" data-testid="link-footer-curriculum">
                  Curriculum
                </button>
              </li>
              <li>
                <a href="https://forms.gle/DMo848mtY8u2UbC1A" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" data-testid="link-footer-register">
                  Register
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection("#faq")} className="hover:text-foreground transition-colors" data-testid="link-footer-faq">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:support@theblockchainpulse.org" className="hover:text-foreground transition-colors" data-testid="link-footer-help">
                  Help Center
                </a>
              </li>
              <li>
                <a href="https://x.com/theblockchainpulse" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" data-testid="link-footer-contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-foreground transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground hover:bg-accent/80 transition-colors"
                  data-testid={`link-social-${social.label.toLowerCase().replace(/[^a-z]/g, "")}`}
                >
                  {social.icon === "X" ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ) : (
                    <social.icon className="h-4 w-4" />
                  )}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-sm text-muted-foreground">
            <p>&copy; 2025 The Blockchain Pulse. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Secure Learning Platform</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
