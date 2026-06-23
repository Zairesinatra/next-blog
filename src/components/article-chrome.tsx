import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoryLabel, type PostCategory } from "@/lib/posts";

type Heading = {
  id: string;
  level: number;
  text: string;
};

type ArticleChromeProps = {
  category: PostCategory;
  children: React.ReactNode;
  date: string;
  description?: string;
  headings: Heading[];
  mood?: string;
  readingTime: number;
  title: string;
};

export function ArticleChrome({
  category,
  children,
  date,
  description,
  headings,
  mood,
  readingTime,
  title,
}: ArticleChromeProps) {
  const categoryLabel = getCategoryLabel(category);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_13rem]">
      <article className="mx-auto w-full max-w-3xl">
        <Link
          href={`/${category}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeft size={16} />
          返回{categoryLabel}
        </Link>
        <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <Link
              href="/"
              className="transition hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              首页
            </Link>
            <span>/</span>
            <Link
              href={`/${category}`}
              className="text-lime-700 transition hover:text-lime-800 dark:text-lime-400 dark:hover:text-lime-300"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <time dateTime={date}>{date}</time>
            <span>{readingTime} min read</span>
            {mood ? <span>{mood}</span> : null}
          </div>
          <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              {description}
            </p>
          ) : null}
        </header>
        <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-normal prose-a:text-lime-700 prose-code:font-mono prose-code:text-[0.92em] prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 dark:prose-a:text-lime-400">
          {children}
        </div>
      </article>

      {headings.length > 0 ? (
        <aside className="hidden lg:block">
          <div className="sticky top-24 border-l border-zinc-200 pl-5 text-sm dark:border-zinc-800">
            <p className="mb-3 font-medium text-zinc-950 dark:text-zinc-50">目录</p>
            <nav className="space-y-2">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block leading-6 text-zinc-500 transition hover:text-lime-700 dark:text-zinc-400 dark:hover:text-lime-400 ${
                    heading.level === 3 ? "pl-3" : ""
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
