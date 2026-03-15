"use client";

import { deleteRuleActionPrivate } from "@/lib/actions/rules/delete-rule";
import {
  reorderRuleActionPrivate,
  updateRuleActionPrivate,
} from "@/lib/actions/rules/patch-rule";
import { createRuleActionPrivate } from "@/lib/actions/rules/post-rule";
import type { Rule } from "@/lib/generated/prisma/client";
import { useModal } from "@/lib/utils/hooks/useModal";
import { Button } from "@/ui/primitives/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";
import AddRuleDialog from "./add-rule-dialog";
import EditRuleDialog from "./edit-rule-dialog";
import RuleItem from "./rule-item";

type RulesManagerProps = {
  rules: Rule[];
};

export default function RulesWidget({ rules }: RulesManagerProps) {
  const modal = useModal<Rule | null, "add" | "edit">();

  const handleCreate = async (title: string, content: string) => {
    await createRuleActionPrivate(title, content);
  };

  const handleEdit = async (ruleId: string, title: string, content: string) => {
    await updateRuleActionPrivate({ ruleId, title, content });
  };

  const handleDelete = async (id: string) => {
    await deleteRuleActionPrivate(id);
  };

  const handleReorder = async (id: string, direction: -1 | 1) => {
    await reorderRuleActionPrivate(id, direction);
  };

  return (
    <>
      <AddRuleDialog
        opened={modal.opened && modal.mode === "add"}
        onClose={modal.close}
        onAdd={handleCreate}
      />

      <EditRuleDialog
        opened={modal.opened && modal.mode === "edit"}
        onClose={modal.close}
        onEdit={handleEdit}
        rule={modal.data}
      />

      <Card>
        <CardHeader>
          <CardTitle>Правила</CardTitle>
          <CardDescription>Управление правилами</CardDescription>
          <CardAction>
            <Button variant="outline" onClick={() => modal.open(null, "add")}>
              Добавить правило
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 h-92 md:overflow-y-auto">
          {rules.map((rule) => (
            <RuleItem
              key={rule.id}
              rule={rule}
              ruleLastIndex={rules.length}
              onEdit={() => modal.open(rule, "edit")}
              onDelete={() => handleDelete(rule.id)}
              onReorder={(direction) => handleReorder(rule.id, direction)}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
}
