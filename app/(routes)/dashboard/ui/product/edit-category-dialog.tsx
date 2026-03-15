import { useForm, useStore } from "@tanstack/react-form";
import { useEffect, useMemo } from "react";
import type { CategoryWithProductCount } from "@/lib/actions/category/get-category";
import { categorySchema } from "@/lib/validation/category.schema";
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

type EditCategoryDialogProps = {
  opened: boolean;
  category: CategoryWithProductCount | null;
  onEdit: (categoryName: string, categoryId: string) => Promise<void>;
  onClose: () => void;
};

export default function EditCategoryDialog({
  opened,
  onClose,
  onEdit,
  category,
}: EditCategoryDialogProps) {
  const defaultValues = useMemo(
    () => ({
      name: category?.name ?? "",
    }),
    [category?.name],
  );

  const form = useForm({
    defaultValues,
    validators: { onSubmit: categorySchema },
    onSubmit: async ({ value }) => {
      if (!category) return;
      await onEdit(value.name, category.id).then(() => onClose());
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const { isSubmitting, isValid } = useStore(form.store, (state) => ({
    isSubmitting: state.isSubmitting,
    isValid: state.isFieldsValid,
  }));

  return (
    <Dialog onOpenChange={onClose} open={opened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование категории</DialogTitle>
          <DialogDescription>{category?.name}</DialogDescription>
        </DialogHeader>
        <form
          id="edit-category-form"
          className="space-y-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          autoComplete="off"
        >
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Название</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={!!field.state.meta.errors.length}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
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
            form="edit-category-form"
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
