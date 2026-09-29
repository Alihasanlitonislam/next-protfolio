"use client";

import { services } from "@/content/services";
import useHoverAnimation from "@/hooks/useHoverAnimation";
import { useRef } from "react";
import CardSection from "../share/CardSection";
import useBottomToTopAnimation from "@/hooks/bottomToTopAnimation";


function ServicesSection() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const itemsRef = useRef<HTMLDivElement[]>([]);

  useHoverAnimation({ titleRef, descriptionRef });
  useBottomToTopAnimation(itemsRef);

  return (
    <section id="services" className="relative w-full py-8 md:py-12 lg:py-20 bg-(--bg-primary)">
      <div className="absolute inset-0 bg-linear-to-br from-[#9ED83F]/20 via-blue-500/10 to-(--bg-tertiary)/50" />

      <div className="container relative z-10">
        <div className="space-y-4 mb-8 md:mb-16 text-center">
          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-bold"
          >
            Services & Expertise
          </span>

          <p
            ref={descriptionRef}
            className="text-center text-[12px] sm:text-[16px] md:text-xl text-(--text-muted) max-w-4xl mx-auto mt-4"
          >
            Comprehensive frontend development services tailored to your project
            needs. From UI implementation to full-stack solutions.
          </p>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, idx) => (
            <CardSection
              key={service.title}
              ref={(el: HTMLDivElement | null) => {
                if (el) itemsRef.current[idx] = el;
              }}
              title={service.title}
              description={service.description}
              features={service.features}
              Icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
