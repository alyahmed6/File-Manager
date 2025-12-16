import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CourseSection from "@/components/CourseSection";
import CurriculumSection from "@/components/CurriculumSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CourseSection />
        <CurriculumSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
