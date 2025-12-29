import clsx from "clsx";
import { memo, useCallback } from "react";
import { ChevronIcon, EditIcon, TrashIcon } from "@/app/shared/icons/icons";
import IconButton from "@/app/shared/ui/IconButton";

type BaseItem = {
  id: string;
  title: string;
};

interface AsideItemProps<T extends BaseItem> {
  element: T;
  index: number;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  isLoading: boolean;
  onSelect: (item: T) => void;
  onEdit?: (rule: T) => void;
  onDelete?: (id: string) => void;
  onMove?: (id: string, direction: -1 | 1) => void;
}

function AsideItemComponent<T extends BaseItem>({
  element,
  index,
  isActive,
  isFirst,
  isLast,
  isLoading,
  onSelect,
  onEdit,
  onDelete,
  onMove,
}: AsideItemProps<T>) {
  const handleClick = useCallback(() => {
    onSelect(element);
  }, [onSelect, element]);

  const handleEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit?.(element);
    },
    [onEdit, element],
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete?.(element.id);
    },
    [onDelete, element.id],
  );

  const handleMoveUp = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onMove?.(element.id, -1);
    },
    [onMove, element.id],
  );

  const handleMoveDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onMove?.(element.id, 1);
    },
    [onMove, element.id],
  );

  const itemClasses = clsx(
    "group relative w-full px-4 py-3 rounded-xl cursor-pointer",
    "transition-colors duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary",
    isActive ? "bg-secondary" : "bg-surface-variant hover:bg-secondary/20",
  );

  const badgeClasses = clsx(
    "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors duration-300",
    isActive
      ? "bg-light-text/20"
      : "bg-secondary/20 group-hover:bg-secondary/50",
  );

  return (
    <li>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <> */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: <> */}
      <div className={itemClasses} onClick={handleClick}>
        <div className="flex items-center gap-3">
          <span className={badgeClasses}>{index + 1}</span>
          <span className="font-semibold text-sm">{element.title}</span>
        </div>

        {isActive && (
          <>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-light-text rounded-r-full" />

            <div className="flex gap-1 mt-2 pt-2 border-t border-white/10">
              {onMove && (
                <>
                  <IconButton
                    disabled={isLoading || isFirst}
                    onClick={handleMoveUp}
                    icon={
                      <ChevronIcon
                        title="Вверх"
                        className="rotate-180"
                        width={20}
                        height={20}
                      />
                    }
                  />
                  <IconButton
                    disabled={isLoading || isLast}
                    onClick={handleMoveDown}
                    icon={<ChevronIcon title="Вниз" width={20} height={20} />}
                  />
                </>
              )}

              {onEdit && (
                <IconButton
                  disabled={isLoading}
                  onClick={handleEdit}
                  icon={<EditIcon width={20} height={20} />}
                />
              )}

              {onDelete && (
                <IconButton
                  disabled={isLoading}
                  className="hover:bg-primary/20! hover:text-primary!"
                  onClick={handleDelete}
                  icon={<TrashIcon width={20} height={20} />}
                />
              )}
            </div>
          </>
        )}
      </div>
    </li>
  );
}

const AsideItem = memo(AsideItemComponent) as typeof AsideItemComponent;

export default AsideItem;
