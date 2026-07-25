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
    window.scrollTo(0, 0);
    return () => {
      root.style.scrollSnapType = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="snap-start min-h-[100dvh] flex flex-col">
          <Header />
          <div className="flex-1 flex flex-col justify-center"><HeroSection /></div>
        </div>
        <div className="snap-start min-h-[100dvh] flex flex-col justify-center"><WhoThisCourseIsForSection /></div>
        <div className="snap-start min-h-[100dvh] flex flex-col justify-center"><CourseSection /></div>
        <div className="snap-start min-h-[100dvh] flex flex-col justify-center"><CurriculumSection /></div>
        <div className="snap-start min-h-[100dvh] flex flex-col justify-center"><PricingSection /></div>
        <div className="snap-start min-h-[100dvh] flex flex-col justify-center"><FAQSection /></div>
      </main>
      <div className="snap-start"><Footer /></div>
    </div>
  );
}
