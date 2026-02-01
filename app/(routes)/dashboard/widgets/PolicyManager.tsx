"use client";

import { useState } from "react";
import MarkdownRenderer from "@/app/shared/ui/MarkDownRenderer";
import Paper from "@/app/shared/ui/Paper";
import { checkRes } from "@/app/shared/utils/functions";
import type { Policy } from "@/lib/generated/prisma/client";
import AsideControls from "../ui/AsideControls";
import EditPolicyForm from "../ui/forms/EditPolicyForm";
import { FileTextIcon } from "@/ui/icons/ui.icons";

interface PolicyManagerProps {
  policies: Policy[];
}

export default function PolicyManager({
  policies: policiesData,
}: PolicyManagerProps) {
  const [policies, setPolicies] = useState<Policy[]>(policiesData);
  const [activePolicy, setActivePolicy] = useState<Policy | null>(null);
  const [step, setStep] = useState<"view" | "edit" | "select">("select");
  const [editData, setEditData] = useState<Policy | null>(null);

  const handleEdit = async (content: { content: string }) => {
    if (!editData) return;
    try {
      const response = await fetch(`/dashboard/api/policy/${editData.id}`, {
        method: "PATCH",
        body: JSON.stringify(content),
        headers: { "Content-Type": "application/json" },
      });

      const updated: Policy = await checkRes(response);

      setPolicies((prev) =>
        prev.map((policy) => (policy.id === updated.id ? updated : policy)),
      );

      setStep("view");
      setEditData(null);
      setActivePolicy(updated);
    } catch (error) {
      console.error("Error updating policy: ", error);
      throw error;
    }
  };

  const startEdit = (policy: Policy) => {
    setEditData(policy);
    setStep("edit");
  };

  const selectPolicy = (policy: Policy) => {
    if (activePolicy && policy.id === activePolicy.id) {
      setActivePolicy(null);
      setEditData(null);
      setStep("select");
      return;
    }

    setActivePolicy(policy);
    setEditData(null);
    setStep("view");
  };

  const onCancel = () => {
    setEditData(null);
    setStep(activePolicy ? "view" : "select");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      <AsideControls<Policy>
        icon={FileTextIcon}
        elements={policies}
        activeElement={activePolicy?.id || ""}
        setActiveElement={selectPolicy}
        startEdit={startEdit}
      />
      <Paper className="border border-border p-4">
        {step === "select" && (
          <div className="text-center py-12">
            <p className="text-dim-text">Выберите раздел из навигации</p>
          </div>
        )}
        {step === "edit" && (
          <EditPolicyForm
            initialState={editData?.content}
            onSubmit={handleEdit}
            onCancel={onCancel}
          />
        )}
        {step === "view" && (
          <MarkdownRenderer content={activePolicy?.content || ""} />
        )}
      </Paper>
    </div>
  );
}
