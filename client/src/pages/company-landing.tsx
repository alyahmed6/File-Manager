import { useEffect, useRef, useState } from "react";
import qasimPhoto from "@assets/QAsim_1780246728761.jpeg";
import salmanPhoto from "@assets/Screenshot_2026-05-31_220657_1780247305242.png";
import { motion, useInView } from "framer-motion";
import {
  Link2,
  Hexagon,
  FileCode2,
  Layers,
  Tag,
  Cpu,
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
  Link,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  { title: "Blockchain Fundamentals", desc: "Distributed ledgers, consensus mechanisms, and how blockchains work", Icon: Link2 },
  { title: "Ethereum & Smart Contracts", desc: "Accounts, gas, the EVM, and Ethereum's core architecture", Icon: Hexagon },
  { title: "Bitcoin", desc: "Satoshi, history, core architecture and future", Icon: FileCode2 },
  { title: "DeFi & Layer 2s", desc: "Protocols, liquidity pools, and blockchain scaling solutions", Icon: Layers },
  { title: "Tokenization", desc: "Asset digitization and real-world use cases", Icon: Tag },
  { title: "AI in Blockchains", desc: "Integrating machine learning with on-chain data and systems", Icon: Cpu },
  { title: "Stablecoins", desc: "Mechanisms, risks, and the evolving stablecoin landscape", Icon: Scale },
  { title: "Exchange Tutorials", desc: "CEX vs DEX, trading mechanics, and navigating order books", Icon: BarChart2 },
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

/* ─── PARTICLE CANVAS ───────────────────────────────────────────────── */

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    const COUNT = 90;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 181, 232, ${0.09 * (1 - dist / 130)})`;
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

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
        className="rounded-2xl p-6 flex flex-col"
        style={{
          background: "linear-gradient(140deg, rgba(8,14,30,0.95) 0%, rgba(4,8,20,0.98) 100%)",
          border: "1px solid rgba(59,181,232,0.25)",
          boxShadow: "0 0 40px rgba(59,181,232,0.06), inset 0 1px 0 rgba(59,181,232,0.08)",
        }}
      >
        {/* Card header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(59,181,232,0.15)", border: "1px solid rgba(59,181,232,0.3)" }}
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#3bb5e8" strokeWidth="1.8">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white" data-testid="text-incubation-heading">
            Incubation Services
          </h3>
        </div>
        <div className="h-px w-full mb-4" style={{ background: "rgba(59,181,232,0.15)" }} />
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
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
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(59,181,232,0.1)" }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: "#3bb5e8" }} />
              </div>
              <span className="flex-1 transition-colors group-hover:text-white" style={{ color: "#94a3b8" }}>
                {label}
              </span>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(59,181,232,0.5)" }} />
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Right: Blockchain */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="rounded-2xl p-6 flex flex-col"
        style={{
          background: "linear-gradient(140deg, rgba(10,6,30,0.95) 0%, rgba(4,4,20,0.98) 100%)",
          border: "1px solid rgba(139,92,246,0.3)",
          boxShadow: "0 0 40px rgba(139,92,246,0.07), inset 0 1px 0 rgba(139,92,246,0.1)",
        }}
      >
        {/* Card header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)" }}
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white" data-testid="text-blockchain-heading">
            Blockchain & Web3 Solutions
          </h3>
        </div>
        <div className="h-px w-full mb-4" style={{ background: "rgba(139,92,246,0.2)" }} />
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
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
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(139,92,246,0.12)" }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: "#8b5cf6" }} />
              </div>
              <span className="flex-1 transition-colors group-hover:text-white" style={{ color: "#94a3b8" }}>
                {label}
              </span>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(139,92,246,0.5)" }} />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ─── ROADMAP GRID ──────────────────────────────────────────────────── */

function RoadmapGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      {roadmapModules.map(({ title, desc, Icon }, index) => {
        const color = moduleColors[index];
        return (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
            className="relative overflow-hidden rounded-2xl px-5 py-5 cursor-default group"
            style={{
              background: "linear-gradient(140deg, rgba(8,14,28,0.97) 0%, rgba(4,6,18,0.99) 100%)",
              border: `1px solid rgba(${hexToRgb(color)},0.18)`,
            }}
            data-testid={`roadmap-item-${index + 1}`}
          >
            {/* Top-left colored dot */}
            <div
              className="absolute top-3.5 left-3.5 w-1.5 h-1.5 rounded-full"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />

            {/* Large watermark number */}
            <span
              className="absolute top-1 right-3 font-black select-none pointer-events-none leading-none"
              style={{ fontSize: "5.5rem", color: `rgba(${hexToRgb(color)},0.07)` }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Icon in hex-style container */}
            <div className="flex items-start gap-4 relative z-10 mt-3">
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, rgba(${hexToRgb(color)},0.25) 0%, rgba(${hexToRgb(color)},0.08) 100%)`,
                  border: `1px solid rgba(${hexToRgb(color)},0.3)`,
                  boxShadow: `0 0 20px rgba(${hexToRgb(color)},0.12)`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className="text-base font-bold mb-1.5 transition-colors duration-300 group-hover:opacity-90"
                  style={{ color: "#e2e8f0" }}
                >
                  {title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
                  {desc}
                </p>
              </div>
            </div>

            {/* Bottom accent dashes */}
            <div className="flex items-center gap-1 mt-5 relative z-10">
              <div className="h-px flex-1" style={{ background: `rgba(${hexToRgb(color)},0.25)` }} />
              <div className="w-2 h-px" style={{ background: `rgba(${hexToRgb(color)},0.5)` }} />
              <div className="w-1 h-px" style={{ background: `rgba(${hexToRgb(color)},0.3)` }} />
            </div>
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
    <div className="min-h-screen flex flex-col" style={{ background: "#04060e", color: "#e2e8f0" }}>
      <ParticleCanvas />
      <Header />
      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center min-h-[100svh] text-center px-4 overflow-hidden">
          {/* Radial arc glow behind icon */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "18%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(59,181,232,0.13) 0%, transparent 65%)",
              zIndex: 1,
            }}
          />
          {/* Arc ring */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "22%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "320px",
              height: "160px",
              borderRadius: "160px 160px 0 0",
              border: "1px solid rgba(59,181,232,0.12)",
              zIndex: 1,
            }}
          />

          {/* Globe / world-map bottom effect */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {/* Globe ellipse */}
            <div
              style={{
                position: "absolute",
                bottom: "-120px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "900px",
                height: "400px",
                borderRadius: "50%",
                border: "1px solid rgba(59,181,232,0.15)",
                background: "radial-gradient(ellipse at 50% 30%, rgba(59,181,232,0.08) 0%, rgba(4,6,14,0.6) 55%, transparent 75%)",
              }}
            />
            {/* Globe glow center point */}
            <div
              style={{
                position: "absolute",
                bottom: "115px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#3bb5e8",
                boxShadow: "0 0 40px 12px rgba(59,181,232,0.4), 0 0 120px 40px rgba(59,181,232,0.15)",
              }}
            />
            {/* Horizon lines */}
            <div
              style={{
                position: "absolute",
                bottom: "118px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "600px",
                height: "1px",
                background: "linear-gradient(to right, transparent, rgba(59,181,232,0.4), transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "90px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "400px",
                height: "1px",
                background: "linear-gradient(to right, transparent, rgba(59,181,232,0.2), transparent)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-6" style={{ zIndex: 2 }}>
            {/* Logo icon */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1a8fd1 0%, #3bb5e8 50%, #2196c8 100%)",
                boxShadow: "0 0 40px rgba(59,181,232,0.4), 0 0 80px rgba(59,181,232,0.15)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-11 md:h-11 text-white" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
              data-testid="text-company-hero-heading"
            >
              <span className="text-white">The Blockchain </span>
              <span style={{ color: "#3bb5e8" }}>Pulse</span>
            </h1>

            {/* Tagline */}
            <div className="flex items-center gap-4 mt-1" data-testid="text-company-hero-subheading">
              <div
                className="h-px w-10 flex-shrink-0"
                style={{ background: "linear-gradient(to right, transparent, rgba(59,181,232,0.5))" }}
              />
              <p
                className="text-sm md:text-base font-medium tracking-[0.18em] uppercase"
                style={{ color: "rgba(148,163,184,0.85)" }}
              >
                Incubating Talent&nbsp;&nbsp;·&nbsp;&nbsp;Delivering World-Class
                <br className="hidden sm:block" /> Freelance Solutions
              </p>
              <div
                className="h-px w-10 flex-shrink-0"
                style={{ background: "linear-gradient(to left, transparent, rgba(59,181,232,0.5))" }}
              />
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
            style={{ zIndex: 2 }}
          >
            <div
              className="w-px h-10 rounded-full"
              style={{ background: "linear-gradient(to bottom, rgba(59,181,232,0.6), transparent)" }}
            />
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────── */}
        <section className="relative py-28 px-4" data-testid="section-services">
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-services-heading">
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
        <section className="relative py-28 px-4" data-testid="section-course-showcase">
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <SectionLabel>Upcoming Program</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-course-showcase-heading">
                <span className="text-white">Upcoming </span>
                <span style={{ color: "#3bb5e8" }}>Web3 & Blockchain</span>
                <span className="text-white"> Program</span>
              </h2>
              <p className="text-base max-w-xl mx-auto mb-5" style={{ color: "#64748b" }}>
                Learn blockchain fundamentals, Bitcoin architecture, Ethereum architecture, smart contracts and more.
              </p>
              {/* chain link separator */}
              <div className="flex items-center justify-center">
                <Link className="w-5 h-5" style={{ color: "rgba(59,181,232,0.4)" }} />
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-testimonials-heading">
                What People Say About Us
              </h2>
              <div className="w-12 h-0.5 mx-auto" style={{ background: "#3bb5e8" }} />
            </FadeIn>

            {/* Carousel wrapper */}
            <div className="relative flex items-center gap-3">
              {/* Left arrow */}
              <button
                onClick={prev}
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(8,14,28,0.9)",
                  border: "1px solid rgba(59,181,232,0.2)",
                  color: "#94a3b8",
                }}
                data-testid="button-testimonial-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Cards */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                {testimonials.map((t, i) => {
                  const borderColor = i === 1 ? "rgba(139,92,246,0.35)" : "rgba(59,181,232,0.25)";
                  const quoteColor = i === 1 ? "#8b5cf6" : "#3bb5e8";
                  const isActive = activeTestimonial === i;
                  return (
                    <div
                      key={i}
                      className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300"
                      style={{
                        background: "rgba(8,14,28,0.8)",
                        border: `1px solid ${borderColor}`,
                        boxShadow: isActive ? `0 0 30px rgba(59,181,232,0.08)` : "none",
                        opacity: 1,
                      }}
                      data-testid={`testimonial-card-${i}`}
                    >
                      {/* Large quote mark */}
                      <div className="text-5xl font-serif leading-none -mb-1" style={{ color: quoteColor, opacity: 0.7 }}>
                        "
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
                        style={{ color: "#94a3b8" }}
                        data-testid={`testimonial-text-${i}`}
                      >
                        {t.comment}"
                      </p>

                      {/* Separator */}
                      <div className="h-px w-full" style={{ background: `rgba(${i === 1 ? "139,92,246" : "59,181,232"},0.12)` }} />

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        {(t as any).photo ? (
                          <img
                            src={(t as any).photo}
                            alt={t.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            style={{ border: `1px solid ${borderColor}` }}
                            data-testid={`testimonial-avatar-${i}`}
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                            style={{
                              background: i === 1 ? "rgba(139,92,246,0.15)" : "rgba(59,181,232,0.12)",
                              color: quoteColor,
                              border: `1px solid ${borderColor}`,
                            }}
                            data-testid={`testimonial-avatar-${i}`}
                          >
                            {t.initials}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white" data-testid={`testimonial-name-${i}`}>
                            {t.name}
                          </p>
                          <p className="text-xs" style={{ color: quoteColor }} data-testid={`testimonial-role-${i}`}>
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
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(8,14,28,0.9)",
                  border: "1px solid rgba(59,181,232,0.2)",
                  color: "#94a3b8",
                }}
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
