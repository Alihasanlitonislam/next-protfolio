import BlogHero from "@/component/blog/BlogHero";
import BlogSection from "@/component/home/BlogSection";

export default function BlogPage() {
  return (
    <div>
      <BlogHero />
      <BlogSection isShowAll={false} />
    </div>
  );
}
