"use client";

import { blogPosts } from "@/content/blogPost";
import Image from "next/image";
import Link from "next/link";

function BlogSection({ isShowAll = true }: { isShowAll?: boolean }) {
  return (
    <section
      id="blog"
      className="relative w-full py-10 md:py-14 lg:py-20 bg-(--bg-primary) section-bg overflow-hidden"
    >
      <div className="absolute inset-0 section-grid opacity-60" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xl sm:text-3xl md:text-5xl font-bold block">
              Latest Blog Posts
            </span>
            <p className="text-[12px] sm:text-[16px] md:text-xl text-(--text-muted)">
              Fresh insights on UI engineering, animation, and modern web
              workflows — crafted with the same clean aesthetic as this site.
            </p>
          </div>
          {isShowAll && (
            <Link
              href="/blog"
              className="self-start md:self-auto px-5 py-2 rounded-xl border border-(--border-primary) text-(--text-tertiary) text-[12px] sm:text-[16px] hover:bg-(--bg-tertiary) hover:text-(--text-primary) transition-colors duration-300"
            >
              View All Posts
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group relative overflow-hidden rounded-2xl border border-(--border-secondary) bg-(--bg-secondary)/70 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -inset-20 bg-linear-to-br from-(--bg-tertiary)/30 via-transparent to-[#9ED83F]/20" />
              </div>

              <div className="relative z-10 p-6 md:p-7 flex flex-col gap-5">
                <div className="h-60 rounded-xl border border-(--border-secondary) bg-linear-to-br from-[#1b1b22] via-[#111116] to-[#0b0b10] relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-tr from-(--bg-tertiary)/25 via-transparent to-[#9ED83F]/20" />
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain aspect-auto "
                      width={1000}
                      height={500}
                    />
                  )}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md text-[11px] sm:text-[12px] md:text-base bg-(--bg-primary) text-(--text-tertiary) border border-(--border-primary)">
                    {post.category}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-lg md:text-2xl font-semibold leading-snug">
                    {post.title}
                  </div>
                  <p className="text-(--text-muted) text-[12px] sm:text-[16px] md:text-lg leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] sm:text-[13px] text-(--text-muted)">
                  <span>{post.date}</span>
                  <span className="text-(--text-tertiary)">
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.link}`} className="mt-2 inline-flex items-center gap-2 text-[12px] sm:text-[15px] text-(--text-primary) font-medium group-hover:text-(--text-tertiary) transition-colors">
                  Read Article
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-(--bg-tertiary) opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
