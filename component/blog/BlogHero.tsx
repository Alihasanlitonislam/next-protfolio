"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogHero() {
  return (
    <section className="relative w-full bg-[url('/blogs/blog_background.png')] bg-cover bg-center bg-no-repeat overflow-hidden">

      <div className="container relative flex items-center justify-center flex-col h-[calc(100vh-20rem)]">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className=" text-center">
            <motion.div
              variants={fadeUp}
              className="w-fit px-4 py-1.5 rounded-4xl border border-(--border-tertiary) bg-(--bg-tertiary)/10 text-(--text-tertiary) text-[12px] sm:text-[14px] inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-(--icon-primary)" />
              Blog Insights Hub
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mt-2"
            >
              Frontend
              <span className="text-(--text-tertiary)"> Development</span> Blog.
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-[12px] sm:text-[16px] md:text-lg text-(--text-muted) leading-relaxed max-w-5xl"
            >
              Insights, tutorials, and updates on modern frontend development, covering React, Next.js, Vue, UI design, and real-world coding techniques that help you build better web experiences.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
