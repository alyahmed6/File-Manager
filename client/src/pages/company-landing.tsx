import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    const COUNT = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 181, 232, ${p.alpha})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 181, 232, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const LAUNCH_DATE = new Date("2026-09-15T00:00:00");

const roadmapItems = [
  "Blockchain Fundamentals",
  "Ethereum Basics",
  "Smart Contracts & Solidity",
  "DeFi & Layer 2s",
  "Nodes & Validators",
  "Web3 Development",
  "Tokenomics",
  "Real Projects",
];

const testimonials = [
  {
    initials: "AR",
    name: "Ahmed R.",
    role: "Freelancer",
    comment: "The incubation environment helped me grow from a beginner freelancer into a professional service provider.",
  },
  {
    initials: "SM",
    name: "Sara M.",
    role: "Startup Founder",
    comment: "The Blockchain Pulse delivered excellent blockchain solutions with great professionalism and communication.",
  },
  {
    initials: "KA",
    name: "Khalid A.",
    role: "Web3 Developer",
    comment: "The Web3 course made complex blockchain concepts easy to understand and practical to apply.",
  },
];

const incubationItems = ["Freelancer Growth", "Mentorship & Guidance", "Skill Development", "Startup Support", "Real Project Opportunities"];
const blockchainItems = ["Smart Contract Development", "DApp Development", "Web3 Integrations", "Blockchain Consulting", "Crypto Research"];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function CompanyLanding() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#04060e", color: "#e2e8f0" }}>
      <Header />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden flex flex-col items-center justify-center min-h-[100svh] text-center px-4">
          <ParticleCanvas />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(59,181,232,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium mb-2"
              style={{ background: "rgba(59,181,232,0.10)", border: "1px solid rgba(59,181,232,0.25)", color: "#3bb5e8" }}
              data-testid="badge-hero-company"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#3bb5e8" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#3bb5e8" }} />
              </span>
              SECP-Registered · Pakistan
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #a8d8ea 50%, #3bb5e8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animationFillMode: "both",
              }}
              data-testid="text-company-hero-heading"
            >
              The Blockchain Pulse
            </h1>

            <p
              className="text-xl md:text-2xl font-light"
              style={{ color: "#94a3b8" }}
              data-testid="text-company-hero-subheading"
            >
              Incubating talent, delivering world class freelance solutions
            </p>

            <p
              className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "#64748b" }}
              data-testid="text-company-hero-body"
            >
              We help freelancers, startups, and digital talent grow through incubation services while also delivering professional blockchain and Web3 solutions.
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-px h-10 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(59,181,232,0.6), transparent)" }} />
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-28 px-4" style={{ background: "#080e1a" }} data-testid="section-services">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#3bb5e8" }}>What We Do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-services-heading">Our Services</h2>
              <div className="w-12 h-px mx-auto mt-4" style={{ background: "linear-gradient(to right, transparent, #3bb5e8, transparent)" }} />
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Incubation */}
              <FadeIn delay={0.1} className="pr-0 md:pr-12 pb-12 md:pb-0">
                <div className="mb-5">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,181,232,0.12)", border: "1px solid rgba(59,181,232,0.2)" }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#3bb5e8" strokeWidth="1.8">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white" data-testid="text-incubation-heading">Incubation Services</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
                    We support freelancers, individuals, and startups through mentorship, skill development, collaboration, and real-world opportunities.
                  </p>
                </div>
                <ul className="space-y-3">
                  {incubationItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm group cursor-default"
                      data-testid={`item-incubation-${item.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-150" style={{ background: "#3bb5e8" }} />
                      <span className="transition-colors group-hover:text-white" style={{ color: "#94a3b8" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              {/* Divider */}
              <div className="hidden md:block absolute left-1/2 -translate-x-px" style={{ width: "1px", top: "auto", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(59,181,232,0.3), transparent)" }} />
              <div className="md:hidden h-px w-full my-8" style={{ background: "linear-gradient(to right, transparent, rgba(59,181,232,0.3), transparent)" }} />

              {/* Right: Blockchain */}
              <FadeIn delay={0.2} className="pl-0 md:pl-12">
                <div className="mb-5">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,181,232,0.12)", border: "1px solid rgba(59,181,232,0.2)" }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#3bb5e8" strokeWidth="1.8">
                        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white" data-testid="text-blockchain-heading">Blockchain & Web3 Solutions</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
                    We provide blockchain development and Web3 technical solutions for startups, businesses, and digital products.
                  </p>
                </div>
                <ul className="space-y-3">
                  {blockchainItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm group cursor-default"
                      data-testid={`item-blockchain-${item.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-150" style={{ background: "#3bb5e8" }} />
                      <span className="transition-colors group-hover:text-white" style={{ color: "#94a3b8" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── WEB3 COURSE ── */}
        <section className="py-28 px-4" style={{ background: "#04060e" }} data-testid="section-course-showcase">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#3bb5e8" }}>Upcoming Program</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-course-showcase-heading">
                Upcoming Web3 & Blockchain Program
              </h2>
              <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "#64748b" }}>
                Learn blockchain fundamentals, Ethereum architecture, smart contracts, and real-world Web3 development.
              </p>
              <div className="w-12 h-px mx-auto mt-4" style={{ background: "linear-gradient(to right, transparent, #3bb5e8, transparent)" }} />
            </FadeIn>

            {/* Countdown */}
            <FadeIn delay={0.1} className="mb-16">
              <p className="text-center text-xs font-medium tracking-widest uppercase mb-5" style={{ color: "#475569" }}>
                Program launches in
              </p>
              <div className="flex items-center justify-center gap-3 md:gap-6" data-testid="countdown-timer">
                {[
                  { value: days, label: "Days" },
                  { value: hours, label: "Hours" },
                  { value: minutes, label: "Min" },
                  { value: seconds, label: "Sec" },
                ].map(({ value, label }, i) => (
                  <div key={label} className="flex items-center gap-3 md:gap-6">
                    <div className="flex flex-col items-center" data-testid={`countdown-${label.toLowerCase()}`}>
                      <div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold text-white font-mono"
                        style={{
                          background: "rgba(59,181,232,0.07)",
                          border: "1px solid rgba(59,181,232,0.2)",
                          boxShadow: "0 0 20px rgba(59,181,232,0.05)",
                        }}
                      >
                        {String(value).padStart(2, "0")}
                      </div>
                      <span className="text-xs mt-2 font-medium" style={{ color: "#475569" }}>{label}</span>
                    </div>
                    {i < 3 && <span className="text-2xl font-light mb-4" style={{ color: "rgba(59,181,232,0.4)" }}>:</span>}
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Roadmap */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {roadmapItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl px-5 py-4 group transition-all duration-300 cursor-default"
                    style={{
                      background: "rgba(59,181,232,0.04)",
                      border: "1px solid rgba(59,181,232,0.10)",
                    }}
                    data-testid={`roadmap-item-${index + 1}`}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: "rgba(59,181,232,0.12)", color: "#3bb5e8", border: "1px solid rgba(59,181,232,0.25)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-28 px-4" style={{ background: "#080e1a" }} data-testid="section-testimonials">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#3bb5e8" }}>Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-testimonials-heading">
                What People Say About Us
              </h2>
              <div className="w-12 h-px mx-auto mt-4" style={{ background: "linear-gradient(to right, transparent, #3bb5e8, transparent)" }} />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div
                    className="rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-300 group"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(59,181,232,0.1)",
                    }}
                    data-testid={`testimonial-card-${i}`}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5" data-testid={`stars-${i}`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} className="w-4 h-4" viewBox="0 0 24 24" fill="#f59e0b">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "#94a3b8" }} data-testid={`testimonial-text-${i}`}>
                      "{t.comment}"
                    </p>

                    {/* Thin separator */}
                    <div className="h-px w-full" style={{ background: "rgba(59,181,232,0.08)" }} />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: "rgba(59,181,232,0.12)", color: "#3bb5e8", border: "1px solid rgba(59,181,232,0.2)" }}
                        data-testid={`testimonial-avatar-${i}`}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white" data-testid={`testimonial-name-${i}`}>{t.name}</p>
                        <p className="text-xs" style={{ color: "#475569" }} data-testid={`testimonial-role-${i}`}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
