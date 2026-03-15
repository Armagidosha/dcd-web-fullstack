import { useForm, useStore } from "@tanstack/react-form";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { createPromoActionPrivate } from "@/lib/actions/promo-code/post-promo";
import { promoSchema } from "@/lib/validation/promo.schema";
import { Button } from "@/ui/primitives/button";
import { Calendar } from "@/ui/primitives/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/primitives/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/primitives/dropdown-menu";
import { Field, FieldError, FieldTitle } from "@/ui/primitives/field";
import { Input } from "@/ui/primitives/input";
import { Textarea } from "@/ui/primitives/textarea";

type PromoCreateDialogProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: typeof createPromoActionPrivate;
};

export default function CreatePromoDialog({
  opened,
  onClose,
  onAdd,
}: PromoCreateDialogProps) {
  const defaultValues = {
    code: "",
    description: "",
    discount: 0,
    usageLimit: null as number | null,
    validFrom: new Date(),
    validTo: new Date(),
  };

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: promoSchema,
    },
    onSubmit: async ({ value }) => {
      await onAdd(value);
      handleClose();
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const { isSubmitting, isValid } = useStore(form.store, (state) => ({
    isSubmitting: state.isSubmitting,
    isValid: state.isFieldsValid,
  }));

  return (
    <Dialog onOpenChange={handleClose} open={opened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление промокода</DialogTitle>
          <DialogDescription>
            Промокод не будет активным сразу
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-promo-form"
          className="space-y-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* Promo code */}

          <form.Field name="code">
            {(field) => (
              <Field>
                <FieldTitle>Код промокода</FieldTitle>
                <Input
                  placeholder="DRAIMCODE"
                  value={field.state.value}
                  onChange={(e) => field.setValue(e.target.value.toUpperCase())}
                  onBlur={field.handleBlur}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          {/* Description */}

          <form.Field name="description">
            {(field) => (
              <Field>
                <FieldTitle>Описание</FieldTitle>
                <Textarea
                  placeholder="Описание промокода..."
                  value={field.state.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          {/* Discount % */}

          <div className="grid grid-cols-2 gap-4">
            <form.Field name="discount">
              {(field) => (
                <Field>
                  <FieldTitle>Скидка (%)</FieldTitle>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    placeholder="10"
                    value={field.state.value || ""}
                    onChange={(e) => field.setValue(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Usage limit */}

            <form.Field name="usageLimit">
              {(field) => (
                <Field>
                  <FieldTitle>Лимит использований</FieldTitle>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Без лимита"
                    value={field.state.value ?? ""}
                    onChange={(e) =>
                      field.setValue(
                        e.target.value === "" ? null : Number(e.target.value),
                      )
                    }
                    onBlur={field.handleBlur}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </div>

          {/* Dates*/}

          <div className="grid grid-cols-2 gap-4">
            {/* From */}
            <form.Field name="validFrom">
              {(field) => (
                <Field>
                  <FieldTitle>Активен с</FieldTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.state.value}
                        className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value
                          ? format(field.state.value, "PPP", { locale: ru })
                          : "Выберите дату"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.state.value}
                        onSelect={(value) =>
                          field.setValue(value || new Date())
                        }
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
            {/* To */}
            <form.Field name="validTo">
              {(field) => (
                <Field>
                  <FieldTitle>Активен до</FieldTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.state.value}
                        className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value
                          ? format(field.state.value, "PPP", { locale: ru })
                          : "Выберите дату"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.state.value}
                        onSelect={(value) =>
                          field.setValue(value || new Date())
                        }
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </div>
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
            form="add-promo-form"
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
