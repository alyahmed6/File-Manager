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
              <h1 data-testid="text-about-heading">Your Gateway to Blockchain</h1>

              <p>
                The Blockchain Pulse is an Information Technology company registered with the Securities and Exchange Commission of Pakistan (SECP), dedicated to building a thriving ecosystem for innovation, entrepreneurship, and digital transformation. We provide professional co-working spaces, startup incubation services, and structured education in blockchain technology, Web3, and cryptocurrencies, creating a platform where individuals, freelancers, entrepreneurs, startups, and technology enthusiasts can learn, collaborate, and grow.
              </p>

              <p>
                Our mission is to bridge the gap between emerging technologies and practical opportunities by offering accessible blockchain and Web3 education, mentorship, skill development, and a supportive environment for innovation. Through our co-working and incubation ecosystem, we empower startups and professionals with the resources, guidance, networking opportunities, and collaborative workspace they need to transform ideas into successful ventures and contribute to the growth of the digital economy.
              </p>

              <h2>Courses Offered</h2>
              <p>
                We are launching a Blockchain & Cryptocurrency Basics course that combines recorded learning modules with live Q&A sessions, allowing learners to study at their own pace while still engaging directly for clarity and guidance. Upon successful completion of the course, participants will receive a certificate of completion from The Blockchain Pulse.
              </p>

              <h2>Community Engagement</h2>
              <p>We actively engage with our learning community through multiple social media platforms under the name The Blockchain Pulse, sharing educational content, updates, and insights related to blockchain, cryptocurrencies and emerging technologies.</p>

              <h2>Your Starting Point</h2>
              <p>
                The Blockchain Pulse is a hub for learning, collaboration, and innovation, offering blockchain and Web3 education alongside co-working and incubation services that help individuals and startups transform ideas into successful ventures.
              </p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
