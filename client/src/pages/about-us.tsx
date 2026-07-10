import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-home">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h1 data-testid="text-about-heading">About The Blockchain Pulse</h1>

              <p>
                The Blockchain Pulse is an Information Technology company registered with the Securities and Exchange Commission of Pakistan (SECP). We are dedicated to providing structured, accessible, and easy-to-understand education on blockchain technology, cryptocurrencies, and emerging digital innovations for the general public, beginners, professionals, and crypto enthusiasts.
              </p>

              <p>
                In addition to our educational initiatives, we offer modern co-working spaces and business incubation services designed to support freelancers, entrepreneurs, startups, and technology-driven ventures. Our ecosystem is focused on fostering innovation, collaboration, and sustainable growth through:
              </p>

              <ul>
                <li>Freelancer Growth &amp; Development Programs</li>
                <li>Professional Mentorship and Expert Guidance</li>
                <li>A Supportive and Collaborative Freelancer Ecosystem</li>
                <li>A Growth-Oriented Work Environment</li>
                <li>Continuous Skill Development Opportunities</li>
                <li>Startup Incubation, Support, and Business Development Services</li>
              </ul>

              <p>
                By combining education, mentorship, workspace solutions, and startup support, The Blockchain Pulse aims to empower individuals and businesses to thrive in the rapidly evolving digital economy while contributing to the growth of Pakistan's technology and innovation ecosystem.
              </p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
