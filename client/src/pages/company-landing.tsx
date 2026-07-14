import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Boxes,
  BrainCircuit,
  CandlestickChart,
  Layers,
  Tag,
  Scale,
  BarChart2,
  TrendingUp,
  Users,
  Target,
  GraduationCap,
  Rocket,
  Wifi,
  Search,
  BookOpen,
  Box,
  DollarSign,
  Megaphone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { SiEthereum, SiBitcoin } from "react-icons/si";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import qasimPhoto from "@assets/QAsim_1780246728761.jpeg";
import salmanPhoto from "@assets/Screenshot_2026-05-31_220657_1780247305242.png";

/* ─── DATA ──────────────────────────────────────────────────────────── */

const moduleColors = [
  "#3bb5e8",
  "#8b5cf6",
  "#f59e0b",
  "#06b6d4",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
  "#f43f5e",
];

const roadmapModules = [
  { title: "Blockchain Fundamentals", desc: "Distributed ledgers, consensus mechanisms, and how blockchains work", Icon: Boxes, duration: "~1h" },
  { title: "Ethereum & Smart Contracts", desc: "Accounts, gas, the EVM, and Ethereum's core architecture", Icon: SiEthereum, duration: "~1h" },
  { title: "Bitcoin", desc: "Satoshi, history, core architecture and future", Icon: SiBitcoin, duration: "~1h" },
  { title: "DeFi & Layer 2s", desc: "Protocols, liquidity pools, and blockchain scaling solutions", Icon: Layers, duration: "~1h" },
  { title: "Tokenization", desc: "Asset digitization and real-world use cases", Icon: Tag, duration: "~1h" },
  { title: "AI in Blockchains", desc: "Integrating machine learning with on-chain data and systems", Icon: BrainCircuit, duration: "~1h" },
  { title: "Stablecoins", desc: "Mechanisms, risks, and the evolving stablecoin landscape", Icon: Scale, duration: "~1h" },
  { title: "Exchange Tutorials", desc: "CEX vs DEX, trading mechanics, and navigating order books", Icon: CandlestickChart, duration: "~1h" },
];

const testimonials = [
  {
    initials: "SA",
    photo: salmanPhoto,
    name: "Salman Ali",
    role: "Freelancer",
    comment: "The incubation environment helped me grow from a beginner freelancer into a professional service provider.",
  },
  {
    initials: "MH",
    name: "Matloob Hussain",
    role: "Startup Founder",
    comment: "The Blockchain Pulse delivered excellent environment and services with great professionalism and communication.",
  },
  {
    initials: "QA",
    photo: qasimPhoto,
    name: "Qasim Ali",
    role: "Bookkeeper & Financial Assistant",
    comment: "Professional environment, reliable support, and excellent communication throughout the work.",
  },
];

const incubationItems = [
  { label: "Freelancer Growth", Icon: TrendingUp },
  { label: "Mentorship & Guidance", Icon: Users },
  { label: "Supportive Freelancer Ecosystem", Icon: Users },
  { label: "Growth-Focused Environment", Icon: Target },
  { label: "Skill Development", Icon: GraduationCap },
  { label: "Startup Support", Icon: Rocket },
  { label: "Reliable Power & High-Speed Internet", Icon: Wifi },
];

const blockchainItems = [
  { label: "In-Depth Analysis for Web3 Projects", Icon: Search },
  { label: "Discord Moderation", Icon: MessageSquare },
  { label: "Web3 Education", Icon: BookOpen },
  { label: "Blockchain Consulting", Icon: Box },
  { label: "Crypto Research", Icon: BarChart2 },
  { label: "Crypto Finance", Icon: DollarSign },
  { label: "Research/News Updates on Socials", Icon: Megaphone },
];

/* ─── FADE IN ───────────────────────────────────────────────────────── */

function FadeIn({ children, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}

/* ─── SECTION LABEL ─────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-8" style={{ background: "rgba(59,181,232,0.5)" }} />
      <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "#3bb5e8" }}>
        {children}
      </p>
      <div className="h-px w-8" style={{ background: "rgba(59,181,232,0.5)" }} />
    </div>
  );
}

/* ─── SERVICES GRID ─────────────────────────────────────────────────── */

function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-6">
      {/* Left: Incubation */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="h-full hover-elevate transition-all duration-300 border-primary/40 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
              <h3 className="text-xl font-bold text-foreground" data-testid="text-incubation-heading">
                Incubation Services &
              </h3>
              <h3 className="text-xl font-bold text-foreground" data-testid="text-incubation-heading">
                Co-Working Space
              </h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
              We support freelancers, individuals, and startups through mentorship, skill development, collaboration, and real-world opportunities.
            </p>
            <ul className="space-y-3">
              {incubationItems.map(({ label, Icon }) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="flex items-center gap-3 text-sm group cursor-default"
                  data-testid={`item-incubation-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="flex-1 transition-colors group-hover:text-foreground text-muted-foreground">
                    {label}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-primary/60" />
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right: Blockchain */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <Card className="h-full hover-elevate transition-all duration-300 border-accent/40 bg-gradient-to-br from-background to-accent/5">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/15 border border-accent/30">
                <svg className="h-6 w-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground" data-testid="text-blockchain-heading">
                Blockchain & Web3 Solutions
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
              We provide blockchain development and Web3 technical solutions for startups, businesses, and digital products.
            </p>
            <ul className="space-y-3">
              {blockchainItems.map(({ label, Icon }) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="flex items-center gap-3 text-sm group cursor-default"
                  data-testid={`item-blockchain-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="flex-1 transition-colors group-hover:text-foreground text-muted-foreground">
                    {label}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent/60" />
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

/* ─── ROADMAP GRID ──────────────────────────────────────────────────── */

function RoadmapGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 max-w-3xl mx-auto">
      {roadmapModules.map(({ title, desc, Icon, duration }, index) => {
        const color = moduleColors[index % moduleColors.length];
        return (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
            data-testid={`roadmap-item-${index + 1}`}
          >
            <Card className="h-full bg-card/50 border border-border/50 hover-elevate transition-all duration-300">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: `rgba(${hexToRgb(color)},0.12)`,
                      border: `1px solid rgba(${hexToRgb(color)},0.35)`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-[13px] text-foreground">
                        {title}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                        <Clock className="h-2.5 w-2.5" />
                        <span>{duration}</span>
                      </div>
                    </div>
                    <p className="hidden sm:block text-xs leading-snug text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

/* helper */
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────── */

export default function CompanyLanding() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prev = () => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveTestimonial((p) => (p + 1) % testimonials.length);

  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollSnapType = "y mandatory";

    const DURATION = 1400;
    let animating = false;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateTo = (target: number) => {
      const start = window.scrollY;
      const distance = target - start;
      if (Math.abs(distance) < 2) return;
      animating = true;
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / DURATION, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
        else setTimeout(() => (animating = false), 50);
      };
      requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 4) return;
      e.preventDefault();
      if (animating) return;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(".snap-start")
      );
      if (!sections.length) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const currentTop = window.scrollY;
      const tops = sections.map((s) => s.getBoundingClientRect().top + currentTop);

      let currentIndex = 0;
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= currentTop + 10) currentIndex = i;
      }

      const targetIndex = Math.min(
        Math.max(currentIndex + dir, 0),
        tops.length - 1
      );
      if (targetIndex === currentIndex) return;
      animateTo(tops[targetIndex]);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      root.style.scrollSnapType = "";
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 3 }}>
        <Header />
        <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden pt-16 pb-10 md:pt-24 md:pb-12 min-h-[100dvh] flex items-center snap-start snap-always"
          data-testid="section-course-showcase"
        >
          <div className="absolute inset-0 bg-black/10" />

          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-col items-center gap-8 text-center">

              <h1
                className="max-w-5xl text-4xl font-extrabold tracking-tight leading-tight md:text-6xl lg:text-7xl rounded-2xl bg-black/30 px-5 py-3 shadow-2xl ring-1 ring-white/10"
                data-testid="text-hero-heading"
              >
                <span className="bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">The Blockchain Pulse</span>
              </h1>

              <div
                className="flex w-full max-w-3xl items-center justify-center gap-3"
                data-testid="text-hero-tagline"
              >
                <div className="h-px w-8 shrink-0 bg-primary/50 md:w-12" />
                <p className="text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.18em] text-white/70 sm:text-xs md:text-sm md:tracking-[0.22em] lg:text-base">
                  Incubating talent · Delivering world-class · freelance solutions
                </p>
                <div className="h-px w-8 shrink-0 bg-primary/50 md:w-12" />
              </div>

            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────── */}
        <section
          className="relative bg-card/85 min-h-[100dvh] flex flex-col justify-center py-10 md:py-12 snap-start snap-always"
          data-testid="section-services"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <FadeIn className="text-center mb-4 md:mb-6">
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground" data-testid="text-services-heading">
                Our Services
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "#64748b" }}>
                Empowering freelancers and businesses with the right environment, skills, and blockchain solutions to grow in the digital future.
              </p>
            </FadeIn>
            <ServicesGrid />
          </div>
        </section>

        {/* ── WEB3 COURSE ──────────────────────────────────────────── */}
        <section
          className="relative bg-background/85 min-h-[100dvh] flex flex-col justify-center py-10 md:py-12 snap-start snap-always"
          data-testid="section-course-showcase"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              className="text-center mb-4 md:mb-6"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionLabel>Upcoming Program</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground" data-testid="text-course-showcase-heading">
                Web3 & Blockchain Program
              </h2>
              <p className="text-base max-w-xl mx-auto mb-5" style={{ color: "#64748b" }}>
                Learn blockchain fundamentals, Bitcoin architecture, Ethereum architecture, smart contracts and more.
              </p>
            </motion.div>

            <RoadmapGrid />

            {/* CTA banner */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <div
                className="flex items-center gap-4 rounded-2xl px-6 py-4 max-w-3xl mx-auto"
                style={{
                  background: "rgba(59,181,232,0.07)",
                  border: "1px solid rgba(59,181,232,0.18)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(59,181,232,0.12)" }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: "#3bb5e8" }} />
                </div>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  From fundamentals to advanced concepts —{" "}
                  <span style={{ color: "#3bb5e8" }}>your complete journey into Web3 starts here.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
        <section
          className="relative bg-card/85 min-h-[100dvh] flex flex-col justify-center py-10 md:py-12 snap-start snap-always"
          data-testid="section-testimonials"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <FadeIn className="text-center mb-8 md:mb-12">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground" data-testid="text-testimonials-heading">
                What People Say About Us
              </h2>
            </FadeIn>

            {/* Carousel wrapper */}
            <div className="relative flex items-center gap-3">
              {/* Left arrow */}
              <button
                onClick={prev}
                className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center border border-primary/30 bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                data-testid="button-testimonial-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Cards */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                {testimonials.map((t, i) => {
                  const color = "#3bb5e8";
                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-primary/20 bg-card p-6 flex flex-col gap-3 shadow-sm transition-all duration-300 hover-elevate"
                      data-testid={`testimonial-card-${i}`}
                    >
                      <div className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        Client Review
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5" data-testid={`stars-${i}`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <svg key={s} className="w-4 h-4" viewBox="0 0 24 24" fill="#f59e0b">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>

                      {/* Comment */}
                      <p
                        className="text-sm leading-relaxed flex-1"
                        style={{ color: "#64748b" }}
                        data-testid={`testimonial-text-${i}`}
                      >
                        {t.comment}"
                      </p>

                      {/* Separator */}
                      <div className="h-px w-full bg-primary/20" />

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        {(t as any).photo ? (
                          <img
                            src={(t as any).photo}
                            alt={t.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2"
                            style={{ borderColor: color }}
                            data-testid={`testimonial-avatar-${i}`}
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border border-primary/30"
                            style={{
                              background: "rgba(59,181,232,0.12)",
                              color,
                            }}
                            data-testid={`testimonial-avatar-${i}`}
                          >
                            {t.initials}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-foreground" data-testid={`testimonial-name-${i}`}>
                            {t.name}
                          </p>
                          <p className="text-xs" style={{ color }} data-testid={`testimonial-role-${i}`}>
                            {t.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right arrow */}
              <button
                onClick={next}
                className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center border border-primary/30 bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                data-testid="button-testimonial-next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className="transition-all duration-300"
                    style={{
                      width: activeTestimonial === i ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: activeTestimonial === i ? "#3bb5e8" : "rgba(59,181,232,0.25)",
                    }}
                    data-testid={`dot-testimonial-${i}`}
                  />
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="snap-start snap-always">
        <Footer />
      </div>
    </div>
    </div>
  );
}
