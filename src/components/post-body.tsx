import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/components/mdx-components";

export function PostBody({ code }: { code: string }) {
  return <MDXContent code={code} components={mdxComponents} />;
}
