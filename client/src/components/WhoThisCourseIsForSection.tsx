import { Button } from "@/components/ui/button";
import { MobileScrollReveal } from "@/components/MobileScrollReveal";
import { SectionHeadingReveal } from "@/components/SectionHeadingReveal";
import { 
  GraduationCap, 
  TrendingUp, 
  Briefcase, 
  Video, 
  Megaphone, 
  Newspaper, 
  BookOpen, 
  Rocket, 
  Scale, 
  Users 
} from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students & Beginners",
    description: "Your first step into crypto & Web3",
  },
  {
    icon: TrendingUp,
    title: "Crypto Investors",
    description: "Learn → Earn. Understand before investing.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    description: "Add certificate to your Upwork & Fiverr profile",
  },
  {
    icon: Video,
    title: "Content Creators",
    description: "Grow your audience through knowledge",
  },
  {
    icon: Megaphone,
    title: "Digital Marketers",
    description: "Web3 brands need marketers who \"get crypto\"",
  },
  {
    icon: Newspaper,
    title: "Tech Journalists",
    description: "Stronger Web3 stories",
  },
  {
    icon: BookOpen,
    title: "Educators & Trainers",
    description: "Schools & bootcamps lack Web3 educators",
  },
  {
    icon: Rocket,
    title: "Startup Founders",
    description: "Founders need to evaluate Web3 ideas",
  },
  {
    icon: Scale,
    title: "Legal & Compliance Professionals",
    description: "Crypto regulation is expanding — stay ahead",
  },
  {
    icon: Users,
    title: "Community Managers",
    description: "DAOs and Discord server management",
  },
];

export default function WhoThisCourseIsForSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-[76px] pb-12 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeadingReveal className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold"
            data-testid="text-who-course-section-heading"
          >
            Who This Course Is For
          </h2>
        </SectionHeadingReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {audiences.map((audience, index) => (
            <MobileScrollReveal key={index} delay={index * 0.06}>
              <div
                className="flex flex-col items-center text-center p-4 rounded-lg bg-card/50 border border-border/50 hover-elevate transition-all duration-200 h-full"
                data-testid={`card-audience-${index}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <audience.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{audience.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </MobileScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Ready to start learning crypto the right way?
          </p>
          <div className="flex flex-col items-center">
            <a href="https://forms.gle/DMo848mtY8u2UbC1A" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground border border-accent"
                data-testid="button-who-course-cta"
              >
                Join the Early Access Waitlist
              </Button>
            </a>
            <span className="text-xs text-muted-foreground mt-2">No payment required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
