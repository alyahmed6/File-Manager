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
    const root = document.documentElement;
    root.style.scrollSnapType = "y mandatory";
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      root.style.scrollSnapType = "";
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="snap-start min-h-[100dvh] flex flex-col justify-center"><HeroSection /></section>
        <section className="snap-start min-h-[100dvh] flex flex-col justify-center"><WhoThisCourseIsForSection /></section>
        <section className="snap-start min-h-[100dvh] flex flex-col justify-center"><CourseSection /></section>
        <section className="snap-start min-h-[100dvh] flex flex-col justify-center"><CurriculumSection /></section>
        <section className="snap-start min-h-[100dvh] flex flex-col justify-center"><PricingSection /></section>
        <section className="snap-start min-h-[100dvh] flex flex-col justify-center"><FAQSection /></section>
      </main>
      <section className="snap-start"><Footer /></section>
    </div>
  );
}
