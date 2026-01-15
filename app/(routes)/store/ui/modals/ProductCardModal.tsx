"use client";

import MarkdownRenderer from "@shared/ui/MarkDownRenderer";
import Paper from "@/app/shared/ui/Paper";
import type { Product } from "@/lib/generated/prisma/client";
import ProductPurchaseForm from "../forms/ProductPurchaseForm";

interface ProductModalProps {
  product: Pick<Product, "price" | "description" | "id">;
}

export default function ProductCardModal({ product }: ProductModalProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Paper className="flex-1 p-4" variant="secondary" withBorder withGradient>
        <h3 className="text-lg font-semibold mb-2 text-primary">Описание</h3>
        <MarkdownRenderer content={product.description} />
      </Paper>

      <Paper className="p-4" variant="secondary" withBorder withGradient>
        <ProductPurchaseForm
          className="flex-1"
          product={{ id: product.id, price: product.price }}
        />
      </Paper>
    </div>
  );
}
