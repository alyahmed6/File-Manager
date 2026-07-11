import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhoThisCourseIsForSection from "@/components/WhoThisCourseIsForSection";
import CourseSection from "@/components/CourseSection";
import CurriculumSection from "@/components/CurriculumSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Course() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollSnapType = "y mandatory";
    root.style.scrollPaddingTop = "4rem";
    return () => {
      root.style.scrollSnapType = "";
      root.style.scrollPaddingTop = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="snap-start"><HeroSection /></div>
        <div className="snap-start"><WhoThisCourseIsForSection /></div>
        <div className="snap-start"><CourseSection /></div>
        <div className="snap-start"><CurriculumSection /></div>
        <div className="snap-start"><PricingSection /></div>
        <div className="snap-start"><FAQSection /></div>
      </main>
      <Footer />
    </div>
  );
}
