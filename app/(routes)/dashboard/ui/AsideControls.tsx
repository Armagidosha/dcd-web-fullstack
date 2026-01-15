import { useCallback } from "react";
import { PlusIcon } from "@/app/shared/icons/icons";
import Button from "@/app/shared/ui/Button";
import { useAsync } from "@/app/shared/utils/hooks";
import AsideItem from "./AsideItem";

interface BaseElement {
  id: string;
  title: string;
}

interface AsideControlsProps<T> {
  elements: T[];
  activeElement: string;
  setActiveElement: (element: T) => void;
  startAdd?: () => void;
  startEdit?: (element: T) => void;
  onDelete?: (id: string) => Promise<void>;
  onMove?: (id: string, order: -1 | 1) => Promise<void>;
  icon?: React.ElementType;
}

export default function AsideControls<T extends BaseElement>({
  icon: Icon,
  elements,
  activeElement,
  setActiveElement,
  startAdd,
  startEdit,
  onDelete,
  onMove,
}: AsideControlsProps<T>) {
  const { isLoading, execute } = useAsync();

  const handleMove = useCallback(
    (id: string, direction: -1 | 1) => {
      if (onMove) {
        execute(onMove, id, direction);
      }
    },
    [onMove, execute],
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (onDelete) {
        execute(onDelete, id);
      }
    },
    [onDelete, execute],
  );

  if (!elements?.length) {
    return (
      <div className="self-start lg:sticky lg:top-6">
        <nav className="bg-surface rounded-2xl overflow-hidden border border-border p-4">
          <div className="relative mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {Icon && <Icon className="text-secondary" />}
              Разделы
            </h2>
          </div>
          <p className="text-sm text-dimmed mb-4">Нет разделов</p>
          {startAdd && (
            <Button variant="secondary" onClick={startAdd} icon={<PlusIcon />}>
              Добавить раздел
            </Button>
          )}
        </nav>
      </div>
    );
  }

  return (
    <aside className="self-start lg:sticky lg:top-6">
      <nav
        className="bg-surface rounded-2xl overflow-hidden border border-border p-4"
        aria-label="Разделы"
      >
        <div className="relative mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {Icon && <Icon className="text-secondary" />}
            Разделы
          </h2>
        </div>

        <ul className="grid space-y-2 border-y border-border py-4 max-h-80 overflow-y-auto overscroll-contain">
          {elements.map((element, index) => (
            <AsideItem<T>
              key={element.id}
              element={element}
              index={index}
              isActive={activeElement === element.id}
              isFirst={index === 0}
              isLast={index === elements.length - 1}
              isLoading={isLoading}
              onSelect={setActiveElement}
              onEdit={startEdit}
              onDelete={onDelete ? handleDelete : undefined}
              onMove={onMove ? handleMove : undefined}
            />
          ))}
        </ul>

        {startAdd && (
          <Button
            variant="secondary"
            className="mt-4"
            onClick={startAdd}
            icon={<PlusIcon />}
          >
            Добавить раздел
          </Button>
        )}
      </nav>
    </aside>
  );
}
