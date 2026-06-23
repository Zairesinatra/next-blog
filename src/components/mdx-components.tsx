import type { ComponentPropsWithoutRef } from "react";

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  return <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" />;
}

export const mdxComponents = {
  a: Anchor,
};
