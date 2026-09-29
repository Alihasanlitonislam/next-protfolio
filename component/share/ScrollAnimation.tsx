"use client";

import { useEffect, useRef, ReactNode } from "react";
import AOS from "aos";

interface ScrollAnimationProps {
  children: ReactNode;
}

export default function ScrollAnimation({
  children,
}: ScrollAnimationProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    el.setAttribute("data-aos", "fade-up");
    el.setAttribute("data-aos-duration", "600");
    AOS.refresh();
  }, []);

  return (
    <div ref={elRef} data-aos="fade-up" data-aos-duration="600">
      {children}
    </div>
  );
}
