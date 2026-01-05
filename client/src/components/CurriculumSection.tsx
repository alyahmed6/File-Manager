import { Card, CardContent } from "@/components/ui/card";
import { MobileScrollReveal } from "@/components/MobileScrollReveal";
import { SectionHeadingReveal } from "@/components/SectionHeadingReveal";
import { Clock, Check } from "lucide-react";

const modules = [
  {
    number: 1,
    title: "Introduction to Blockchain",
    description: "History, fundamentals of distributed ledger technology and how blockchain works.",
    bullets: ["History", "Fundamentals of distributed ledger tech", "How blockchain works"],
    duration: "~1h",
  },
  {
    number: 2,
    title: "Bitcoin Deep Dive",
    description: "Complete guide to Bitcoin, history, mining, transactions, and use cases.",
    bullets: ["Complete guide to Bitcoin", "History and mining", "Transactions and use cases"],
    duration: "~1h",
  },
  {
    number: 3,
    title: "Ethereum & Smart Contracts",
    description: "Ethereum, smart contracts, dapps, and the broader ecosystem.",
    bullets: ["Ethereum basics", "Smart contracts", "Dapps and ecosystem"],
    duration: "~1h",
  },
  {
    number: 4,
    title: "Cryptocurrency Wallets",
    description: "Creating wallets, understanding wallets, security practices, and wallet management.",
    bullets: ["Creating wallets", "Security practices", "Wallet management"],
    duration: "~1h",
  },
  {
    number: 5,
    title: "Centralized Exchanges (CEX's)",
    description: "Exchange tutorial (Binance), trading basics, and security considerations.",
    bullets: ["Exchange tutorial (Binance)", "Trading basics", "Security considerations"],
    duration: "~1h",
  },
  {
    number: 6,
    title: "Decentralized Exchanges (DEX's)",
    description: "Understanding DEXs, liquidity pools, yield farming, and DeFi protocols.",
    bullets: ["Understanding DEXs", "Liquidity pools", "Yield farming and DeFi"],
    duration: "~1h",
  },
  {
    number: 7,
    title: "Narratives/Trends",
    description: "Understanding Stablecoins, AI in blockchain, RWA's, Metaverse, NFT's and more.",
    bullets: ["Stablecoins and AI", "RWA's and Metaverse", "NFT's and more"],
    duration: "~1h",
  },
  {
    number: 8,
    title: "Advanced Topics & Future",
    description: "Emerging trends, regulatory landscape, and future of blockchain technology.",
    bullets: ["Emerging trends", "Regulatory landscape", "Future of blockchain"],
    duration: "~1h",
  },
  {
    number: 9,
    title: "Research & Analytical Platforms",
    description: "How to use analytical data provider platforms to analyze cryptocurrency projects.",
    bullets: ["Analytical platforms", "Data providers", "Project analysis"],
    duration: "~1h",
  },
  {
    number: 10,
    title: "Layer 2's, Rollups & Side Chains",
    description: "Purpose, importance and differences. Proving mechanisms, Zk and Optimistic proofs.",
    bullets: ["Purpose and importance", "Proving mechanisms", "Zk and Optimistic proofs"],
    duration: "~1h",
  },
];

export default function CurriculumSection() {
  return (
    <section id="curriculum" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeadingReveal className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-curriculum-heading"
          >
            Course Curriculum
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive 10-module program designed to take you from
            blockchain beginner to confident crypto user in just 8 weeks.
          </p>
        </SectionHeadingReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {modules.map((module, index) => (
            <MobileScrollReveal key={module.number} delay={index * 0.06}>
              <Card
                className="bg-card/50 border border-border/50 hover-elevate transition-all duration-300 h-full"
                data-testid={`card-module-${module.number}`}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-lg">
                      {module.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold">{module.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full shrink-0">
                          <Clock className="h-3 w-3" />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      <p className="hidden md:block text-sm text-muted-foreground">
                        {module.description}
                      </p>
                      <ul className="md:hidden space-y-1 mt-1">
                        {module.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-3 w-3 text-muted-foreground/60 shrink-0 mt-0.5" strokeWidth={2} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MobileScrollReveal>
          ))}
        </div>

        
      </div>
    </section>
  );
}
