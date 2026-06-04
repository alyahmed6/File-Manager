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

      <div className="relative aspect-square bg-transparent">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          {nodes.map(({ angle, color }) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = 200 + ORBIT_RADIUS * 4 * Math.cos(rad);
            const y2 = 200 + ORBIT_RADIUS * 4 * Math.sin(rad);
            return (
              <line
                key={angle}
                x1="200"
                y1="200"
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth="2"
                strokeOpacity="0.4"
              />
            );
          })}
          <circle cx="200" cy="200" r="120" stroke="rgba(59,181,232,0.25)" strokeWidth="1.5" fill="none" />
          <circle
            cx="200"
            cy="200"
            r="155"
            stroke="rgba(245,158,11,0.2)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 12"
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/25" />
        <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 shadow-lg backdrop-blur-sm sm:h-28 sm:w-28">
          <Boxes className="h-11 w-11 text-primary sm:h-14 sm:w-14" />
        </div>

        <div className="absolute inset-[12%]">
          {nodes.map((node) => (
            <OrbitNode key={node.label} {...node} />
          ))}
        </div>

        {[12, 28, 55, 72, 88].map((left, index) => (
          <span
            key={left}
            className="absolute h-2 w-2 rounded-full bg-primary/80"
            style={{ left: `${left}%`, top: `${20 + (index * 14) % 60}%` }}
          />
        ))}
      </div>
    </div>
  );
}
