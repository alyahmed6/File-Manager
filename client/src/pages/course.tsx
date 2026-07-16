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
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-section]"));
    if (!sections.length) return;

    let locked = false;

    const getCurrentIdx = () => {
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < sections.length; i++) {
        const d = Math.abs(sections[i].getBoundingClientRect().top);
        if (d < bestDist) { bestDist = d; best = i; }
      }
      return best;
    };

    const goTo = (dir: number) => {
      if (locked) return;
      const cur = getCurrentIdx();
      const next = cur + dir;
      if (next < 0 || next >= sections.length) return;
      locked = true;
      lenis.scrollTo(sections[next], { offset: 0, force: true, duration: 1.2 });
      setTimeout(() => { locked = false; }, 1300);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10) return;
      if (locked) { e.preventDefault(); return; }
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

    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      lenis.destroy();
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
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
