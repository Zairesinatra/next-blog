import { PostCard } from "@/components/post-card";
import { getPostsByCategory } from "@/lib/posts";

export const metadata = {
  title: "技术",
  description: "硬核技术文章列表。",
};

export default function TechPage() {
  const posts = getPostsByCategory("tech");

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium text-lime-700 dark:text-lime-400">Tech</p>
        <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">硬核技术</h1>
      </header>
      <section aria-label="技术文章列表">
        {posts.map((post) => (
          <PostCard key={post.url} post={post} />
        ))}
      </section>
    </div>
  );
}
