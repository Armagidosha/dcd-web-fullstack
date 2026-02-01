"use client";

import MarkdownRenderer from "@shared/ui/MarkDownRenderer";
import { useState } from "react";
import AsideNavigation from "@/app/shared/ui/Aside";
import type { Rule } from "@/lib/generated/prisma/client";
import { RulesIcon } from "@/ui/icons/ui.icons";

interface RulesProps {
  rules: Rule[];
}

export default function Rules({ rules }: RulesProps) {
  const [activeRule, setActiveRule] = useState(rules[0]?.id ?? "");

  const currentRule = rules.find((s) => s.id === activeRule);

  const handleChange = (ruleId: string) => {
    setActiveRule(ruleId);
  };
  return (
    <section className="section pt-25!">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        {/* Навигация слева */}

        <AsideNavigation
          title="Разделы"
          icon={<RulesIcon className="text-primary" />}
          elements={rules}
          activeElement={activeRule}
          onElementChange={handleChange}
        />

        {/* Контент справа */}
        <div className="relative gradient-bg backdrop-blur-sm rounded-2xl overflow-hidden border border-border/40">
          {/* Декоративный градиент */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

          {/* Заголовок раздела */}
          <div className="relative p-6 border-b border-border/30">
            <h1 className="text-2xl font-bold text-light-text">
              {currentRule?.title}
            </h1>
          </div>

          {/* Markdown контент */}
          <div className="relative p-6">
            {currentRule ? (
              <MarkdownRenderer content={currentRule.content} />
            ) : (
              <div className="text-center py-12">
                <p className="text-dim-text">Выберите раздел из навигации</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
