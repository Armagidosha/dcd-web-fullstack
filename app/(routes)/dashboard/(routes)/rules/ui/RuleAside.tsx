import clsx from "clsx";
import {
  ChevronIcon,
  EditIcon,
  PlusIcon,
  RulesIcon,
  TrashIcon,
} from "@/app/shared/icons/icons";
import Button from "@/app/shared/ui/Button";
import IconButton from "@/app/shared/ui/IconButton";
import { useAsync } from "@/app/shared/utils/hooks";
import type { Rule } from "@/lib/generated/prisma/client";

interface RuleAsideProps {
  rules: Rule[];
  activeRule: string;
  setActiveRule: (rule: Rule) => void;
  startAdd: () => void;
  startEdit: (rule: Rule) => void;
  onDelete: (id: string) => Promise<void>;
  onMove: (id: string, order: -1 | 1) => Promise<void>;
}

export default function RuleAside({
  rules,
  activeRule,
  setActiveRule,
  startAdd,
  startEdit,
  onDelete,
  onMove,
}: RuleAsideProps) {
  const { isLoading, execute } = useAsync();

  return (
    <aside className="self-start lg:sticky lg:top-6">
      <nav className="bg-surface rounded-2xl overflow-hidden border border-border p-4">
        <div className="relative mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <RulesIcon className="text-secondary" />
            Разделы
          </h2>
        </div>

        <ul className="grid space-y-2 border-y border-border py-4 max-h-80 overflow-y-auto overscroll-contain">
          {rules?.map((rule, index) => {
            const isActive = activeRule === rule.id;
            return (
              <li key={rule.id}>
                {/** biome-ignore lint/a11y/noStaticElementInteractions: <> */}
                {/** biome-ignore lint/a11y/useKeyWithClickEvents: <> */}
                <div
                  className={clsx(
                    "group relative w-full px-4 py-3 rounded-xl cursor-pointer transition-colors duration-300 overflow-hidden",
                    isActive
                      ? "bg-secondary"
                      : "bg-surface-variant hover:bg-secondary/20",
                  )}
                  onClick={() => setActiveRule(rule)}
                >
                  <div className="w-full text-left">
                    <div className="flex items-center gap-3">
                      <span
                        className={clsx(
                          "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors duration-300",
                          isActive
                            ? "bg-light-text/20"
                            : "bg-secondary/20 group-hover:bg-secondary/50",
                        )}
                      >
                        {index + 1}
                      </span>
                      <span className="font-semibold text-sm">
                        {rule.title}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <>
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-light-text rounded-r-full" />
                      <div className="flex gap-1 mt-2 pt-2 border-t border-white/10">
                        <IconButton
                          disabled={isLoading || index === 0}
                          onClick={(evt) => {
                            evt.stopPropagation();
                            execute(onMove, rule.id, -1);
                          }}
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
                          disabled={isLoading || index === rules.length - 1}
                          onClick={(evt) => {
                            evt.stopPropagation();
                            execute(onMove, rule.id, 1);
                          }}
                          icon={
                            <ChevronIcon title="Вниз" width={20} height={20} />
                          }
                        />
                        <IconButton
                          disabled={isLoading}
                          onClick={(evt) => {
                            evt.stopPropagation();
                            startEdit(rule);
                          }}
                          icon={<EditIcon width={20} height={20} />}
                        />

                        <IconButton
                          disabled={isLoading}
                          className="hover:bg-primary/20! hover:text-primary!"
                          onClick={(evt) => {
                            evt.stopPropagation();
                            execute(onDelete, rule.id);
                          }}
                          icon={<TrashIcon width={20} height={20} />}
                        />
                      </div>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <Button className="mt-4" onClick={() => startAdd()} icon={<PlusIcon />}>
          Добавить раздел
        </Button>
      </nav>
    </aside>
  );
}
