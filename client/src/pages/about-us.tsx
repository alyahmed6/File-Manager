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
              <h1 data-testid="text-about-heading">About Us</h1>

              <p>
                The Blockchain Pulse is an Information Technology company registered with the Securities and Exchange Commission of Pakistan (SECP). We are dedicated to providing structured, easy-to-understand education on blockchain technology and cryptocurrencies for the general public, beginners, and crypto enthusiasts.
              </p>

              <h2>Our Mission</h2>
              <p>
                Our mission is to simplify blockchain and crypto concepts and make them accessible to anyone interested in understanding how decentralized technologies work. As the digital economy continues to evolve, we aim to equip learners with accurate knowledge, practical insights, and foundational skills—without technical complexity or misleading information.
              </p>

              <h2>What We Offer</h2>
              <p>
                We are launching a Blockchain & Cryptocurrency Basics course that combines recorded learning modules with live Q&A sessions, allowing learners to study at their own pace while still engaging directly for clarity and guidance. Upon successful completion of the course, participants will receive a certificate of completion from The Blockchain Pulse.
              </p>

              <h2>Education Over Speculation</h2>
              <p>
                At The Blockchain Pulse, we emphasize education over speculation. Our content is designed purely for learning purposes and does not constitute financial, investment, or trading advice. We encourage responsible learning and informed decision-making when exploring blockchain and digital assets.
              </p>

              <h2>Community Engagement</h2>
              <p>
                We actively engage with our learning community through multiple social media platforms under the name The Blockchain Pulse, sharing educational content, updates, and insights related to blockchain and emerging technologies.
              </p>

              <h2>Your Starting Point</h2>
              <p>
                Whether you are new to blockchain or looking to build a strong conceptual foundation, The Blockchain Pulse is your trusted starting point in understanding the future of decentralized technology.
              </p>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
