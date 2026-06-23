import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";

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
      slug,
      url: `/${category}/${slug}`,
      mdx: await compileMDX(context, document, {
        remarkPlugins: [remarkGfm],
      }),
    };
  },
});

export default defineConfig({
  content: [posts],
});
