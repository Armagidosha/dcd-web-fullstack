import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import type { ProductWithCategory } from "@/lib/actions/product/get-products";
import ImageWithFallback from "@/ui/components/image-with-fallback";
import { Badge } from "@/ui/primitives/badge";
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

type ProductItemProps = {
  product: ProductWithCategory;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ProductItem({
  product,
  onEdit,
  onDelete,
}: ProductItemProps) {
  return (
    <Item variant="muted">
      <ImageWithFallback
        className="aspect-square rounded-md"
        width={50}
        height={50}
        src={product.image}
        alt={product.name}
      />
      <ItemContent className="overflow-x-hidden">
        <ItemTitle className="grid md:grid-cols-[160px_110px_150px] text-nowrap">
          <h3 className="truncate">{product.name}</h3>
          <span className="hidden md:inline text-muted-foreground truncate">
            Price: {product.price}₽
          </span>
          <span className="hidden md:inline text-muted-foreground truncate">
            Key: {product.key}
          </span>
        </ItemTitle>
        <ItemDescription>{product.description}</ItemDescription>
      </ItemContent>
      <ItemContent>
        <Badge className="hidden md:block">{product.category?.name}</Badge>
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
