import { useEffect, useRef, useState } from "react";
import qasimPhoto from "@assets/QAsim_1780246728761.jpeg";
import salmanPhoto from "@assets/Screenshot_2026-05-31_220657_1780247305242.png";
import { motion, useInView } from "framer-motion";
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
  Link,
} from "lucide-react";
import { SiEthereum, SiBitcoin } from "react-icons/si";
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
  { title: "Blockchain Fundamentals", desc: "Distributed ledgers, consensus mechanisms, and how blockchains work", Icon: Boxes },
  { title: "Ethereum & Smart Contracts", desc: "Accounts, gas, the EVM, and Ethereum's core architecture", Icon: SiEthereum },
  { title: "Bitcoin", desc: "Satoshi, history, core architecture and future", Icon: SiBitcoin },
  { title: "DeFi & Layer 2s", desc: "Protocols, liquidity pools, and blockchain scaling solutions", Icon: Layers },
  { title: "Tokenization", desc: "Asset digitization and real-world use cases", Icon: Tag },
  { title: "AI in Blockchains", desc: "Integrating machine learning with on-chain data and systems", Icon: BrainCircuit },
  { title: "Stablecoins", desc: "Mechanisms, risks, and the evolving stablecoin landscape", Icon: Scale },
  { title: "Exchange Tutorials", desc: "CEX vs DEX, trading mechanics, and navigating order books", Icon: CandlestickChart },
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
    const COUNT = 120;

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
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.3,
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
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 181, 232, ${0.22 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.8;
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

/* ─── GLOBE CANVAS ──────────────────────────────────────────────────── */

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = (canvas.width = canvas.offsetWidth);
      const h = (canvas.height = canvas.offsetHeight);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      // Ellipse center well below canvas so only top arc is visible
      const rx = w * 1.1;
      const ry = h * 3.8;
      const cy = h * 3.8; // below canvas bottom

      // Clip to globe ellipse shape
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.clip();

      // Globe body gradient — dark navy surface
      const bodyGrad = ctx.createRadialGradient(cx, 0, 0, cx, h * 0.6, w * 0.85);
      bodyGrad.addColorStop(0, "rgba(6, 20, 55, 0.96)");
      bodyGrad.addColorStop(0.45, "rgba(3, 10, 30, 0.97)");
      bodyGrad.addColorStop(1, "rgba(2, 4, 14, 0.99)");
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(0, 0, w, h);

      // Dot grid — world-map-style points on globe surface
      const spacing = 15;
      for (let row = 0; row <= Math.ceil(h / spacing); row++) {
        const y = row * spacing;
        const rowOffset = (row % 2) * (spacing / 2);
        for (let col = 0; col <= Math.ceil(w / spacing); col++) {
          const x = col * spacing + rowOffset;
          // Brightness: strongest near horizon center, fades toward bottom & edges
          const dxN = (x - cx) / (w * 0.5);
          const dyN = y / h;
          const distFromHorizonCenter = Math.sqrt(dxN * dxN + dyN * dyN * 0.4);
          const brightness = Math.max(0, 1 - distFromHorizonCenter * 1.2);
          const alpha = 0.04 + brightness * 0.28;
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59,181,232,${alpha})`;
          ctx.fill();
        }
      }

      ctx.restore();

      // Horizon glow line — bright electric blue edge at top of globe
      const horizGrad = ctx.createLinearGradient(0, 0, w, 0);
      horizGrad.addColorStop(0, "transparent");
      horizGrad.addColorStop(0.15, "rgba(59,181,232,0.35)");
      horizGrad.addColorStop(0.42, "rgba(80,190,255,0.85)");
      horizGrad.addColorStop(0.50, "rgba(140,225,255,1.0)");
      horizGrad.addColorStop(0.58, "rgba(80,190,255,0.85)");
      horizGrad.addColorStop(0.85, "rgba(59,181,232,0.35)");
      horizGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.moveTo(0, 1);
      ctx.lineTo(w, 1);
      ctx.strokeStyle = horizGrad;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Horizon center radial bloom
      const bloom = ctx.createRadialGradient(cx, 0, 0, cx, 0, w * 0.38);
      bloom.addColorStop(0, "rgba(120,215,255,0.38)");
      bloom.addColorStop(0.25, "rgba(59,181,232,0.18)");
      bloom.addColorStop(1, "transparent");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h * 0.55);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
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
          background: "linear-gradient(140deg, rgba(8,14,30,0.97) 0%, rgba(4,8,20,0.99) 100%)",
          border: "1px solid rgba(59,181,232,0.45)",
          boxShadow: "0 0 60px rgba(59,181,232,0.18), 0 0 120px rgba(59,181,232,0.07), inset 0 1px 0 rgba(59,181,232,0.2)",
        }}
      >
        {/* Card header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(59,181,232,0.2)", border: "1px solid rgba(59,181,232,0.55)", boxShadow: "0 0 24px rgba(59,181,232,0.45), inset 0 0 12px rgba(59,181,232,0.1)" }}
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
          background: "linear-gradient(140deg, rgba(10,6,30,0.97) 0%, rgba(4,4,20,0.99) 100%)",
          border: "1px solid rgba(139,92,246,0.5)",
          boxShadow: "0 0 60px rgba(139,92,246,0.2), 0 0 120px rgba(139,92,246,0.08), inset 0 1px 0 rgba(139,92,246,0.2)",
        }}
      >
        {/* Card header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.6)", boxShadow: "0 0 24px rgba(139,92,246,0.5), inset 0 0 12px rgba(139,92,246,0.12)" }}
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
              border: `1px solid rgba(${hexToRgb(color)},0.45)`,
              boxShadow: `0 0 30px rgba(${hexToRgb(color)},0.14), 0 0 1px rgba(${hexToRgb(color)},0.6) inset`,
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
              style={{ fontSize: "5.5rem", color: `rgba(${hexToRgb(color)},0.13)` }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Icon in hex-style container */}
            <div className="flex items-start gap-4 relative z-10 mt-3">
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, rgba(${hexToRgb(color)},0.35) 0%, rgba(${hexToRgb(color)},0.12) 100%)`,
                  border: `1px solid rgba(${hexToRgb(color)},0.55)`,
                  boxShadow: `0 0 24px rgba(${hexToRgb(color)},0.45), 0 0 6px rgba(${hexToRgb(color)},0.8) inset`,
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
        <section className="relative flex flex-col items-center min-h-[100svh] text-center px-4" style={{ justifyContent: "flex-start", paddingTop: "10vh" }}>

          {/* ── Globe hemisphere — bottom 44%, atmospheric opacity ── */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "44%", zIndex: 1, opacity: 0.28 }}
          >
            <GlobeCanvas />
          </div>

          {/* ── Soft atmospheric horizon glow (no hard line) ── */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ bottom: "44%", zIndex: 2 }}
          >
            {/* Very faint diffuse glow — atmospheric, not structural */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70vw",
              height: "220px",
              background: "radial-gradient(ellipse at 50% 100%, rgba(59,181,232,0.12) 0%, rgba(59,181,232,0.04) 50%, transparent 80%)",
            }} />
          </div>

          {/* ── Smooth gradient fade at hero bottom — NO hard cut ── */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "35%", zIndex: 4, background: "linear-gradient(to bottom, transparent 0%, rgba(4,6,14,0.55) 50%, rgba(4,6,14,0.95) 85%, #04060e 100%)" }}
          />

          {/* ── Single subtle arc ring behind icon ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "8vh",
              left: "50%",
              transform: "translateX(-50%)",
              width: "420px",
              height: "210px",
              borderRadius: "210px 210px 0 0",
              border: "1px solid rgba(59,181,232,0.18)",
              zIndex: 1,
            }}
          />

          {/* ── Soft dark disc behind the icon for contrast ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "2vh",
              left: "50%",
              transform: "translateX(-50%)",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(2,4,14,0.85) 0%, transparent 68%)",
              zIndex: 1,
            }}
          />

          {/* ── Hero content ── */}
          <div className="relative flex flex-col items-center" style={{ zIndex: 2, gap: "1.4rem" }}>

            {/* Floating isometric layers icon — no box, pure glow */}
            <div
              style={{
                filter:
                  "drop-shadow(0 0 18px rgba(59,181,232,1)) drop-shadow(0 0 50px rgba(59,181,232,0.65)) drop-shadow(0 0 110px rgba(59,181,232,0.3))",
              }}
            >
              <svg viewBox="0 0 60 48" className="w-16 h-12 md:w-24 md:h-20" fill="none">
                {/* Top layer (lightest) */}
                <polygon points="30,1 56,12 30,23 4,12" fill="#a8e6f8" />
                <polygon points="4,12 4,19 30,30 30,23" fill="#3fafd4" />
                <polygon points="56,12 56,19 30,30 30,23" fill="#2d90b8" />
                {/* Middle layer */}
                <polygon points="30,17 56,28 30,39 4,28" fill="#3bb5e8" />
                <polygon points="4,28 4,35 30,46 30,39" fill="#2080b0" />
                <polygon points="56,28 56,35 30,46 30,39" fill="#196898" />
                {/* Bottom layer (darkest) */}
                <polygon points="30,33 56,44 30,55 4,44" fill="#1e8bca" />
                <polygon points="4,44 4,51 30,62 30,55" fill="#0f5a88" />
                <polygon points="56,44 56,51 30,62 30,55" fill="#0a4a75" />
              </svg>
            </div>

            {/* Title */}
            <h1
              className="font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
              data-testid="text-company-hero-heading"
            >
              <span className="text-white">The Blockchain </span>
              <span style={{ color: "#3bb5e8" }}>Pulse</span>
            </h1>

            {/* Tagline with flanking lines */}
            <div
              className="flex flex-col items-center gap-0.5"
              data-testid="text-company-hero-subheading"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-12 md:w-20" style={{ background: "linear-gradient(to right, transparent, rgba(59,181,232,0.55))" }} />
                <p className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase" style={{ color: "rgba(148,163,184,0.88)" }}>
                  Incubating Talent&nbsp;&nbsp;·&nbsp;&nbsp;Delivering World-Class
                </p>
                <div className="h-px w-12 md:w-20" style={{ background: "linear-gradient(to left, transparent, rgba(59,181,232,0.55))" }} />
              </div>
              <p className="text-xs md:text-sm font-semibold tracking-[0.22em] uppercase" style={{ color: "rgba(148,163,184,0.88)" }}>
                Freelance Solutions
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            style={{ zIndex: 2 }}
          >
            <div className="w-px h-10 rounded-full mx-auto" style={{ background: "linear-gradient(to bottom, rgba(59,181,232,0.6), transparent)" }} />
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
                        boxShadow: i === 1
                          ? "0 0 40px rgba(139,92,246,0.22), 0 0 80px rgba(139,92,246,0.08)"
                          : "0 0 40px rgba(59,181,232,0.18), 0 0 80px rgba(59,181,232,0.06)",
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
