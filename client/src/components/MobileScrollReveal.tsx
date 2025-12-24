import { useRef, useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MobileScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MobileScrollReveal({ 
  children, 
  delay = 0,
  className = ""
}: MobileScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!hasMounted || !isMobile || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasMounted, isMobile]);

  if (!hasMounted) {
    return <div className={className}>{children}</div>;
  }

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ 
        duration: 0.35, 
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
