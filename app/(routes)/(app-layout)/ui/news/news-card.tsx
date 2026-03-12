"use client";

import type { NewsPost } from "@/lib/actions/news/get-news";
import ImageWithFallback from "@/ui/components/image-with-fallback";
import MarkdownRenderer from "@/ui/components/markdown-renderer";
import { Card, CardContent } from "@/ui/primitives/card";

interface NewsCardProps {
  newsPost: NewsPost;
  onClick: () => void;
}

export default function NewsCard({ newsPost, onClick }: NewsCardProps) {
  return (
    <Card
      className="h-100 transition-transform hover:scale-103 cursor-pointer"
      onClick={onClick}
    >
      <CardContent>
        {newsPost.image && (
          <ImageWithFallback
            className="object-cover h-full w-full max-h-52 border border-border/20 rounded-md"
            width={450}
            height={100}
            src={newsPost.image}
            alt="Картинка поста"
          />
        )}
        <MarkdownRenderer
          className={newsPost.image ? "line-clamp-6" : "line-clamp-13"}
        >
          {newsPost.content}
        </MarkdownRenderer>
      </CardContent>
    </Card>
  );
}
