import clsx from "clsx";
import type { Rule } from "@/lib/generated/prisma/client";

interface RulesNavigationProps {
  rules: Rule[];
  activeRule: string;
  onSectionChange: (ruleId: string) => void;
}

export default function RulesNavigation({
  rules,
  activeRule,
  onSectionChange,
}: RulesNavigationProps) {
  return (
    <aside className="self-start lg:sticky lg:top-25">
      <nav className="relative gradient-bg backdrop-blur-sm rounded-2xl overflow-hidden ring-1 ring-border/40 p-6">
        {/* Декоративный градиент */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

        {/* Заголовок навигации */}
        <div className="relative mb-4">
          <h2 className="text-xl font-bold text-light-text flex items-center gap-2">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Иконка файла</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Навигация
          </h2>
          <div className="h-px mt-3 bg-linear-to-r from-border/50 via-border/20 to-transparent" />
        </div>

        {/* Список разделов */}
        <ul className="relative space-y-2">
          {rules.map((rule, index) => (
            <li key={rule.id}>
              <button
                type="button"
                onClick={() => onSectionChange(rule.id)}
                className={clsx(
                  "group relative w-full text-left px-4 py-3 rounded-xl transition-all duration-300",
                  "ring-1 overflow-hidden",
                  activeRule === rule.id
                    ? "bg-primary ring-primary/50 shadow-lg shadow-primary/30"
                    : "bg-surface-variant/50 ring-border/20 hover:ring-border/60 hover:bg-surface-variant hover:-translate-x-1 cursor-pointer",
                )}
              >
                {/* Номер раздела */}
                <div className="relative flex items-center gap-3">
                  <span
                    className={clsx(
                      "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors duration-300",
                      activeRule === rule.id
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
                      activeRule === rule.id
                        ? "text-white"
                        : "text-light-text group-hover:text-primary",
                    )}
                  >
                    {rule.title}
                  </span>
                </div>

                {/* Индикатор активности */}
                {activeRule === rule.id && (
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
