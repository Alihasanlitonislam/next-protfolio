"use client"
import { handleScroll } from "@/utils/handleScroll";
import { Coffee, MoveRight, Star } from "lucide-react";
import useBottomToTopAnimation from "@/hooks/bottomToTopAnimation";
import { useRef } from "react";

function CteSection() {
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useBottomToTopAnimation(itemsRef);

  return (
    <section className="py-8 md:py-12 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-tr from-[#9ED83F]/20 via-blue-500/10 to-(--bg-tertiary)/20"></div>

      <div ref={(el) => { if(el) itemsRef.current[0] = el}} className="container max-w-4xl mx-auto relative">
        <div className="bg-(--bg-secondary)/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-(--border-secondary) text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-(--bg-tertiary)/10 rounded-full text-(--text-tertiary) text-[12px] md:text-[16px] font-medium mb-6">
            <Coffee className="w-5 h-5" />
            <span>Available for new projects</span>
          </div>

          <div className="text-xl sm:text-3xl md:text-5xl font-bold mb-4 bg-linear-to-r from-(--text-primary) to-(--text-muted) bg-clip-text text-transparent">
            Ready to Start Your Project?
          </div>
          <p className="text-(--text-muted) text-[12px] sm:text-[16px] md:text-xl mb-8 max-w-2xl mx-auto">
            Let&apos;s collaborate and bring your ideas to life. Get a free
            consultation and quote for your project today.
          </p>

          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 justify-center items-center">
            <a
              onClick={(e) => handleScroll(e, "#contact")}
              className="group flex items-center gap-3 bg-linear-to-r from-(--bg-tertiary)  to-[#9ED83F]/80 text-(--text-primary) px-6 py-3 rounded-xl font-medium hover:shadow-xl hover:shadow-[#9ED83F]/10 transition-all duration-300 text-[12px] sm:text-[16px] md:text-lg cursor-pointer"
            >
              Start Your Project
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 mt-10 pt-8 border-t border-(--border-secondary)">
            <div className="text-center">
              <div className="flex items-center  justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div className="text-[12px] md:text-[16px] text-(--text-muted)">
                5.0 Rating
              </div>
            </div>

            <div className="w-0.5 h-10 bg-(--border-secondary)"></div>

            <div className="text-center">
              <div className="text-lg md:text-2xl font-bold ">24/12</div>
              <div className="text-[12px] md:text-[16px] text-(--text-muted)">
                Support Available
              </div>
            </div>

            <div className="w-0.5 h-10 bg-(--border-secondary)"></div>

            <div className="text-center">
              <div className="text-lg md:text-2xl font-bold ">Fast</div>
              <div className="text-[12px] md:text-[16px] text-(--text-muted)">
                Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CteSection;
