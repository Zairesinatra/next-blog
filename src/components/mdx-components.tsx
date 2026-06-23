import type { ComponentPropsWithoutRef } from "react";
import { CodeBlock } from "@/components/code-block";

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  return <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" />;
}

export const mdxComponents = {
  a: Anchor,
  pre: CodeBlock,
};
