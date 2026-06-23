import { PostCard } from "@/components/post-card";
import { getPostsByCategory } from "@/lib/posts";

export const metadata = {
  title: "生活",
  description: "生活碎碎念列表。",
};

export default function LifePage() {
  const posts = getPostsByCategory("life");

  return (
    <div className="space-y-8">
      <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium text-lime-700 dark:text-lime-400">Life</p>
        <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50">生活碎碎念</h1>
      </header>
      <section aria-label="生活文章列表">
        {posts.map((post) => (
          <PostCard key={post.url} post={post} />
        ))}
      </section>
    </div>
  );
}
