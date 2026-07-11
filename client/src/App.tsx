import { useEffect, useRef } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import CompanyLanding from "@/pages/company-landing";
import Course from "@/pages/course";
import Register from "@/pages/register";
import AboutUs from "@/pages/about-us";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import NotFound from "@/pages/not-found";
import Admin from "@/pages/admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CompanyLanding} />
      <Route path="/course" component={Course} />
      <Route path="/register" component={Register} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/admin" component={Admin} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

function BackgroundVideo({ visible }: { visible: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.play().catch(() => {});

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (video.videoWidth && video.videoHeight && !video.paused && !video.ended) {
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        const cw = canvas.width;
        const ch = canvas.height;
        const scale = Math.max(cw / vw, ch / vh);
        const sw = vw * scale;
        const sh = vh * scale;
        const sx = (cw - sw) / 2;
        const sy = (ch - sh) / 2;
        ctx.drawImage(video, 0, 0, vw, vh, sx, sy, sw, sh);
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <video ref={videoRef} autoPlay muted loop playsInline className="fixed opacity-0 pointer-events-none" style={{ zIndex: -1 }}>
        <source src="/WhatsApp.mp4" type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ zIndex: 0, background: "#000" }}
      />
    </>
  );
}

function App() {
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BackgroundVideo visible={isHome} />
        <div className={`fixed inset-0 bg-black/30 transition-opacity duration-500 ${isHome ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ zIndex: 1 }} />

        <ScrollProgressBar />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
