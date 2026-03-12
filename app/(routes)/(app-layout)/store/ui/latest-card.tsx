"use client";

import type { Latest } from "@/lib/actions/payment/get-latest";
import ImageWithFallback from "@/ui/components/image-with-fallback";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/ui/primitives/item";

type LatestCardProps = {
  latest: Latest;
};

export default function LatestCard({ latest }: LatestCardProps) {
  return (
    <Item className="bg-card/90 backdrop-blur-xs rounded-xl p-3 group">
      <ItemMedia className="border border-border rounded-xl overflow-hidden">
        <ImageWithFallback
          className="relative z-10 transition-transform duration-500 group-hover:scale-110 object-cover"
          width={64}
          height={64}
          src={latest.product.image}
          alt={latest.product.name}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{latest.nickname} купил(а)</ItemTitle>
        <ItemDescription>{latest.product.name}</ItemDescription>
      </ItemContent>
    </Item>
  );
}
