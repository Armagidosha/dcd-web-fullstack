"use client";

import type { ProductWithCategoryPublic } from "@/lib/actions/product/get-products";
import ImageWithFallback from "@/ui/components/image-with-fallback";
import { Badge } from "@/ui/primitives/badge";
import { Button } from "@/ui/primitives/button";
import { Card, CardContent } from "@/ui/primitives/card";
import { Separator } from "@/ui/primitives/separator";

type ProductCardProps = {
  product: ProductWithCategoryPublic;
  onClick: () => void;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card key={product.key}>
      <CardContent className="group">
        <div className="relative rounded-lg border overflow-hidden aspect-square">
          <ImageWithFallback
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={215}
            height={215}
            src={product.image}
            alt={product.name}
          />
          <Badge className="absolute bottom-2 left-2" variant="outline">
            {product.category?.name}
          </Badge>
        </div>
        <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
        <Separator className="my-4" />
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-semibold">
              Цена
            </span>
            <span className="text-2xl text-primary font-bold">
              {product.price}₽
            </span>
          </div>
          <Button
            type="button"
            className="self-end px-4 hover:scale-107"
            size="lg"
            onClick={() => onClick()}
          >
            Купить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
