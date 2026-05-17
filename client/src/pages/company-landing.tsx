import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, Hexagon, FileCode2, Layers, Tag, Cpu, Scale, BarChart2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const roadmapModules = [
  {
    title: "Blockchain Fundamentals",
    desc: "Distributed ledgers, consensus mechanisms, and how blockchains work",
    Icon: Link2,
  },
  {
    title: "Ethereum & Smart Contracts",
    desc: "Accounts, gas, the EVM, and Ethereum's core architecture",
    Icon: Hexagon,
  },
  {
    title: "Bitcoin",
    desc: "Satoshi, history, core architecture and future",
    Icon: FileCode2,
  },
  {
    title: "DeFi & Layer 2s",
    desc: "Protocols, liquidity pools, and blockchain scaling solutions",
    Icon: Layers,
  },
  {
    title: "Tokenization",
    desc: "Token standards, asset digitization, and real-world use cases",
    Icon: Tag,
  },
  {
    title: "AI in Blockchains",
    desc: "Integrating machine learning with on-chain data and systems",
    Icon: Cpu,
  },
  {
    title: "Stablecoins",
    desc: "Mechanisms, risks, and the evolving stablecoin landscape",
    Icon: Scale,
  },
  {
    title: "Exchange Tutorials",
    desc: "CEX vs DEX, trading mechanics, and navigating order books",
    Icon: BarChart2,
  },
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

const incubationItems = ["Freelancer Growth", "Mentorship & Guidance", "Skill Development", "Startup Support", "24/7 Fast Internet", "24/7 Electricity"];
const blockchainItems = ["In-Depth Analysis for Web3 Projects", "Discord Moderation", "Web3 Education", "Blockchain Consulting", "Crypto Research", "Research/News Updates on Socials"];

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

const svcContainerLeft = {
  hidden: { x: -72, opacity: 0 },
  visible: {
    x: 0, opacity: 1,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.14, delayChildren: 0.05 },
  },
};
const svcContainerRight = {
  hidden: { x: 72, opacity: 0 },
  visible: {
    x: 0, opacity: 1,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.14, delayChildren: 0.15 },
  },
};
const svcChild = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const bulletLeft = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const bulletRight = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const bulletList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const animate = inView ? "visible" : "hidden";

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-0">
      {/* Left: Incubation */}
      <motion.div
        className="pr-0 md:pr-12 pb-12 md:pb-0"
        variants={svcContainerLeft}
        initial="hidden"
        animate={animate}
      >
        <motion.div variants={svcChild} className="mb-5">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,181,232,0.12)", border: "1px solid rgba(59,181,232,0.2)" }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#3bb5e8" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white" data-testid="text-incubation-heading">Incubation Services</h3>
          </div>
        </motion.div>
        <motion.p variants={svcChild} className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
          We support freelancers, individuals, and startups through mentorship, skill development, collaboration, and real-world opportunities.
        </motion.p>
        <motion.ul className="space-y-3" variants={bulletList}>
          {incubationItems.map((item) => (
            <motion.li
              key={item}
              variants={bulletLeft}
              className="flex items-center gap-3 text-sm group cursor-default"
              data-testid={`item-incubation-${item.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-150" style={{ background: "#3bb5e8" }} />
              <span className="transition-colors group-hover:text-white" style={{ color: "#94a3b8" }}>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
      {/* Divider */}
      <div className="hidden md:block absolute left-1/2 -translate-x-px" style={{ width: "1px", top: "auto", height: "100%", background: "linear-gradient(to bottom, transparent, rgba(59,181,232,0.3), transparent)" }} />
      <div className="md:hidden h-px w-full my-8" style={{ background: "linear-gradient(to right, transparent, rgba(59,181,232,0.3), transparent)" }} />
      {/* Right: Blockchain */}
      <motion.div
        className="pl-0 md:pl-12"
        variants={svcContainerRight}
        initial="hidden"
        animate={animate}
      >
        <motion.div variants={svcChild} className="mb-5">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,181,232,0.12)", border: "1px solid rgba(59,181,232,0.2)" }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#3bb5e8" strokeWidth="1.8">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white" data-testid="text-blockchain-heading">Blockchain & Web3 Solutions</h3>
          </div>
        </motion.div>
        <motion.p variants={svcChild} className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
          We provide blockchain development and Web3 technical solutions for startups, businesses, and digital products.
        </motion.p>
        <motion.ul className="space-y-3" variants={bulletList}>
          {blockchainItems.map((item) => (
            <motion.li
              key={item}
              variants={bulletRight}
              className="flex items-center gap-3 text-sm group cursor-default"
              data-testid={`item-blockchain-${item.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-150" style={{ background: "#3bb5e8" }} />
              <span className="transition-colors group-hover:text-white" style={{ color: "#94a3b8" }}>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

function RoadmapGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {roadmapModules.map(({ title, desc, Icon }, index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
          whileHover={{
            scale: 1.025,
            borderColor: "rgba(59,181,232,0.38)",
            boxShadow: "0 0 28px rgba(59,181,232,0.1)",
          }}
          className="relative overflow-hidden rounded-2xl px-6 py-5 cursor-default group"
          style={{
            background: "linear-gradient(140deg, rgba(8,14,26,0.95) 0%, rgba(4,6,14,0.98) 100%)",
            border: "1px solid rgba(59,181,232,0.12)",
          }}
          data-testid={`roadmap-item-${index + 1}`}
        >
          {/* Decorative large module number */}
          <span
            className="absolute top-2 right-4 font-black select-none pointer-events-none leading-none"
            style={{ fontSize: "5rem", color: "rgba(59,181,232,0.05)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Top row: icon + module badge */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(59,181,232,0.1)", border: "1px solid rgba(59,181,232,0.2)" }}
            >
              <Icon className="w-4 h-4" style={{ color: "#3bb5e8" }} />
            </div>
          </div>

          {/* Title */}
          <h4
            className="text-sm font-semibold mb-1.5 relative z-10 transition-colors duration-300 group-hover:text-[#3bb5e8]"
            style={{ color: "#e2e8f0" }}
          >
            {title}
          </h4>

          {/* Description */}
          <p className="text-xs leading-relaxed relative z-10" style={{ color: "#475569" }}>
            {desc}
          </p>

          {/* Bottom accent line that sweeps in on hover */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1.5px]"
            style={{ background: "linear-gradient(to right, transparent, #3bb5e8, transparent)" }}
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function CompanyLanding() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#04060e", color: "#e2e8f0" }}>
      {/* ── GLOBAL PARTICLE CANVAS — fixed behind everything ── */}
      <ParticleCanvas />

      <Header />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative flex flex-col items-center justify-start min-h-[100svh] text-center px-4 pt-[18vh]">
          {/* Soft hero radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 55% at 50% 20%, rgba(59,181,232,0.11) 0%, transparent 65%)",
              zIndex: 1,
            }}
          />
          <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-5" style={{ zIndex: 2 }}>
            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #a8d8ea 50%, #3bb5e8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              data-testid="text-company-hero-heading"
            >
              The Blockchain Pulse
            </h1>

            {/* Tagline */}
            <div className="flex items-center gap-4 mt-1" data-testid="text-company-hero-subheading">
              <div className="h-px w-10 flex-shrink-0" style={{ background: "linear-gradient(to right, transparent, rgba(59,181,232,0.5))" }} />
              <p
                className="text-sm md:text-base font-medium tracking-[0.18em] uppercase"
                style={{ color: "rgba(148,163,184,0.85)", letterSpacing: "0.18em" }}
              >
                Incubating Talent&nbsp;&nbsp;·&nbsp;&nbsp;Delivering World-Class Freelance Solutions
              </p>
              <div className="h-px w-10 flex-shrink-0" style={{ background: "linear-gradient(to left, transparent, rgba(59,181,232,0.5))" }} />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ zIndex: 2 }}>
            <div className="w-px h-10 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(59,181,232,0.6), transparent)" }} />
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="relative py-28 px-4" data-testid="section-services">
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#3bb5e8" }}>What We Do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-services-heading">Our Services</h2>
              <div className="w-12 h-px mx-auto mt-4" style={{ background: "linear-gradient(to right, transparent, #3bb5e8, transparent)" }} />
            </FadeIn>

            <ServicesGrid />
          </div>
        </section>

        {/* ── WEB3 COURSE ── */}
        <section className="relative py-28 px-4" data-testid="section-course-showcase">
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#3bb5e8" }}>Upcoming Program</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-course-showcase-heading">
                Upcoming Web3 & Blockchain Program
              </h2>
              <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "#64748b" }}>Learn blockchain fundamentals, Bitcoin architecture, Ethereum architecture, smart contracts and more.</p>
              <div className="w-12 h-px mx-auto mt-4" style={{ background: "linear-gradient(to right, transparent, #3bb5e8, transparent)" }} />
            </FadeIn>

            <RoadmapGrid />
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="relative py-28 px-4" data-testid="section-testimonials">
          <div className="max-w-5xl mx-auto relative z-10">
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
