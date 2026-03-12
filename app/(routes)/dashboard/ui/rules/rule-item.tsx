"use client";

import { ChevronUp, EllipsisVertical, Pencil, Trash } from "lucide-react";
import type { Rule } from "@/lib/generated/prisma/client";
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

type RuleItemProps = {
  rule: Rule;
  ruleLastIndex: number;
  onEdit: () => void;
  onDelete: () => void;
  onReorder: (direction: -1 | 1) => void;
};

export default function RuleItem({
  rule,
  ruleLastIndex,
  onEdit,
  onDelete,
  onReorder,
}: RuleItemProps) {
  return (
    <Item variant="muted">
      <ItemActions className="flex flex-col">
        <Button
          disabled={rule.order === 1}
          onClick={() => onReorder(-1)}
          variant="ghost"
          size="icon-sm"
        >
          <ChevronUp />
        </Button>
        <Button
          disabled={rule.order === ruleLastIndex}
          onClick={() => onReorder(1)}
          variant="ghost"
          size="icon-sm"
        >
          <ChevronUp className="rotate-180" />
        </Button>
      </ItemActions>
      <ItemContent className="overflow-x-hidden">
        <ItemTitle>{rule.title}</ItemTitle>
        <ItemDescription>{rule.content}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
