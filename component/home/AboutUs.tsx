"use client";

import { useRef, useState } from "react";
import { GraduationCap, ShieldCheck, User } from "lucide-react";
import { aboutContent } from "@/content/aboutContent";
import { TabKey } from "@/type/about/aboutContent";
import HoverItem from "../share/HoverImage";
import useHoverAnimation from "@/hooks/useHoverAnimation";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("personal");

  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const filteredContent = aboutContent.filter(
    (item) => item.type === activeTab
  );

  useHoverAnimation({ titleRef, descriptionRef });

  return (
    <div id="about" className="w-full py-8 md:py-12 lg:py-20 bg-(--bg-secondary)">
      <div className="container">
        <div className="flex items-center flex-col">
          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-semibold"
          >
            About Me
          </span>

          <p
            ref={descriptionRef}
            className="text-(--text-muted) mt-4 text-center text-[12px] sm:text-[16px] md:text-xl"
          >
            A passionate Frontend Developer with{" "}
            <span className="text-(--text-tertiary)">2+ years</span> of
            experience
          </p>
        </div>

        <div data-aos="zoom-in" className="sm:mt-5 lg:mt-12 flex flex-col lg:flex-row  gap-10">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full lg:w-[35%] p-6 bg-(--bg-primary) rounded-2xl shadow-lg h-fit mt-10 lg:mt-20"
          >
            <div className="overflow-hidden w-full h-[400px] cursor-pointer">
              <HoverItem
                image="/full_image.jpeg"
                displacement="/full_image.jpeg"
                css="rounded-xl"
                intensity={0.4}
              />
            </div>

            <div className="mt-4">
              <h2 className="text-[16px] sm:text-lg md:text-2xl font-bold">
                MD Ali Hasan
              </h2>
              <p className="text-(--text-muted) text-[12px] sm:text-[16px] md:text-xl">
                Frontend Developer
              </p>
            </div>
          </motion.div>

          <div className="w-full lg:w-[65%]">
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
              {(["personal", "professional", "education"] as TabKey[]).map(
                (tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1 sm:px-5 xl:px-10 sm:py-2 rounded-2xl sm:rounded-4xl text-[12px] sm:text-[16px] md:text-xl font-medium text-(--text-tertiary) transition duration-300 cursor-pointer border  border-(--border-primary) flex items-center gap-1 sm:gap-3 hover:text-(--text-primary)  ${
                      activeTab === tab
                        ? "bg-(--bg-tertiary)/70 text-(--text-primary)! hover:bg-(--bg-tertiary) "
                        : "hover:bg-(--bg-tertiary)"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "personal" ? (
                      <User className="w-3 h-3 sm:w-5 sm:h-5" />
                    ) : tab === "professional" ? (
                      <ShieldCheck className="w-3 h-3 sm:w-5 sm:h-5" />
                    ) : (
                      <GraduationCap className="w-3 sm:w-6" />
                    )}

                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-(--bg-primary) p-6 rounded-xl space-y-4"
            >
              {filteredContent.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                  className="space-y-1.5"
                >
                  <div className="text-xl md:text-2xl font-semibold">
                    {item.title}
                  </div>
                  <p className="text-(--text-muted) text-[12px] sm:text-[16px] md:text-lg">
                    {item.discretion}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
