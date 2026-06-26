import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Blockchain Developer",
    avatar: "/avatars/john.jpg",
    quote: "This course completely transformed my understanding of blockchain technology. The hands-on exercises were invaluable.",
    company: "TechCorp"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Crypto Investor",
    avatar: "/avatars/jane.jpg",
    quote: "I've been in the crypto space for years, but this program gave me insights I never found anywhere else. Highly recommended!",
    company: "CryptoFund"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Software Engineer",
    avatar: "/avatars/mike.jpg",
    quote: "The instructors are industry experts who break down complex concepts into easy-to-understand lessons. Worth every penny.",
    company: "DevLabs"
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Financial Analyst",
    avatar: "/avatars/sarah.jpg",
    quote: "As someone new to blockchain, I was amazed at how quickly I could grasp the fundamentals. The curriculum is perfectly structured.",
    company: "FinTech Solutions"
  },
  {
    id: 5,
    name: "David Brown",
    role: "Entrepreneur",
    avatar: "/avatars/david.jpg",
    quote: "The real-world case studies and practical projects gave me the confidence to start my own blockchain venture. Life-changing!",
    company: "Startup Inc"
  }
];

export function HorizontalScrollTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          What Our Students Say
        </h2>

        {/* Mobile Horizontal Scroll - Flex Row */}
        <div className="relative">
          {/* Scroll container with flex row */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide"
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-shrink-0 w-72">
                <Card className="bg-card border-border h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-muted-foreground italic text-sm mb-2">"{testimonial.quote}"</p>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          {/* Scroll buttons - positioned absolutely */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-background rounded-full p-2 shadow-md hover:bg-muted z-10"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-background rounded-full p-2 shadow-md hover:bg-muted z-10"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
