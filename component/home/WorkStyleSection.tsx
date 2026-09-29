"use client";

import { workStyles } from "@/content/workStyles";
import useBottomToTopAnimation from "@/hooks/bottomToTopAnimation";
import useHoverAnimation from "@/hooks/useHoverAnimation";
import { handleScroll } from "@/utils/handleScroll";
import { useRef } from "react";

function WorkStyleSection() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const itemsRef = useRef<HTMLDivElement[]>([]);

  useHoverAnimation({ titleRef, descriptionRef });
  useBottomToTopAnimation(itemsRef);  


  return (
    <section className="relative w-full py-8 md:py-12 lg:py-20 bg-(--bg-secondary)">
      <div className="container max-w-6xl mx-auto text-(--text-primary) bg-(--bg-secondary)">
        <div className="space-y-4 mb-8 md:mb-10 text-center">
          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-bold block text-center"
          >
            How I Work
          </span>
          <p
            ref={descriptionRef}
            className="text-center text-[12px] sm:text-[16px] md:text-xl text-(--text-muted) max-w-4xl mx-auto"
          >
            My approach to collaboration ensures smooth projects and successful
            outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 bg-(--bg-secondary)">
          {workStyles.map((style, idx) => {
            const Icon = style.icon;
            return (
              <div
                key={style.title}
                ref={(el: HTMLDivElement | null) => {
                  if (el) itemsRef.current[idx] = el;
                }}
                className="relative group bg-(--bg-tertiary)/10 rounded-xl p-6 md:p-8 border border-(--border-secondary) transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-(--text-tertiary)/30 group-hover:text-(--text-tertiary)/50 transition-colors">
                  {style.number}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex p-3 bg-(--bg-tertiary)/10 rounded-lg">
                    <Icon className="w-6 h-6 text-(--text-tertiary)" />
                  </div>

                  <div className="space-y-3">
                    <div className="text-lg md:text-2xl font-bold">
                      {style.title}
                    </div>
                    <p className="text-(--text-muted) leading-relaxed text-[12px] sm:text-[16px] md:text-lg">
                      {style.description}
                    </p>
                  </div>
                  <div className="flex gap-2 md:gap-4 flex-wrap mt-4 md:mt-8">
                    <a
                      onClick={(e) => handleScroll(e, "#contact")}
                      className="px-5 py-2 rounded-xl border border-(--border-primary) text-(--text-tertiary) text-[12px] sm:text-[16px] hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                      Get in Touch
                    </a>

                    <a
                      href="https://wa.me/8801783228430"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-xl border border-(--border-primary) text-(--text-tertiary) text-[12px] sm:text-[16px] hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-(--bg-tertiary) opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default WorkStyleSection;
