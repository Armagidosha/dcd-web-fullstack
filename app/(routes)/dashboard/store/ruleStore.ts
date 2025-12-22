import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { checkRes } from "@/app/shared/utils/functions";
import type { Rule } from "@/lib/generated/prisma/client";

type RuleData = Pick<Rule, "title" | "content">;

interface RuleStore {
  rules: Rule[];

  getRules: () => Promise<void>;
  createRule: (ruleData: RuleData) => Promise<void>;
  updateRule: (id: string, ruleData: Partial<RuleData>) => Promise<void>;
  deleteRule: (id: string) => Promise<void>;
  updateRuleOrder: (id: string, order: -1 | 1) => Promise<void>;
}

export const useRuleStore = create<RuleStore>((set) => ({
  rules: [],

  getRules: async () => {
    const response = await fetch("/dashboard/api/rule");

    const rules = await checkRes(response);

    set({ rules });
  },

  createRule: async (ruleData) => {
    try {
      const response = await fetch("/dashboard/api/rule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ruleData),
      });

      const newRule: Rule = await checkRes(response);

      set((state) => ({ rules: [...state.rules, newRule] }));
    } catch (error) {
      console.error("Error creating rule: ", error);
      throw error;
    }
  },

  updateRule: async (id, ruleData) => {
    try {
      const response = await fetch(`/dashboard/api/rule/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ruleData),
      });

      const updated = await checkRes(response);

      set((state) => ({
        rules: state.rules.map((rule) => (rule.id === id ? updated : rule)),
      }));
    } catch (error) {
      console.error("Error updating rule: ", error);
      throw error;
    }
  },

  deleteRule: async (id) => {
    try {
      const response = await fetch(`/dashboard/api/rule/${id}`, {
        method: "DELETE",
      });

      await checkRes(response);

      set((state) => ({ rules: state.rules.filter((rule) => rule.id !== id) }));
    } catch (error) {
      console.error("Error deleting rule: ", error);
      throw error;
    }
  },

  updateRuleOrder: async (id, order) => {
    try {
      const response = await fetch(`/dashboard/api/rule/${id}/${order}`, {
        method: "PATCH",
      });
      await checkRes(response);

      set((state) => {
        const index = state.rules.findIndex((rule) => rule.id === id);
        const newIndex = index + order;

        if (newIndex < 0 || newIndex >= state.rules.length) {
          return state;
        }

        const newRules = [...state.rules];

        [newRules[index], newRules[newIndex]] = [
          newRules[newIndex],
          newRules[index],
        ];

        return { rules: newRules };
      });
    } catch (error) {
      console.error("Error updating order: ", error);
      throw error;
    }
  },
}));

export const useRulesSelector = () => useRuleStore((state) => state.rules);

export const useGetRulesAction = () =>
  useRuleStore(useShallow((state) => state.getRules));
export const useCreateRuleAction = () =>
  useRuleStore(useShallow((state) => state.createRule));
export const useUpdateRuleAction = () =>
  useRuleStore(useShallow((state) => state.updateRule));
export const useDeleteRuleAction = () =>
  useRuleStore(useShallow((state) => state.deleteRule));
export const useUpdateRuleOrderActions = () =>
  useRuleStore(useShallow((state) => state.updateRuleOrder));
