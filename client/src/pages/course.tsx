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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="h-screen flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth"
      style={{ overscrollBehaviorY: "contain", touchAction: "pan-y" }}
    >
      <main className="flex-1">
        <div
          className="snap-start h-screen flex flex-col overflow-hidden"
          style={{ scrollSnapStop: "always" }}
        >
          <Header />
          <div className="flex-1 flex flex-col justify-center"><HeroSection /></div>
        </div>
        <div
          className="snap-start h-screen flex flex-col overflow-hidden justify-center"
          style={{ scrollSnapStop: "always" }}
        >
          <WhoThisCourseIsForSection />
        </div>
        <div
          className="snap-start h-screen flex flex-col overflow-hidden justify-center"
          style={{ scrollSnapStop: "always" }}
        >
          <CourseSection />
        </div>
        <div
          className="snap-start h-screen flex flex-col overflow-hidden justify-center"
          style={{ scrollSnapStop: "always" }}
        >
          <CurriculumSection />
        </div>
        <div
          className="snap-start h-screen flex flex-col overflow-hidden justify-center"
          style={{ scrollSnapStop: "always" }}
        >
          <PricingSection />
        </div>
        <div
          className="snap-start h-screen flex flex-col overflow-hidden justify-center"
          style={{ scrollSnapStop: "always" }}
        >
          <FAQSection />
        </div>
      </main>
      <div className="snap-start" style={{ scrollSnapStop: "always" }}>
        <Footer />
      </div>
    </div>
  );
}
