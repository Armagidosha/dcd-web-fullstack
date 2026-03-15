"use client";

import { deletePromoActionPrivate } from "@/lib/actions/promo-code/delete-promo";
import {
  updatePromoActionPrivate,
  updatePromoStatusActionPrivate,
} from "@/lib/actions/promo-code/patch-promo";
import { createPromoActionPrivate } from "@/lib/actions/promo-code/post-promo";
import type { PromoCode } from "@/lib/generated/prisma/client";
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
import CreatePromoDialog from "./create-promo-dialog";
import EditPromoDialog from "./edit-promo-dialog";
import PromoCodeItem from "./promo-item";

type PromoCardProps = {
  promoCodes: PromoCode[];
};

export default function PromoCard({ promoCodes }: PromoCardProps) {
  const modal = useModal<PromoCode | null, "edit-promo" | "add-promo">();

  return (
    <>
      <CreatePromoDialog
        opened={modal.opened && modal.mode === "add-promo"}
        onClose={modal.close}
        onAdd={createPromoActionPrivate}
      />

      <EditPromoDialog
        promo={modal.data}
        opened={modal.opened && modal.mode === "edit-promo"}
        onClose={modal.close}
        onEdit={updatePromoActionPrivate}
      />

      <Card>
        <CardHeader>
          <CardTitle>Промокоды</CardTitle>
          <CardDescription>Управление промокодами</CardDescription>
          <CardAction>
            <Button
              variant="outline"
              onClick={() => modal.open(null, "add-promo")}
            >
              Добавить промокод
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-2">
          {promoCodes.map((code) => (
            <PromoCodeItem
              key={code.id}
              promo={code}
              onEdit={() => modal.open(code, "edit-promo")}
              onDelete={() => deletePromoActionPrivate(code.id)}
              onToggleStatus={() => updatePromoStatusActionPrivate(code.id)}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
}
