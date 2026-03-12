"use client";

import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils/functions/cn";
import { Separator } from "../primitives/separator";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight mt-6 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight mt-6 mb-3 border-b pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
  ),
  p: ({ children }) => <p className="leading-7 mb-2">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-2">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 pl-4 italic text-muted-foreground my-4">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <Link
      href={href as string}
      className="font-medium underline underline-offset-4 hover:text-primary"
    >
      {children}
    </Link>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className);

    return isBlock ? (
      <div className="relative my-4">
        <p className="absolute -top-2 left-2 text-xs px-2">
          {className?.replace("language-", "")}
        </p>

        <pre className="rounded-xl bg-muted p-4 overflow-x-auto text-sm">
          <code>{children}</code>
        </pre>
      </div>
    ) : (
      <code className="px-1.5 py-0.5 rounded-md bg-muted text-sm">
        {children}
      </code>
    );
  },
  hr: () => <Separator className="my-6" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border px-3 py-2 text-left font-semibold bg-muted">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border px-3 py-2 align-top">{children}</td>
  ),
  strong: ({ children }) => (
    <span className="font-semibold text-foreground">{children}</span>
  ),
  em: ({ children }) => (
    <span className="italic text-foreground">{children}</span>
  ),
};

type MarkdownRendererProps = {
  children: string | undefined;
  className?: string;
};

export default function MarkdownRenderer({
  children,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={cn("wrap-break-word", className)}>
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {children}
      </Markdown>
    </div>
  );
}
