import Typescript from "@/component/blog/category/Typescript";
import { blogPosts } from "@/content/blogPost";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const categoryBlog = blogPosts.find(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );

  if (!categoryBlog) {
    notFound();
  }

  switch (category) {
    case categoryBlog.category.toLowerCase():
      return <Typescript post={categoryBlog}/>;
    default:
      notFound();
  }
}