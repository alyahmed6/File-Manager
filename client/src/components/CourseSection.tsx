import { Card, CardContent } from "@/components/ui/card";
import { MobileScrollReveal } from "@/components/MobileScrollReveal";
import { SectionHeadingReveal } from "@/components/SectionHeadingReveal";
import {
  Award,
  BookOpen,
  Calendar,
  Users,
  Shield,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Certification",
    description:
      "Earn a verifiable certificate you can share on LinkedIn or post on Upwork after completing all modules.",
  },
  {
    icon: BookOpen,
    title: "Hands-on Learning",
    description:
      "Practice with real examples so you actually understand how crypto works — not just theory.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description:
      "Learn at your own pace with downloadable videos accessible anytime.",
  },
  {
    icon: Users,
    title: "Community Support (live Q&A)",
    description:
      "Get help inside our beginner-friendly Discord community with guidance from mentors.",
  },
  {
    icon: Shield,
    title: "SECP Registered",
    description:
      "Course offered by a Securities and Exchange Commission registered company.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description:
      "Learn how to research crypto projects responsibly using professional tools — no trading signals.",
  },
];

export default function CourseSection() {
  return (
    <section id="course" className="pt-[92px] pb-28 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeadingReveal className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold md:mb-4"
            data-testid="text-course-heading"
          >
            Why Choose Us
          </h2>
          <p className="hidden md:block text-xl md:text-2xl font-semibold text-primary mb-2">
            Learn First. Understand Clearly. Earn Responsibly.
          </p>
          <p className="hidden md:block text-muted-foreground max-w-2xl mx-auto">
            Cut through the noise of fake crypto gurus. Our comprehensive
            curriculum is designed to give you real knowledge and practical
            skills.
          </p>
        </SectionHeadingReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <MobileScrollReveal key={index} delay={index * 0.08}>
              <Card
                className="hover-elevate transition-all duration-300 h-full"
                data-testid={`card-feature-${index}`}
              >
                <CardContent className="p-6 pl-[16px] pr-[16px] pt-[16px] pb-[16px]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
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
