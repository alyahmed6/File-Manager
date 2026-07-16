import { useEffect } from "react";
import Lenis from "lenis";
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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="min-h-[100dvh] flex flex-col justify-center"><HeroSection /></div>
        <div className="min-h-[100dvh] flex flex-col justify-center"><WhoThisCourseIsForSection /></div>
        <div className="min-h-[100dvh] flex flex-col justify-center"><CourseSection /></div>
        <div className="min-h-[100dvh] flex flex-col justify-center"><CurriculumSection /></div>
        <div className="min-h-[100dvh] flex flex-col justify-center"><PricingSection /></div>
        <div className="min-h-[100dvh] flex flex-col justify-center"><FAQSection /></div>
      </main>
      <div><Footer /></div>
    </div>
  );
}
