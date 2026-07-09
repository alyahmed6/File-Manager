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
