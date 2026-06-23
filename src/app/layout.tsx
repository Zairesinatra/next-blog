import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Rss } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My Blog",
    template: "%s | My Blog",
  },
  description: "硬核技术分享与生活碎碎念。",
};

const navItems = [
  { href: "/", label: "首页" },
  { href: "/tech", label: "技术" },
  { href: "/life", label: "生活" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
          <header className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
              <Link href="/" className="text-base font-semibold tracking-normal">
                My Blog
              </Link>
              <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="hidden items-center gap-1 sm:flex">
                <ThemeToggle />
                <Link
                  className="grid size-9 place-items-center rounded-md text-zinc-600 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  href="/rss.xml"
                  title="RSS"
                >
                  <Rss size={18} />
                </Link>
                <Link
                  className="grid size-9 place-items-center rounded-md text-zinc-600 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                  href="https://github.com/Zairesinatra"
                  title="GitHub"
                >
                  <Code2 size={18} />
                </Link>
              </div>
            </div>
          </header>
          <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:py-14">
            {children}
          </main>
          <footer className="border-t border-zinc-200 dark:border-zinc-800">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <span>Built with Next.js, MDX, and Content Collections.</span>
              <span>静态生成，推送即发布。</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
