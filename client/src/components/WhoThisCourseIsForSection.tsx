import { CheckCircle } from "lucide-react";

const audiences = [
  "Students and beginners",
  "Crypto investors",
  "Freelancers",
  "Content creators",
  "Tech journalists",
  "Non-technical users",
  "Anyone confused by crypto jargon",
  "Professionals looking to upskill",
];

export default function WhoThisCourseIsForSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold"
            data-testid="text-who-course-section-heading"
          >
            Who This Course Is For
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {audiences.map((audience, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm md:text-base text-foreground">{audience}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
