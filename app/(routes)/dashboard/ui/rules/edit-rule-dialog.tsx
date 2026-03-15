import { useForm, useStore } from "@tanstack/react-form";
import { useEffect, useMemo } from "react";
import type { Rule } from "@/lib/generated/prisma/client";
import { ruleSchema } from "@/lib/validation/rule.schema";
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
import { Field, FieldError, FieldLabel } from "@/ui/primitives/field";
import { Input } from "@/ui/primitives/input";

type EditRuleDialogProps = {
  rule: Rule | null;
  opened: boolean;
  onEdit: (ruleId: string, title: string, content: string) => Promise<void>;
  onClose: () => void;
};

export default function EditRuleDialog({
  rule,
  opened,
  onEdit,
  onClose,
}: EditRuleDialogProps) {
  const defaultValues = useMemo(
    () => ({
      title: rule?.title ?? "",
      content: rule?.content ?? "",
    }),
    [rule],
  );

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: ruleSchema,
    },
    onSubmit: async ({ value }) => {
      if (!rule) return;
      await onEdit(rule?.id, value.title, value.content).then(() => onClose());
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form.reset]);

  const { isSubmitting, isValid } = useStore(form.store, (state) => ({
    isSubmitting: state.isSubmitting,
    isValid: state.isFieldsValid,
  }));

  return (
    <Dialog onOpenChange={onClose} open={opened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование правила</DialogTitle>
          <DialogDescription>{rule?.title}</DialogDescription>
        </DialogHeader>
        <form
          id="edit-rule-form"
          className="space-y-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          autoComplete="off"
        >
          <form.Field name="title">
            {(field) => {
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Название правила</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Общие положения"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={!!field.state.meta.errors.length}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="content">
            {(field) => (
              <MarkdownEditor
                styles={{
                  textarea: "min-h-100",
                  renderer: "overflow-x-hidden sm:max-w-md",
                }}
                fieldName={field.name}
                label="Содержание"
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
            form="edit-rule-form"
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
