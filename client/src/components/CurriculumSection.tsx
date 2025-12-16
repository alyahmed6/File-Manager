import { Card, CardContent } from "@/components/ui/card";
import { Clock, BookOpen, CheckCircle2 } from "lucide-react";

const modules = [
  {
    number: 1,
    title: "Introduction to Blockchain",
    description: "Understanding the fundamentals of distributed ledger technology and how blockchain works.",
    duration: "~1h",
  },
  {
    number: 2,
    title: "Bitcoin Deep Dive",
    description: "Complete guide to Bitcoin, its history, mining, transactions, and use cases.",
    duration: "~1h",
  },
  {
    number: 3,
    title: "Ethereum & Smart Contracts",
    description: "Learn about Ethereum, smart contracts, dapps, and the broader ecosystem.",
    duration: "~1h",
  },
  {
    number: 4,
    title: "Cryptocurrency Wallets",
    description: "Creating wallets, understanding wallets, security practices, and wallet management.",
    duration: "~1h",
  },
  {
    number: 5,
    title: "Centralized Exchanges (CEX's)",
    description: "How to use major exchanges, trading basics, and security considerations.",
    duration: "~1h",
  },
  {
    number: 6,
    title: "Decentralized Exchanges (DEX's)",
    description: "Understanding DEXs, liquidity pools, yield farming, and DeFi protocols.",
    duration: "~1h",
  },
  {
    number: 7,
    title: "Narratives",
    description: "Understanding Stablecoins, AI in blockchain, RWA's, Metaverse, NFT's and more.",
    duration: "~1h",
  },
  {
    number: 8,
    title: "Advanced Topics & Future",
    description: "Emerging trends, regulatory landscape, and future of blockchain technology.",
    duration: "~1h",
  },
  {
    number: 9,
    title: "Research & Analytical Platforms",
    description: "How to use analytical data provider platforms to analyze cryptocurrency projects.",
    duration: "~1h",
  },
  {
    number: 10,
    title: "Layer 2's, Rollups & Side Chains",
    description: "Purpose, importance and differences. Proving mechanisms, Zk and Optimistic proofs.",
    duration: "~1h",
  },
];

export default function CurriculumSection() {
  return (
    <section id="curriculum" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-curriculum-heading">Course Curriculum</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive 10-module program designed to take you from blockchain beginner to 
            confident crypto user in just 2 months.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {modules.map((module) => (
            <Card key={module.number} className="hover-elevate transition-all duration-300" data-testid={`card-module-${module.number}`}>
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
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>10 Video Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>~10 Hours Total Content</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Downloadable via Discord</span>
          </div>
        </div>
      </div>
    </section>
  );
}
