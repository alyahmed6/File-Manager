import { Card, CardContent } from "@/components/ui/card";
import { MobileScrollReveal } from "@/components/MobileScrollReveal";
import { SectionHeadingReveal } from "@/components/SectionHeadingReveal";
import { Clock, Check } from "lucide-react";

const modules = [
  {
    number: 1,
    title: "Introduction to Blockchain",
    bullets: ["Blockchain types", "Nodes", "Practical Applications"],
    duration: "~1h",
  },
  {
    number: 2,
    title: "Bitcoin Deep Dive",
    bullets: [
      "Bitcoin guide",
      "Mining and miners",
      "Transactions and use cases",
    ],
    duration: "~1h",
  },
  {
    number: 3,
    title: "Ethereum & Smart Contracts",
    bullets: ["Ethereum basics", "Smart contracts", "Dapps and ecosystem"],
    duration: "~1h",
  },
  {
    number: 4,
    title: "Web3/Crypto Wallets",
    bullets: [
      "Creating wallets (tutorial)",
      "Security practices",
      "Wallet management and more",
    ],
    duration: "~1h",
  },
  {
    number: 5,
    title: "Centralized Exchanges (CEX's)",
    bullets: [
      "Exchange walkthrough (Binance)",
      "Risks and benefits",
      "Security considerations",
    ],
    duration: "~1h",
  },
  {
    number: 6,
    title: "Decentralized Exchanges (DEX's)",
    bullets: [
      "DEX's walkthrough (Uniswap)",
      "Types of Dex's",
      "Yield farming, Liquidity pools and more",
    ],
    duration: "~1h",
  },
  {
    number: 7,
    title: "Narratives/Trends",
    bullets: ["Defi", "NFT's", "Metaverse"],
    duration: "~1h",
  },
  {
    number: 8,
    title: "Advanced Topics & Future",
    bullets: ["Tokenization", "Stablecoins", "AI in blockchain"],
    duration: "~1h",
  },
  {
    number: 9,
    title: "Research & Analytical Platforms",
    bullets: ["Analytical platforms", "Data providers", "Project analysis"],
    duration: "~1h",
  },
  {
    number: 10,
    title: "Layer 2, Layer 1 and Layer 0",
    bullets: [
      "Purpose and importance",
      "Future prospects",
      "Zk and Optimistic proofs",
    ],
    duration: "~1h",
  },
];

export default function CurriculumSection() {
  return (
    <section
      id="curriculum"
      className="md:py-24 bg-background pt-[86px] pb-[86px]"
    >
      <div className="container mx-auto px-4">
        <SectionHeadingReveal className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold md:mb-4"
            data-testid="text-curriculum-heading"
          >
            Course Curriculum
          </h2>
          <p className="hidden md:block text-muted-foreground max-w-2xl mx-auto">
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
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-sm md:text-lg">
                      {module.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="hidden md:flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold">{module.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full shrink-0">
                          <Clock className="h-3 w-3" />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                      <div className="md:hidden mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">
                            {module.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                            <Clock className="h-3 w-3" />
                            <span>{module.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block text-sm text-muted-foreground">
                        <ul className="list-disc pl-4 space-y-1">
                          {module.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                      <ul className="md:hidden space-y-1">
                        {module.bullets.map((bullet, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check
                              className="h-3 w-3 text-muted-foreground/60 shrink-0 mt-0.5"
                              strokeWidth={2}
                            />
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
