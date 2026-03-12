import { useForm, useStore } from "@tanstack/react-form";
import { useEffect, useMemo } from "react";
import type { Policy } from "@/lib/generated/prisma/client";
import { policySchema } from "@/lib/validation/policy.schema";
import { MarkdownEditor } from "@/ui/components/markdown-editor";
import { Button } from "@/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/primitives/dialog";

type EditPolicyDialogProps = {
  opened: boolean;
  policy: Policy | null;
  onEdit: (type: "TERMS" | "PRIVACY", content: string) => Promise<void>;
  onClose: () => void;
};

export default function EditPolicyDialog({
  opened,
  onClose,
  onEdit,
  policy,
}: EditPolicyDialogProps) {
  const defaultValues = useMemo(
    () => ({
      content: policy?.content ?? "",
    }),
    [policy?.content],
  );

  const form = useForm({
    defaultValues,
    validators: { onSubmit: policySchema },
    onSubmit: async ({ value }) => {
      if (policy) {
        await onEdit(policy.type, value.content).then(() => onClose());
      }
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const isValid = useStore(form.store, (state) => state.isFieldsValid);

  return (
    <Dialog onOpenChange={onClose} open={opened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование документа</DialogTitle>
          <DialogDescription>
            {policy?.type === "TERMS" && "Пользовательское соглашение"}
            {policy?.type === "PRIVACY" && "Политика конфиденциальности"}
          </DialogDescription>
        </DialogHeader>
        <form
          id="edit-policy-form"
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="content">
            {(field) => (
              <MarkdownEditor
                styles={{
                  textarea: "min-h-100",
                  renderer: "overflow-x-hidden sm:max-w-md",
                }}
                fieldName={field.name}
                label="Содержание политики"
                value={field.state.value}
                onChange={field.handleChange}
                errors={field.state.meta.errors}
              />
            )}
          </form.Field>
        </form>

        <DialogFooter>
          <Button
            variant="outline"
            className="flex-1"
            type="button"
            onClick={() => {
              form.reset();
            }}
          >
            Сброс
          </Button>
          <Button
            form="edit-policy-form"
            type="submit"
            className="flex-2"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
