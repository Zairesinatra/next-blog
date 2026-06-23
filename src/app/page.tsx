import { PostCard } from "@/components/post-card";
import { publishedPosts } from "@/lib/posts";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 border-b border-zinc-200 pb-10 dark:border-zinc-800 sm:grid-cols-[1fr_18rem] sm:items-end">
        <div>
          <p className="mb-4 text-sm font-medium text-lime-700 dark:text-lime-400">最新动态</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-6xl">
            技术、生活，以及正在发生的事。
          </h1>
        </div>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
          这里把硬核技术文章和生活碎碎念放在同一条时间线上，像真实的一天那样自然混合。
        </p>
      </section>

      <section aria-label="文章列表">
        {publishedPosts.map((post) => (
          <PostCard key={post.url} post={post} />
        ))}
      </section>
    </div>
  );
}
