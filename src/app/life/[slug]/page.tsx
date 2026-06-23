import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    <article className="mx-auto max-w-3xl">
      <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="text-lime-700 dark:text-lime-400">生活</span>
          <time dateTime={post.date}>{post.date}</time>
          {post.mood ? <span>{post.mood}</span> : null}
        </div>
        <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            {post.description}
          </p>
        ) : null}
      </header>
      <div className="prose prose-zinc max-w-none prose-headings:tracking-normal prose-a:text-lime-700 prose-pre:bg-zinc-950 dark:prose-a:text-lime-400">
        <PostBody code={post.mdx} />
      </div>
    </article>
  );
}
