"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BlogPost } from "@/content/blogPost";

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

export default function CategoryHero({ category }: { category: BlogPost }) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-[url('/blogs/blog_background.png')] bg-cover bg-center bg-no-repeat" />

      <div className="container relative grid min-h-[calc(100vh-10rem)] items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="text-center md:text-left">
            <motion.div
              variants={fadeUp}
              className="w-fit px-4 py-1.5 rounded-4xl border border-(--border-tertiary) bg-(--bg-tertiary)/15 text-(--text-tertiary) text-[12px] sm:text-[14px] inline-flex items-center gap-2 backdrop-blur"
            >
              <Sparkles className="w-4 h-4 text-(--icon-primary)" />
              {category.category}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mt-3 text-white"
            >
              {category.title}
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-[12px] sm:text-[16px] md:text-lg text-white/80 leading-relaxed max-w-2xl"
            >
              {category.summary}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="relative"
        >
          {category.image ? (
            <div className="h-[260px] w-full sm:h-[320px] md:h-[380px] rounded-md">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="rounded-md object-container"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex h-[260px] w-full items-center justify-center rounded-md bg-white/10 p-6 text-sm text-white/70 sm:h-[320px] md:h-[380px]">
              No image available
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
