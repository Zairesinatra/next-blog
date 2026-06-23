"use client";

import { Check, Copy } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { useRef, useState } from "react";

function getLanguage(props: ComponentPropsWithoutRef<"pre">) {
  const language = props["data-language" as keyof typeof props];

  if (typeof language === "string" && language.length > 0) {
    return language;
  }

  return "text";
}

export function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = getLanguage(props);

  async function copyCode() {
    const text = preRef.current?.innerText.trim();

    if (!text) {
      return;
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="group relative my-7 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 shadow-sm dark:border-zinc-800">
      <div className="flex h-10 items-center justify-between border-b border-white/10 px-4">
        <span className="font-mono text-xs uppercase tracking-normal text-zinc-400">
          {language}
        </span>
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 px-2 text-xs text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          onClick={copyCode}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre {...props} ref={preRef} className="m-0 overflow-x-auto p-4 text-sm leading-relaxed" />
    </div>
  );
}
