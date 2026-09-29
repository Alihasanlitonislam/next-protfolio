"use client";

import React, { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";
import { handleScroll } from "@/utils/handleScroll";

interface CardSectionProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
}

const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ Icon, title, description, features }, ref) => {
    return (
      <div
        ref={ref}
        className="group relative bg-(--bg-secondary)/20 hover:bg-(--bg-secondary)/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-(--border-secondary) overflow-hidden"
      >
        <div className="relative z-10 space-y-4">
          <div className="inline-flex p-3 bg-(--bg-tertiary)/10 hover:bg-(--bg-tertiary)/20 rounded-lg">
            <Icon className="w-6 h-6 text-(--text-tertiary)" />
          </div>

          <div className="text-xl md:text-2xl font-bold">{title}</div>

          <p className="text-(--text-muted) text-[12px] sm:text-[16px] md:text-lg">
            {description}
          </p>

          {features && (
            <div className="flex flex-wrap gap-2 pt-4">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="px-5 py-1 rounded-xl border border-(--border-secondary) bg-(--bg-secondary)/10 text-(--text-muted) text-[12px] sm:text-[16px]"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
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
      </div>
    );
  }
);

CardSection.displayName = "CardSection";

export default CardSection;
