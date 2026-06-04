import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhoThisCourseIsForSection from "@/components/WhoThisCourseIsForSection";
import CourseSection from "@/components/CourseSection";
import CurriculumSection from "@/components/CurriculumSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Course() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Blockchain Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 pt-[70px] pb-[70px] md:pt-6 md:pb-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYmI1ZTgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhoLTEydjJoMTJ6bTAtNFYyNGgtMTJ2Mmgxem0wLTRWMjBoLTEydjJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
              {/* Blockchain Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/50 shadow-lg"
              >
                <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20" fill="none">
                  <defs>
                    <linearGradient id="blockchainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3bb5e8" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#blockchainGrad)" strokeWidth="2" fill="none">
                    <path d="M30 30 L50 20 L70 30 L70 50 L50 60 L30 50 Z" />
                    <path d="M50 20 L50 60" />
                    <path d="M30 30 L50 40" />
                    <path d="M70 30 L50 40" />
                    <circle cx="50" cy="40" r="4" fill="url(#blockchainGrad)" />
                  </g>
                </svg>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Master <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Crypto & Blockchain</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              >
                Learn everything you need to know about blockchain technology, Web3, and cryptocurrency from industry experts. Start your journey today.
              </motion.p>
            </div>
          </div>
        </section>

        <HeroSection />
        <WhoThisCourseIsForSection />
        <CourseSection />
        <CurriculumSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
