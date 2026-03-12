import { useForm, useStore } from "@tanstack/react-form";
import { ruleSchema } from "@/lib/validation/rule.schema";
import { MarkdownEditor } from "@/ui/components/markdown-editor";
import { Button } from "@/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/primitives/dialog";
import { Field, FieldError, FieldLabel } from "@/ui/primitives/field";
import { Input } from "@/ui/primitives/input";

type AddRuleDialog = {
  opened: boolean;
  onAdd: (title: string, content: string) => Promise<void>;
  onClose: () => void;
};

export default function AddRuleDialog({
  opened,
  onAdd,
  onClose,
}: AddRuleDialog) {
  const defaultValues = {
    title: "",
    content: "",
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: ruleSchema,
    },
    onSubmit: async ({ value }) => {
      await onAdd(value.title, value.content).then(() => handleClose());
    },
  });

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const isValid = useStore(form.store, (state) => state.isFieldsValid);

  return (
    <Dialog onOpenChange={handleClose} open={opened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление правила</DialogTitle>
        </DialogHeader>
        <form
          id="add-rule-form"
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
            form="add-rule-form"
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
