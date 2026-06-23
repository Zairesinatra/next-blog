import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleChrome } from "@/components/article-chrome";
import { PostBody } from "@/components/post-body";
import { getPost, getPostsByCategory } from "@/lib/posts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPostsByCategory("life").map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("life", slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function LifePostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost("life", slug);

  if (!post) {
    notFound();
  }

  return (
    <ArticleChrome
      category="life"
      date={post.date}
      description={post.description}
      headings={post.headings}
      mood={post.mood}
      readingTime={post.readingTime}
      title={post.title}
    >
      <PostBody code={post.mdx} />
    </ArticleChrome>
  );
}
