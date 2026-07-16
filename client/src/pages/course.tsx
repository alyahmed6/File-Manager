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
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-section]"));
    if (!sections.length) return;

    let currentIdx = 0;
    let locked = false;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const updateIndex = () => {
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < sections.length; i++) {
        const dist = Math.abs(sections[i].getBoundingClientRect().top);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      }
      currentIdx = bestIdx;
    };

    const goTo = (dir: number) => {
      if (locked) return;
      const target = currentIdx + dir;
      if (target < 0 || target >= sections.length) return;
      locked = true;
      currentIdx = target;
      lenis.scrollTo(sections[target], { offset: 0, duration: 1.4 });
      setTimeout(() => { locked = false; updateIndex(); }, 1400);
    };

    const onWheel = (e: WheelEvent) => {
      if (locked || Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      goTo(e.deltaY > 0 ? 1 : -1);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dy) < 50) return;
      goTo(dy < 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section data-section className="min-h-[100dvh] flex flex-col justify-center"><HeroSection /></section>
        <section data-section className="min-h-[100dvh] flex flex-col justify-center"><WhoThisCourseIsForSection /></section>
        <section data-section className="min-h-[100dvh] flex flex-col justify-center"><CourseSection /></section>
        <section data-section className="min-h-[100dvh] flex flex-col justify-center"><CurriculumSection /></section>
        <section data-section className="min-h-[100dvh] flex flex-col justify-center"><PricingSection /></section>
        <section data-section className="min-h-[100dvh] flex flex-col justify-center"><FAQSection /></section>
      </main>
      <section><Footer /></section>
    </div>
  );
}
