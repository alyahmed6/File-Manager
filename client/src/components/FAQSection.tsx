import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long is the course?",
    answer: "The course runs for 2 months and includes 10 comprehensive modules. You can learn at your own pace as all videos are downloadable.",
  },
  {
    question: "Do I need any prior knowledge of blockchain or cryptocurrency?",
    answer: "No prior knowledge is required.",
  },
  {
    question: "How will I access the course content?",
    answer: "All course videos are delivered through our Discord server. Once enrolled, you'll get access to downloadable video lessons that you can watch anytime, anywhere.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept PKR via bank transfer and cryptocurrency payments in USDT. Detailed payment instructions will be provided after registration.",
  },
  {
    question: "Will I receive a certificate upon completion?",
    answer: "Yes.",
  },
  {
    question: "Is there community support available?",
    answer: "Yes! You'll have access to our active Discord community where you can interact with fellow learners, ask questions, and get guidance from our team.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Due to the digital nature of the course, all sales are final. However, if you experience technical issues preventing access, please contact our support within 14 days for review.",
  },
  {
    question: "Is this course financial advice?",
    answer: "No, this course is purely educational. We teach you about blockchain technology and cryptocurrencies, but we do not provide financial, tax, or investment advice.",
  },
  {
    question: "Who is behind The Blockchain Pulse?",
    answer: "The Blockchain Pulse is a company registered with the Securities and Exchange Commission of Pakistan (SECP), committed to providing quality blockchain education.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-heading">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about our blockchain course.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border px-6"
                data-testid={`accordion-faq-${index}`}
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
