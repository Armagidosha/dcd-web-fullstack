"use client";

import type { ProductWithCategoryPublic } from "@/lib/actions/product/get-products";
import MarkdownRenderer from "@/ui/components/markdown-renderer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/primitives/dialog";
import { Separator } from "@/ui/primitives/separator";
import PurchaseForm from "./purchase-form";

type ProductDialogProps = {
  product: ProductWithCategoryPublic | null;
  opened: boolean;
  onClose: () => void;
};

export default function ProductDialog({
  product,
  opened,
  onClose,
}: ProductDialogProps) {
  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="xl:max-w-5xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{product?.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col xl:flex-row gap-6">
          <MarkdownRenderer className="w-full overflow-x-hidden sm:max-w-md">
            {product?.description}
          </MarkdownRenderer>
          <Separator orientation="vertical" />
          <div>
            <h2 className="text-xl font-semibold mb-4">Оформление покупки</h2>
            <PurchaseForm product={product} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
