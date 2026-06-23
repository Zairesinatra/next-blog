import Link from "next/link";
import { Code2, Coffee } from "lucide-react";
import { getCategoryLabel } from "@/lib/posts";

type PostCardProps = {
  post: {
    title: string;
    date: string;
    description?: string;
    mood?: string;
    tags: string[];
    category: "tech" | "life";
    url: string;
  };
};

export function PostCard({ post }: PostCardProps) {
  const Icon = post.category === "tech" ? Code2 : Coffee;

  return (
    <article className="border-b border-zinc-200 py-7 first:pt-0 dark:border-zinc-800">
      <Link href={post.url} className="group block">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
            <Icon size={16} />
            {getCategoryLabel(post.category)}
          </span>
          <time dateTime={post.date}>{post.date}</time>
          {post.mood ? <span>{post.mood}</span> : null}
        </div>
        <h2 className="text-2xl font-semibold tracking-normal text-zinc-950 transition group-hover:text-lime-700 dark:text-zinc-50 dark:group-hover:text-lime-400">
          {post.title}
        </h2>
        {post.description ? (
          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            {post.description}
          </p>
        ) : null}
        {post.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </Link>
    </article>
  );
}
