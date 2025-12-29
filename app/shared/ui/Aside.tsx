import clsx from "clsx";

type Element = {
  id: string;
  content: string;
  title: string;
};

interface RulesNavigationProps {
  elements: Element[];
  activeElement: string;
  icon?: React.ReactElement;
  title?: string;
  onElementChange: (ruleId: string) => void;
}

export default function AsideNavigation({
  elements,
  activeElement,
  icon,
  title,
  onElementChange,
}: RulesNavigationProps) {
  return (
    <aside className="self-start lg:sticky lg:top-25">
      <nav className="relative gradient-bg backdrop-blur-sm rounded-2xl overflow-hidden border border-border/40 p-6">
        {/* Декоративный градиент */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

        {/* Заголовок навигации */}
        <div className="relative mb-4">
          <h2 className="text-xl font-bold text-light-text flex items-center gap-2">
            {icon && icon}
            {title ?? "Навигация"}
          </h2>
          <div className="h-px mt-3 bg-linear-to-r from-border/50 via-border/20 to-transparent" />
        </div>

        {/* Список разделов */}
        <ul className="relative space-y-2">
          {elements?.map((el, index) => (
            <li key={el.id}>
              <button
                type="button"
                onClick={() => onElementChange(el.id)}
                className={clsx(
                  "group relative w-full text-left px-4 py-3 rounded-xl transition-all duration-300",
                  "border overflow-hidden",
                  activeElement === el.id
                    ? "bg-primary border-primary/50 shadow-lg shadow-primary/30"
                    : "bg-surface-variant/50 border-border/20 hover:border-border/60 hover:bg-surface-variant hover:-translate-x-1 cursor-pointer",
                )}
              >
                {/* Номер раздела */}
                <div className="relative flex items-center gap-3">
                  <span
                    className={clsx(
                      "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors duration-300",
                      activeElement === el.id
                        ? "bg-white/20 text-white"
                        : "bg-surface-variant text-dim-text group-hover:bg-primary/20 group-hover:text-primary",
                    )}
                  >
                    {index + 1}
                  </span>

                  {/* Название раздела */}
                  <span
                    className={clsx(
                      "font-semibold text-sm transition-colors duration-300",
                      activeElement === el.id
                        ? "text-white"
                        : "text-light-text group-hover:text-primary",
                    )}
                  >
                    {el.title}
                  </span>
                </div>

                {/* Индикатор активности */}
                {activeElement === el.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-white/50 rounded-r-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
