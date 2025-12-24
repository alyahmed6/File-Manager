import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface MobileScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  return isMobile;
}

export function MobileScrollReveal({ 
  children, 
  delay = 0,
  className = ""
}: MobileScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.4, 
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface MobileScrollRevealGroupProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
  itemClassName?: string;
}

export function MobileScrollRevealGroup({
  children,
  staggerDelay = 0.08,
  className = "",
  itemClassName = ""
}: MobileScrollRevealGroupProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className={className}>
        {children.map((child, index) => (
          <div key={index} className={itemClassName}>{child}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <MobileScrollReveal 
          key={index} 
          delay={index * staggerDelay}
          className={itemClassName}
        >
          {child}
        </MobileScrollReveal>
      ))}
    </div>
  );
}
