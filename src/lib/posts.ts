import { allPosts } from "content-collections";

export type PostCategory = "tech" | "life";

function normalizePost(post: (typeof allPosts)[number]) {
  return {
    ...post,
    category: post.category as PostCategory,
  };
}

export const publishedPosts = allPosts
  .map(normalizePost)
  .filter((post) => post.status === "published")
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPostsByCategory(category: PostCategory) {
  return publishedPosts.filter((post) => post.category === category);
}

export function getPost(category: PostCategory, slug: string) {
  return publishedPosts.find(
    (post) => post.category === category && post.slug === slug,
  );
}

export function getCategoryLabel(category: PostCategory) {
  return category === "tech" ? "技术" : "生活";
}
