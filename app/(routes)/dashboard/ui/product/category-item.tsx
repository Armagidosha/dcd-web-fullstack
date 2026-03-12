import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import type { CategoryWithProductCount } from "@/lib/actions/category/get-category";
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

type CategoryItemProps = {
  category: CategoryWithProductCount;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CategoryItem({
  category,
  onEdit,
  onDelete,
}: CategoryItemProps) {
  return (
    <Item size="xs" variant="muted">
      <ItemContent>
        <ItemTitle>{category.name}</ItemTitle>
        <ItemDescription>
          Продуктов в категории: {category._count.products}
        </ItemDescription>
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
