import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Calendar, Users, Shield, TrendingUp } from "lucide-react";
import whoThisCourseIsFor from "@assets/who_this_course_is_for_1765909582513.png";

const features = [
  {
    icon: Award,
    title: "Certification",
    description: "Receive a verified certificate upon successful completion of all modules.",
  },
  {
    icon: BookOpen,
    title: "Hands-on Learning",
    description: "Practical exercises and real-world examples to reinforce your understanding.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Learn at your own pace with downloadable videos accessible anytime.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join our active Discord community for peer learning and expert guidance.",
  },
  {
    icon: Shield,
    title: "SECP Registered",
    description: "Course offered by a Securities and Exchange Commission registered company.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Learn to analyze crypto projects using professional research platforms.",
  },
];

export default function CourseSection() {
  return (
    <section id="course" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-course-heading">Why Choose Us</h2>
          <p className="text-xl md:text-2xl font-semibold text-primary mb-2">
            Learn First, Earn Later
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">Cut through the noise of fake crypto gurus. Our comprehensive curriculum is designed to give you real knowledge and practical skills.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-feature-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <img 
            src={whoThisCourseIsFor} 
            alt="Who this course is for: Students & beginners, Non-technical users, First-time crypto investors, Anyone confused by crypto jargon, Professionals looking to upskill" 
            className="max-w-full md:max-w-lg rounded-xl shadow-lg"
            data-testid="img-who-this-course-is-for"
          />
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">10</span>
              <span className="text-muted-foreground">Comprehensive Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">10</span>
              <span className="text-muted-foreground">Video Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</span>
              <span className="text-muted-foreground">Months Duration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
