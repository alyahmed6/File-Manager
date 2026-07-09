import type { ComponentType, CSSProperties } from "react";
import { motion } from "framer-motion";
import { Layers, Shield } from "lucide-react";
import { SiBitcoin, SiEthereum } from "react-icons/si";

const nodes = [
  { label: "Bitcoin", Icon: SiBitcoin, angle: -140, color: "#f59e0b" },
  { label: "Ethereum", Icon: SiEthereum, angle: -40, color: "#8b5cf6" },
  { label: "DeFi", Icon: Layers, angle: 140, color: "#06b6d4" },
  { label: "Wallets", Icon: Shield, angle: 40, color: "#3bb5e8" },
];

const ORBIT_RADIUS = 44;

function OrbitNode({
  label,
  Icon,
  angle,
  color,
}: {
  label: string;
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  angle: number;
  color: string;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + ORBIT_RADIUS * Math.cos(rad);
  const y = 50 + ORBIT_RADIUS * Math.sin(rad);

  return (
    <div
      className="absolute flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-slate-950/20 backdrop-blur-sm"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Icon className="h-4 w-4" style={{ color }} />
      <span>{label}</span>
    </div>
  );
}

export default function HeroAnimatedVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/10 via-violet-500/5 to-transparent blur-3xl" />
      <motion.div
        className="relative mx-auto flex h-[360px] w-[360px] items-center justify-center rounded-full border border-sky-500/20 bg-slate-950/95 shadow-[0_40px_80px_rgba(15,23,42,0.35)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border border-sky-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {nodes.map((node) => (
          <motion.div
            key={node.label}
            className="absolute"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [0.9, 1.05, 0.95, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", delay: node.angle / 360 }}
          >
            <OrbitNode {...node} />
          </motion.div>
        ))}

        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-900/95 ring-4 ring-sky-400/20 shadow-[0_0_45px_rgba(56,189,248,0.25)]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/30 via-cyan-300/10 to-transparent" />
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-inner">
            <span className="text-sm font-bold tracking-tight">CHAIN</span>
          </div>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-8 mx-auto h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl" />
    </div>
  );
}
