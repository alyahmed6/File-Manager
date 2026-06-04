import { motion } from "framer-motion";
import { Boxes, Layers, Shield } from "lucide-react";
import { SiBitcoin, SiEthereum } from "react-icons/si";

const nodes = [
  { label: "Bitcoin", Icon: SiBitcoin, angle: -135, color: "#f59e0b" },
  { label: "Ethereum", Icon: SiEthereum, angle: -45, color: "#8b5cf6" },
  { label: "DeFi", Icon: Layers, angle: 135, color: "#06b6d4" },
  { label: "Wallets", Icon: Shield, angle: 45, color: "#3bb5e8" },
];

const ORBIT_RADIUS = 38;

function OrbitNode({
  label,
  Icon,
  angle,
  color,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  angle: number;
  color: string;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + ORBIT_RADIUS * Math.cos(rad);
  const y = 50 + ORBIT_RADIUS * Math.sin(rad);

  return (
    <div
      className="absolute flex items-center gap-1.5 rounded-lg border border-primary/20 bg-background/70 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color }} />
      <span className="text-foreground">{label}</span>
    </div>
  );
}

export default function HeroAnimatedVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-xs bg-transparent sm:max-w-md lg:max-w-xl"
      data-testid="hero-animated-visual"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}
