import { useEffect } from "react";
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
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: "rgba(59,181,232,0.5)" }} />
                <p className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "#3bb5e8" }}>
                  About Us
                </p>
                <div className="h-px w-8" style={{ background: "rgba(59,181,232,0.5)" }} />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold" data-testid="text-about-heading">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">About The Blockchain Pulse</span>
              </h1>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none">

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
