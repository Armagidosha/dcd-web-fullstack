"use client";

import { Dot, EllipsisVertical, Pencil, Power, Trash } from "lucide-react";
import type { PromoCode } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils/functions/cn";
import { Button } from "@/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/primitives/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/ui/primitives/item";

type PromoCodeItemProps = {
  promo: PromoCode;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
};
export default function PromoItem({
  promo,
  onEdit,
  onDelete,
  onToggleStatus,
}: PromoCodeItemProps) {
  const isExpired = promo.validTo && new Date(promo.validTo) < new Date();
  const isValid = !isExpired && promo.isActive;

  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle>
          <span>{promo.code}</span>
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            -{promo.discount}%
          </span>
        </ItemTitle>

        <ItemDescription>{promo.description ?? "Без описания"}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          {promo.usageLimit && (
            <span className="text-xs text-muted-foreground">
              {promo.usedCount}/{promo.usageLimit}
            </span>
          )}
          <Dot
            className={cn(
              "animate-pulse",
              isValid ? "text-success-foreground" : "text-destructive",
            )}
            width={50}
            height={50}
          />
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onToggleStatus()}>
              <Power />
              {promo.isActive ? "Деактивировать" : "Активировать"}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onEdit()}>
              <Pencil size={20} />
              Изменить
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => onDelete()} variant="destructive">
              <Trash size={20} />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}
