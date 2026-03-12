import { useForm, useStore } from "@tanstack/react-form";
import { useEffect, useMemo } from "react";
import type { ProductWithCategory } from "@/lib/actions/product/get-products";
import type { Category } from "@/lib/generated/prisma/client";
import { editProductSchema } from "@/lib/validation/product.schema";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/ui/primitives/field";
import { Input } from "@/ui/primitives/input";

type EditProductDialogProps = {
  opened: boolean;
  product: ProductWithCategory | null;
  categories: Category[];
  onEdit: (productData: FormData, productId: string) => Promise<void>;
  onClose: () => void;
};

export default function EditProductDialog({
  opened,
  product,
  categories,
  onClose,
  onEdit,
}: EditProductDialogProps) {
  const defaultValues = useMemo(
    () => ({
      image: null as unknown as File | null,
      name: product?.name ?? "",
      category: product?.category?.name ?? "",
      description: product?.description ?? "",
      key: product?.key ?? "",
      price: product?.price ?? 0,
    }),
    [product],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: editProductSchema,
    },

    onSubmit: async ({ value }) => {
      if (!product) return;
      const formData = new FormData();

      if (value.image) {
        formData.append("image", value.image);
      }

      if (value.category) {
        formData.append("category", value.category);
      }

      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("key", value.key);
      formData.append("price", String(value.price));

      await onEdit(formData, product.id).then(() => onClose());
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form.reset]);

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
  const isValid = useStore(form.store, (state) => state.isFieldsValid);

  return (
    <Dialog onOpenChange={onClose} open={opened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование продукта</DialogTitle>
          <DialogDescription>{product?.name}</DialogDescription>
        </DialogHeader>

        <form
          id="edit-product-form"
          className="space-y-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          autoComplete="off"
        >
          <form.Field name="image">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Изображение</FieldLabel>
                <FieldDescription>Разрешены: JPEG, PNG, WebP</FieldDescription>
                <Input
                  id={field.name}
                  name={field.name}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    field.handleChange(e.target.files?.[0] ?? null)
                  }
                  aria-invalid={!!field.state.meta.errors.length}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="name">
            {(field) => {
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Название</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Warden"
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

          <form.Field name="key">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Ключ</FieldLabel>
                <FieldDescription>Должен быть уникальным</FieldDescription>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={!!field.state.meta.errors.length}
                  placeholder="privilege:warden"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="price">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Цена</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  aria-invalid={!!field.state.meta.errors.length}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <MarkdownEditor
                styles={{ renderer: "overflow-x-hidden sm:max-w-md" }}
                fieldName={field.name}
                label="Описание"
                value={field.state.value}
                onChange={field.handleChange}
                errors={field.state.meta.errors}
              />
            )}
          </form.Field>

          <form.Field name="category">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Категория</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  list="category-options"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={!!field.state.meta.errors.length}
                  placeholder="Привилегии"
                />
                <datalist id="category-options">
                  {categories.map((category) => (
                    <option key={category.id} value={category.name} />
                  ))}
                </datalist>
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
            form="edit-product-form"
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
