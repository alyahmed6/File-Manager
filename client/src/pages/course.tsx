import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray<HTMLElement>("section[data-section]");
    if (sections.length < 2) return;

    const totalScroll = (sections.length - 1) * window.innerHeight;

    const st = ScrollTrigger.create({
      trigger: sections[0].parentElement,
      start: "top top",
      end: () => `+=${totalScroll}`,
      pin: true,
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: 0.2,
        delay: 0,
        ease: "power3.out",
      },
      animation: gsap.to(sections, {
        yPercent: -100 * (sections.length - 1),
        ease: "none",
      }),
    });

    return () => { st.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section data-section className="h-screen flex flex-col justify-center"><HeroSection /></section>
        <section data-section className="h-screen flex flex-col justify-center"><WhoThisCourseIsForSection /></section>
        <section data-section className="h-screen flex flex-col justify-center"><CourseSection /></section>
        <section data-section className="h-screen flex flex-col justify-center"><CurriculumSection /></section>
        <section data-section className="h-screen flex flex-col justify-center"><PricingSection /></section>
        <section data-section className="h-screen flex flex-col justify-center"><FAQSection /></section>
      </main>
      <section><Footer /></section>
    </div>
  );
}
