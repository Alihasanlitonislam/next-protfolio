"use client";

import { useState } from "react";
import { MessageSquareCode } from "lucide-react";
import HoverItem from "../share/HoverImage";
import { handleScroll } from "@/utils/handleScroll";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const MyResumeModal = dynamic(() => import("../share/MyResumeModal"), {
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.08,
    },
  },
};

const lineVariants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { y: 22, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function HeroComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="w-full bg-(--bg-primary) overflow-hidden"
      style={{
        backgroundImage: "url('/heroSection.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container grid grid-cols-1 xl:grid-cols-2 gap-14 items-center pt-28 md:pt-32 pb-24 lg:pt-44 lg:pb-32 xl:pt-56 xl:pb-44">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            variants={lineVariants}
            className="text-(--text-tertiary) text-[12px] md:text-[16px] mb-4 bg-(--bg-tertiary)/10 w-fit px-6 py-1.5 rounded-4xl border border-(--border-tertiary) flex items-center gap-2"
          >
            <MessageSquareCode className="animate-pulse text-(--icon-primary) w-5 h-5 " />{" "}
            Available for freelance work
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight font-mono"
          >
            {["Frontend Developer", "with 2+ years", "experience"].map(
              (line) => (
                <motion.span
                  key={line}
                  variants={lineVariants}
                  className={
                    line === "Frontend Developer"
                      ? "block"
                      : "block text-(--text-tertiary)"
                  }
                  style={{ display: "block", overflow: "hidden" }}
                >
                  {line}
                </motion.span>
              ),
            )}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-[12px] sm:text-[16px] md:text-xl mt-6 text-(--text-muted) leading-relaxed"
          >
            I specialize in building modern, responsive web applications using{" "}
            <span className="text-(--text-tertiary)">React</span>,{" "}
            <span className="text-(--text-tertiary)">Next</span>, and{" "}
            <span className="text-(--text-tertiary)">Vue</span>.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4 flex-wrap mt-8">
            <a
              onClick={(e) => handleScroll(e, "#contact")}
              className="px-5 py-2 rounded-xl bg-(--bg-tertiary) text-(--text-primary) text-[12px] sm:text-[16px] cursor-pointer"
            >
              Contact Me
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-5 py-2 rounded-xl border border-(--border-primary) text-(--text-tertiary) text-[12px] sm:text-[16px] hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition-colors duration-300 ease-in-out cursor-pointer"
            >
              View Resume
            </button>
          </motion.div>
        </motion.div>

        <div data-aos="zoom-in" className="relative flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 w-[320px] h-80 rounded-full bg-(--bg-tertiary)/10 blur-3xl"
          />

          <div className="relative w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-(--border-primary) p-2">
            <HoverItem
              image="/short_image.jpeg"
              displacement="/short_image.jpeg"
              css="rounded-full"
              intensity={0.4}
            />
            <motion.span
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="absolute top-10 -right-14 md:-right-20 bg-(--bg-tertiary)/5 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md text-[12px] sm:text-[16px]"
            >
              Vue.js
            </motion.span>

            <motion.span
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.4,
              }}
              className="absolute bottom-10 -left-16 md:-left-24 bg-(--bg-tertiary)/5 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md text-[12px] sm:text-[16px]"
            >
              Next.js
            </motion.span>

            <motion.span
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.8,
              }}
              className="absolute -bottom-10 md:-bottom-16 right-30 bg-(--bg-tertiary)/5 text-(--text-tertiary) text-sm px-3 py-1 border border-(--border-tertiary) rounded-md text-[12px] sm:text-[16px]"
            >
              React.js
            </motion.span>
          </div>
        </div>
      </div>
      <MyResumeModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Resume PDF"
        pdfUrl="/Resume-Front-End-by-Ali-Hasan.pdf"
      />
    </section>
  );
}
