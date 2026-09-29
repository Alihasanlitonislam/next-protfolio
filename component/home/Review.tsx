"use client";

import { useMemo, useRef } from "react";
import { reviews } from "@/content/clientReview";
import { Star } from "lucide-react";
import { Review } from "@/type/reviews/reviewsContent";
import useHoverAnimation from "@/hooks/useHoverAnimation";
import { motion } from "framer-motion";

const pathVariants = {
  animate: (index: number) => ({
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 1,
      delay: index * 0.4,
      ease: "easeInOut",
    },
  }),
};

export default function ReviewComponent() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useHoverAnimation({ titleRef, descriptionRef });

  const chunkSize = useMemo(() => Math.ceil(reviews.length / 3), []);
  const col1 = useMemo(() => reviews.slice(0, chunkSize), [chunkSize]);
  const col2 = useMemo(() => reviews.slice(chunkSize, chunkSize * 2), [chunkSize]);
  const col3 = useMemo(() => reviews.slice(chunkSize * 2), [chunkSize]);

  const renderReviews = (items: Review[]) =>
    [...items, ...items].map((review, index) => (
      <div
        key={`${review.name}-${index}`}
        className="p-6 rounded-2xl bg-(--bg-primary) border border-(--border-secondary) transition-colors duration-300 group flex flex-col justify-between w-full shrink-0"
      >
        <div>
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < review.rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-gray-600 text-gray-600"
                }`}
              />
            ))}
          </div>
          <p className="text-(--text-muted) line-clamp-4 leading-relaxed text-[12px] sm:text-[16px]">
            &quot;{review.review}&quot;
          </p>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <div className="w-12 h-12 rounded-full bg-(--bg-tertiary)/10 flex items-center justify-center text-(--text-tertiary) font-bold text-2xl shrink-0">
            {review.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <div className="font-semibold text-(--text-primary) truncate text-[12px] sm:text-[16px] md:text-xl">
              {review.name}
            </div>
            <p className="text-[12px] sm:text-[16px] text-(--text-tertiary) truncate">
              {review.company}
            </p>
          </div>
        </div>
      </div>
    ));

  return (
    <section
      className="pt-20 lg:pt-36 pb-20 bg-(--bg-secondary) space-y-10 overflow-hidden"
      id="review"
    >
      <div className="text-center container pb-10">
        <div className="relative inline-block ">
          <div className="absolute -top-10 -left-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="74"
              viewBox="0 0 68 74"
              fill="none"
            >
              {[
                "M22.4259 68.5278C16.0259 66.7318 9.32534 65.8258 2.82534 64.9958C1.42534 64.8218 0.125535 65.7928 0.0255346 67.1608C-0.174465 68.5298 0.826121 69.7818 2.12612 69.9557C8.42612 70.7548 14.9255 71.6097 21.0255 73.3387C22.3255 73.7137 23.7261 72.9418 24.1261 71.6138C24.5261 70.2868 23.7259 68.9038 22.4259 68.5278Z",
                "M41.8251 43.0648C31.5251 32.5538 19.9251 23.3958 9.8251 12.6028C8.9251 11.5948 7.3251 11.5408 6.3251 12.4818C5.3251 13.4238 5.22549 15.0078 6.22549 16.0158C16.3255 26.8398 27.9255 36.0278 38.2255 46.5698C39.2255 47.5538 40.8251 47.5678 41.8251 46.5998C42.7251 45.6328 42.8251 44.0488 41.8251 43.0648Z",
                "M61.1264 2.63576C61.4264 8.65176 61.7259 14.6678 62.0259 20.6848C62.0259 22.0628 63.2264 23.1268 64.6264 23.0598C66.0264 22.9918 67.0259 21.8188 67.0259 20.4398C66.7259 14.4138 66.4264 8.38876 66.1264 2.36376C66.0264 0.985757 64.8262 -0.0712432 63.4262 0.00375683C62.1262 0.0787568 61.0264 1.25876 61.1264 2.63576Z",
              ].map((d, index) => (
                <motion.path
                  key={d}
                  d={d}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="fill-(--text-tertiary)"
                  variants={pathVariants}
                  animate="animate"
                  custom={index}
                />
              ))}
            </svg>
          </div>

          <span
            ref={titleRef}
            className="text-xl sm:text-3xl md:text-5xl font-bold block text-center mb-3"
          >
            Client Experiences
          </span>
        </div>

        <p
          ref={descriptionRef}
          className="text-center text-[12px] sm:text-[16px] md:text-xl text-(--text-muted) max-w-5xl mx-auto"
        >
          Honest feedback from clients highlighting their experience with our
          design quality, development approach, and overall collaboration across
          real-world projects.
        </p>
      </div>

      <div className="relative h-[600px] overflow-hidden container">
        <div className="pointer-events-none absolute left-0 top-0 w-full h-24 bg-linear-to-b from-(--bg-secondary) to-transparent z-20" />
        <div className="pointer-events-none absolute left-0 bottom-0 w-full h-24 bg-linear-to-t from-(--bg-secondary) to-transparent z-20" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 h-full">
          <div className="overflow-hidden relative h-full px-6 sm:px-0">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
              {renderReviews(col1)}
            </motion.div>
          </div>
          <div className="overflow-hidden relative h-full hidden md:block">
            <motion.div
              className="flex flex-col gap-6 px-6 sm:px-0"
              animate={{ y: ["-50%", "0%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
              {renderReviews(col2)}
            </motion.div>
          </div>
          <div className="overflow-hidden relative h-full hidden xl:block">
            <motion.div
              className="flex flex-col gap-6 px-6 sm:px-0"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            >
              {renderReviews(col3)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
