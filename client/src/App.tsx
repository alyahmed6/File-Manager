import { useEffect } from "react";
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

function App() {
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const vid = document.getElementById("bg-video") as HTMLVideoElement;
    if (!vid) return;
    vid.style.visibility = isHome ? "visible" : "hidden";
  }, [isHome]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity duration-500 pointer-events-none ${isHome ? "opacity-100" : "opacity-0"}`}
          style={{ zIndex: 1 }}
        />
        <ScrollProgressBar />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
