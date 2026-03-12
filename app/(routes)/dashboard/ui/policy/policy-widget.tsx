"use client";

import { updatePolicyPrivate } from "@/lib/actions/policy/patch-policy";
import type { Policy, PolicyType } from "@/lib/generated/prisma/client";
import { useModal } from "@/lib/utils/hooks/useModal";
import EditPolicyDialog from "./edit-policy-dialog";
import PolicyCard from "./policy-card";

interface PolicyManagerProps {
  policies: Policy[];
}

const defaultPolicies = [
  {
    id: "terms",
    type: "TERMS",
    title: "Пользовательское соглашение",
    content: "",
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "privacy",
    type: "PRIVACY",
    title: "Политика конфиденциальности",
    content: "",
    createdAt: null,
    updatedAt: null,
  },
];

export default function PolicyWidget({ policies }: PolicyManagerProps) {
  const modal = useModal<Policy, "edit">();

  function mergeDocs(serverPolicy: Policy[]) {
    const serverMap = Object.fromEntries(
      serverPolicy.map((pol) => [pol.type, pol]),
    );

    const def = defaultPolicies.map((defaultPol) => ({
      ...defaultPol,
      ...serverMap[defaultPol.type],
    }));
    return def;
  }

  const handleEdit = async (type: PolicyType, content: string) => {
    await updatePolicyPrivate({ type, content });
  };

  return (
    <>
      <EditPolicyDialog
        opened={modal.opened}
        onClose={modal.close}
        onEdit={handleEdit}
        policy={modal.data}
      />
      <div className="flex flex-col md:flex-row gap-4">
        {mergeDocs(policies).map((policy) => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            onEdit={() => modal.open(policy, "edit")}
          />
        ))}
      </div>
    </>
  );
}
