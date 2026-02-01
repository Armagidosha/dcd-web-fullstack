"use client";

import { useEffect, useState } from "react";
import MarkdownRenderer from "@/app/shared/ui/MarkDownRenderer";
import Paper from "@/app/shared/ui/Paper";
import type { Rule } from "@/lib/generated/prisma/client";
import {
  useCreateRuleAction,
  useDeleteRuleAction,
  useGetRulesAction,
  useRulesSelector,
  useUpdateRuleAction,
  useUpdateRuleOrderActions,
} from "../store/ruleStore";
import AsideControls from "../ui/AsideControls";
import RuleForm from "../ui/forms/RuleForm";
import { RulesIcon } from "@/ui/icons/ui.icons";

export default function RulesManager() {
  const getRules = useGetRulesAction();
  const postRule = useCreateRuleAction();
  const patchRule = useUpdateRuleAction();
  const deleteRule = useDeleteRuleAction();
  const updateOrder = useUpdateRuleOrderActions();

  useEffect(() => {
    getRules();
  }, [getRules]);

  const rules = useRulesSelector();
  const [activeRule, setActiveRule] = useState<Rule | null>(null);
  const [step, setStep] = useState<"view" | "edit" | "add" | "select">(
    "select",
  );
  const [editData, setEditData] = useState<Rule | null>(null);

  const handleAddRule = async (ruleData: Pick<Rule, "title" | "content">) => {
    await postRule(ruleData);
  };

  const handleEditRule = async (ruleData: Pick<Rule, "title" | "content">) => {
    if (editData?.id) {
      await patchRule(editData.id, ruleData);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Удалить раздел?")) return;
    await deleteRule(id);

    if (activeRule?.id === id) {
      setActiveRule(null);
      setEditData(null);
      setStep("select");
    }
  };

  const handleMove = async (id: string, order: -1 | 1) => {
    await updateOrder(id, order);
  };

  const selectRule = (rule: Rule) => {
    if (activeRule && rule.id === activeRule.id) {
      setStep("select");
      setEditData(null);
      setActiveRule(null);
      return;
    }

    setActiveRule(rule);
    setEditData(null);
    setStep("view");
  };

  const startAdd = () => {
    setActiveRule(null);
    setEditData(null);
    setStep("add");
  };

  const startEdit = (rule: Rule) => {
    setEditData(rule);
    setStep("edit");
  };

  const onCancel = () => {
    setEditData(null);
    setActiveRule(null);
    setStep("select");
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      <AsideControls<Rule>
        icon={RulesIcon}
        elements={rules}
        activeElement={activeRule?.id || ""}
        setActiveElement={selectRule}
        startAdd={startAdd}
        startEdit={startEdit}
        onDelete={handleDelete}
        onMove={handleMove}
      />
      <Paper className="border border-border p-4">
        {step === "select" && (
          <div className="text-center py-12">
            <p className="text-dim-text">Выберите раздел из навигации</p>
          </div>
        )}
        {step === "add" && (
          <RuleForm
            action="add"
            title="Добавить раздел"
            onSubmit={handleAddRule}
            onCancel={onCancel}
          />
        )}
        {step === "edit" && (
          <RuleForm
            action="edit"
            title="Редактировать раздел"
            initialData={editData || undefined}
            onSubmit={handleEditRule}
            onCancel={onCancel}
          />
        )}
        {step === "view" && (
          <MarkdownRenderer content={activeRule?.content || ""} />
        )}
      </Paper>
    </div>
  );
}
