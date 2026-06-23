import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { z } from "zod";

function createHeadingId(text: string, counts: Map<string, number>) {
  const base =
    text
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-") || "section";
  const count = counts.get(base) ?? 0;
  counts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

function getHeadings(content: string) {
  const counts = new Map<string, number>();

  return Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm)).map((match) => {
    const text = match[2].trim();

    return {
      id: createHeadingId(text, counts),
      level: match[1].length,
      text,
    };
  });
}

function getReadingTime(content: string) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#>*_`[\]-]/g, "")
    .trim();

  return Math.max(1, Math.ceil(plainText.length / 500));
}

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    mood: z.string().optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(["draft", "published"]).default("published"),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const normalizedPath = document._meta.path.replaceAll("\\", "/");
    const [section, ...slugParts] = normalizedPath.split("/");
    const slug = slugParts.join("/");
    const category = section === "life" ? "life" : "tech";

    return {
      ...document,
      category,
      headings: getHeadings(document.content),
      readingTime: getReadingTime(document.content),
      slug,
      url: `/${category}/${slug}`,
      mdx: await compileMDX(context, document, {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              keepBackground: false,
              theme: {
                light: "github-light",
                dark: "github-dark",
              },
            },
          ],
        ],
        remarkPlugins: [remarkGfm],
      }),
    };
  },
});

export default defineConfig({
  content: [posts],
});
