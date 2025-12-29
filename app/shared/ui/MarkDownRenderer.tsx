import clsx from "clsx";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={clsx("prose prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-semibold mb-4 mt-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-semibold mb-3 mt-5" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-semibold mb-2 mt-4" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-7" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside mb-4 space-y-2"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-border pl-4 italic my-4 text-light-text"
              {...props}
            />
          ),
          // biome-ignore lint/suspicious/noExplicitAny: <>
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code
                className="bg-surface-variant rounded px-1.5 py-0.5 text-sm font-mono"
                {...props}
              />
            ) : (
              <code
                className="block bg-surface-variant rounded p-4 text-sm font-mono overflow-x-auto"
                {...props}
              />
            ),
          pre: ({ node, ...props }) => (
            <pre className="mb-4 overflow-x-auto" {...props} />
          ),
          a: ({ href, ...props }) => (
            <Link
              target="_blank"
              href={href || "#"}
              className="text-secondary hover:text-secondary/90 underline"
              {...props}
            >
              тык
            </Link>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
