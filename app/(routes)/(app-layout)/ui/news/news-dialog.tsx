"use client";

import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import type { NewsPost } from "@/lib/actions/news/get-news";
import ImageWithFallback from "@/ui/components/image-with-fallback";
import MarkdownRenderer from "@/ui/components/markdown-renderer";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/ui/primitives/dialog";

type NewsDialogProps = {
  newsPost: NewsPost | null;
  opened: boolean;
  onClose: () => void;
};

export default function NewsDialog({
  newsPost,
  opened,
  onClose,
}: NewsDialogProps) {
  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined}>
        {newsPost && (
          <>
            <DialogTitle>Пост</DialogTitle>
            {newsPost.image && (
              <ImageWithFallback
                className="mx-auto max-h-96 w-auto"
                height={100}
                width={500}
                src={newsPost.image}
                alt="Изображение поста"
              />
            )}
            <MarkdownRenderer className="overflow-x-hidden sm:max-w-md">
              {newsPost.content}
            </MarkdownRenderer>
            <DialogFooter>
              <p className="hidden md:inline justify-self-start text-muted-foreground text-sm mr-auto">
                {formatDistance(newsPost.createdAt, new Date(), {
                  locale: ru,
                  addSuffix: true,
                })}
              </p>
              <Link
                className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-300"
                target="_blank"
                href={newsPost?.postLink || "/"}
              >
                К посту
              </Link>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
