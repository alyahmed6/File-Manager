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
} from "lucide-react";
import { SiEthereum, SiBitcoin } from "react-icons/si";
import qasimPhoto from "@assets/QAsim_1780246728761.jpeg";
import salmanPhoto from "@assets/Screenshot_2026-05-31_220657_1780247305242.png";

export const moduleColors = [
  "#3bb5e8",
  "#8b5cf6",
  "#f59e0b",
  "#06b6d4",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
  "#f43f5e",
];

export const roadmapModules = [
  { title: "Blockchain Fundamentals", desc: "Distributed ledgers, consensus mechanisms, and how blockchains work", Icon: Boxes, duration: "~1h" },
  { title: "Ethereum & Smart Contracts", desc: "Accounts, gas, the EVM, and Ethereum's core architecture", Icon: SiEthereum, duration: "~1h" },
  { title: "Bitcoin", desc: "Satoshi, history, core architecture and future", Icon: SiBitcoin, duration: "~1h" },
  { title: "DeFi & Layer 2s", desc: "Protocols, liquidity pools, and blockchain scaling solutions", Icon: Layers, duration: "~1h" },
  { title: "Tokenization", desc: "Asset digitization and real-world use cases", Icon: Tag, duration: "~1h" },
  { title: "AI in Blockchains", desc: "Integrating machine learning with on-chain data and systems", Icon: BrainCircuit, duration: "~1h" },
  { title: "Stablecoins", desc: "Mechanisms, risks, and the evolving stablecoin landscape", Icon: Scale, duration: "~1h" },
  { title: "Exchange Tutorials", desc: "CEX vs DEX, trading mechanics, and navigating order books", Icon: CandlestickChart, duration: "~1h" },
];

export const testimonials = [
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

export const incubationItems = [
  { label: "Freelancer Growth", Icon: TrendingUp },
  { label: "Mentorship & Guidance", Icon: Users },
  { label: "Supportive Freelancer Ecosystem", Icon: Users },
  { label: "Growth-Focused Environment", Icon: Target },
  { label: "Skill Development", Icon: GraduationCap },
  { label: "Startup Support", Icon: Rocket },
  { label: "Reliable Power & High-Speed Internet", Icon: Wifi },
];

export const blockchainItems = [
  { label: "In-Depth Analysis for Web3 Projects", Icon: Search },
  { label: "Discord Moderation", Icon: MessageSquare },
  { label: "Web3 Education", Icon: BookOpen },
  { label: "Blockchain Consulting", Icon: Box },
  { label: "Crypto Research", Icon: BarChart2 },
  { label: "Crypto Finance", Icon: DollarSign },
  { label: "Research/News Updates on Socials", Icon: Megaphone },
];
