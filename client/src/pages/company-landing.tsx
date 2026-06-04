import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Boxes,
  BrainCircuit,
  CandlestickChart,
  Layers,
  Tag,
  Scale,
  Shield,
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
  ArrowRight,
  Clock,
} from "lucide-react";
import { SiEthereum, SiBitcoin } from "react-icons/si";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRef } from "react";
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
              <h3 className="text-xl font-bold text-foreground" data-testid="text-incubation-heading">
                Incubation Services
              </h3>
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
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
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
              <CardContent className="p-4 md:px-6 md:py-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <div
                    className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: `rgba(${hexToRgb(color)},0.12)`,
                      border: `1px solid rgba(${hexToRgb(color)},0.35)`,
                    }}
                  >
                    <Icon className="h-6 w-6 md:h-7 md:w-7" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-sm md:text-base text-foreground">
                        {title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full shrink-0">
                        <Clock className="h-3 w-3" />
                        <span>{duration}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <main className="flex-1">

        {/* ── HERO SECTION WITH BLOCKCHAIN IMAGE ─────────────────────── */}
        <section
          className="relative overflow-hidden pt-[86px] pb-16 md:pt-24 md:pb-24"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,181,232,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(59,181,232,0.10) 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-accent/10" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/80 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                  <Boxes className="h-3.5 w-3.5 text-primary" />
                  The Blockchain Pulse Academy
                </div>

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Blockchain courses for
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Web3 learners</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                  Learn blockchain fundamentals, Bitcoin, Ethereum, wallets, crypto exchanges, and practical Web3 skills through a clear guided program.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="/course" className="inline-flex">
                    <button className="px-8 py-3 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors border border-accent">
                      Explore Our Course
                    </button>
                  </a>
                  <a href="/about-us" className="inline-flex">
                    <button className="px-8 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-foreground font-semibold transition-colors border border-primary/30">
                      Learn More
                    </button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-xl"
              >
                <div className="relative aspect-[1.18] overflow-hidden rounded-lg border border-primary/20 bg-card shadow-2xl">
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(59,181,232,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,181,232,0.12) 1px, transparent 1px)",
                      backgroundSize: "46px 46px",
                    }}
                  />
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 475" fill="none" aria-hidden="true">
                    <path d="M112 118L280 238L448 118" stroke="rgba(59,181,232,0.32)" strokeWidth="2" />
                    <path d="M104 355L280 238L456 355" stroke="rgba(245,158,11,0.28)" strokeWidth="2" />
                    <path d="M112 118L104 355" stroke="rgba(59,181,232,0.18)" strokeWidth="2" />
                    <path d="M448 118L456 355" stroke="rgba(59,181,232,0.18)" strokeWidth="2" />
                  </svg>

                  <motion.div
                    className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                  />

                  <motion.div
                    className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-primary/30 bg-gradient-to-br from-primary/20 to-accent/10 shadow-xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Boxes className="h-12 w-12 text-primary" />
                  </motion.div>

                  {[
                    { label: "Bitcoin", Icon: SiBitcoin, className: "left-[9%] top-[18%]", color: "#f59e0b" },
                    { label: "Ethereum", Icon: SiEthereum, className: "right-[8%] top-[18%]", color: "#8b5cf6" },
                    { label: "DeFi", Icon: Layers, className: "left-[8%] bottom-[18%]", color: "#06b6d4" },
                    { label: "Wallets", Icon: Shield, className: "right-[8%] bottom-[18%]", color: "#3bb5e8" },
                  ].map(({ label, Icon, className, color }, index) => (
                    <motion.div
                      key={label}
                      className={`absolute ${className} flex items-center gap-2 rounded-lg border border-primary/20 bg-background/90 px-3 py-2 text-sm font-semibold text-foreground shadow-md backdrop-blur`}
                      animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                      transition={{ duration: 3.4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Icon className="h-4 w-4" style={{ color }} />
                      <span>{label}</span>
                    </motion.div>
                  ))}

                  {[18, 32, 47, 64, 78].map((left, index) => (
                    <motion.span
                      key={left}
                      className="absolute h-2 w-2 rounded-full bg-primary"
                      style={{ left: `${left}%`, top: `${index % 2 === 0 ? 28 + index * 6 : 62 - index * 5}%` }}
                      animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.35, 0.8] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────── */}
        <section className="relative py-28 px-4" data-testid="section-services">
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-services-heading">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Our Services</span>
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "#64748b" }}>
                Empowering freelancers and businesses with the right environment, skills, and blockchain solutions to grow in the digital future.
              </p>
            </FadeIn>
            <ServicesGrid />
          </div>
        </section>

        {/* ── WEB3 COURSE ──────────────────────────────────────────── */}
        <section className="relative py-28 px-4" data-testid="section-course-showcase">
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <SectionLabel>Upcoming Program</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-course-showcase-heading">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Web3 & Blockchain Program</span>
              </h2>
              <p className="text-base max-w-xl mx-auto mb-5" style={{ color: "#64748b" }}>
                Learn blockchain fundamentals, Bitcoin architecture, Ethereum architecture, smart contracts and more.
              </p>
              {/* arrow separator */}
              <div className="flex items-center justify-center">
                <ArrowRight className="w-5 h-5" style={{ color: "rgba(59,181,232,0.4)" }} />
              </div>
            </FadeIn>

            <RoadmapGrid />

            {/* CTA banner */}
            <FadeIn className="mt-8" delay={0.2}>
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
            </FadeIn>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
        <section className="relative py-28 px-4" data-testid="section-testimonials">
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-testimonials-heading">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">What People Say About Us</span>
              </h2>
            </FadeIn>

            {/* Carousel wrapper */}
            <div className="relative flex items-center gap-3">
              {/* Left arrow */}
              <button
                onClick={prev}
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-primary/30 bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
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
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-primary/30 bg-primary/10 text-primary transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
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
      <Footer />
    </div>
  );
}
