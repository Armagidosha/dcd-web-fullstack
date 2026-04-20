import { useForm, useStore } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { checkPlayerPrivilege } from "@/lib/actions/payment/check-privilege";
import { createPayment } from "@/lib/actions/payment/create-payment";
import type { ProductWithCategoryPublic } from "@/lib/actions/product/get-products";
import { calculateFinalPrice } from "@/lib/actions/promo-code/check-promo";
import { PaymentProvider } from "@/lib/utils/constants/payment-providers";
import { cn } from "@/lib/utils/functions/cn";
import { debounce } from "@/lib/utils/functions/debounce";
import {
  emailSchema,
  nicknameSchema,
  promoCodeSchema,
} from "@/lib/validation/payment.schema";
import { Button } from "@/ui/primitives/button";
import { Checkbox } from "@/ui/primitives/checkbox";
import { Field, FieldError, FieldLabel } from "@/ui/primitives/field";
import { Input } from "@/ui/primitives/input";
import { RadioGroup, RadioGroupItem } from "@/ui/primitives/radio-group";

type PurchaseFormProps = {
  className?: string;
  product: ProductWithCategoryPublic | null;
};

export default function PurchaseForm({
  className,
  product,
}: PurchaseFormProps) {
  const router = useRouter();
  const [idemKey, setIdemKey] = useState<string | null>(null);
  const [order, setOrder] = useState({
    discount: 0,
    originalPrice: product?.price,
    finalPrice: product?.price,
  });

  const form = useForm({
    canSubmitWhenInvalid: true,
    defaultValues: {
      nickname: "",
      email: "",
      promoCode: "",
      terms: false,
      provider: PaymentProvider.STRIPE,
    },

    onSubmit: async ({ value }) => {
      if (!product) return;

      const key = idemKey ?? uuid();
      setIdemKey(key);

      const payment = await createPayment(product.id, {
        ...value,
        idempotencyKey: key,
      });

      if (payment.success) {
        router.push(payment.confirmationUrl);
        return;
      }

      const fields: Record<string, { message: string[] }> = {};

      if (payment.fieldErrors) {
        Object.entries(payment.fieldErrors).forEach(([field, message]) => {
          fields[field] = { message };
        });
      }

      form.setErrorMap({
        onSubmit: {
          form: payment.formError,
          fields,
        },
      });
    },
  });

  const debouncedCheckNickname = useMemo(
    () =>
      debounce(async (nickname: string, donate: string) => {
        return await checkPlayerPrivilege(nickname, donate);
      }, 1500),
    [],
  );

  const debouncedCheckPromo = useMemo(
    () =>
      debounce(async (initialPrice: number, promoCode: string) => {
        return await calculateFinalPrice(initialPrice, promoCode);
      }),
    [],
  );

  const { isSubmitting, isValidating, errors } = useStore(
    form.store,
    (state) => ({
      isSubmitting: state.isSubmitting,
      isValidating: state.isFieldsValidating,
      errors: state.errors,
    }),
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.setErrorMap({ onSubmit: { form: undefined, fields: {} } });
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-3", className)}
    >
      <form.Field
        name="nickname"
        validators={{
          onChange: nicknameSchema,
          onChangeAsync: async ({ value }) => {
            if (!product) return;
            const result = await debouncedCheckNickname(value, product.id);
            if (!result.success) {
              return { message: result.message };
            }
            return undefined;
          },
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Никнейм</FieldLabel>
            <Input
              autoComplete="off"
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder="Никнейм на сервере"
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={!!field.state.meta.errors.length}
              required
            />
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>

      {/* Email Input */}
      <form.Field name="email" validators={{ onChange: emailSchema }}>
        {(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Почта</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder="Почта (для чека)"
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={!!field.state.meta.errors.length}
              required
            />
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>

      {/* PromoCode input */}
      <form.Field
        name="promoCode"
        validators={{
          onChange: promoCodeSchema,
          onChangeAsync: async ({ value }) => {
            if (!product) return;
            if (!value.length) return undefined;
            const result = await debouncedCheckPromo(product.price, value);

            if (!result.success) {
              setOrder({
                discount: 0,
                finalPrice: product.price,
                originalPrice: product.price,
              });
              return { message: result.message };
            }
            setOrder({
              discount: result.discount,
              finalPrice: Number(result.finalPrice),
              originalPrice: Number(result.originalPrice),
            });
            return undefined;
          },
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Промокод</FieldLabel>
            <Input
              autoComplete="off"
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder="Даёт приятную скидку"
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={!!field.state.meta.errors.length}
            />
            <FieldError errors={field.state.meta.errors} />
          </Field>
        )}
      </form.Field>

      <form.Field name="provider">
        {(field) => (
          <Field>
            <FieldLabel>Способ оплаты</FieldLabel>

            <RadioGroup
              value={field.state.value}
              onValueChange={(val) =>
                field.handleChange(val as PaymentProvider)
              }
              className="gap-2"
            >
              <label
                htmlFor="stripe-provider"
                className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer"
              >
                <RadioGroupItem
                  value={PaymentProvider.STRIPE}
                  id="stripe-provider"
                />
                <p>
                  Ин. карты{" "}
                  <span className="text-muted-foreground">(Stripe)</span>
                </p>
              </label>
            </RadioGroup>
            <Link
              // TODO: ТУТ ССЫЛКА НА FUNPAY
              href=""
              className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer"
            >
              <p>
                Покупка в РФ{" "}
                <span className="text-muted-foreground">(Funpay)</span>
              </p>
            </Link>
          </Field>
        )}
      </form.Field>

      {/* Accept terms */}
      <form.Field name="terms">
        {(field) => (
          <FieldLabel>
            <Field className="gap-4" orientation="horizontal">
              <Checkbox
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => field.setValue(checked === true)}
                aria-invalid={!!field.state.meta.errors.length}
                required
              />
              <p className="text-sm">
                Я принимаю{" "}
                <Link className="link" href="/terms">
                  Пользовательское соглашение
                </Link>{" "}
                и
                <Link className="link" href="/privacy">
                  &nbsp;Политику конфиденциальности
                </Link>
              </p>
            </Field>
          </FieldLabel>
        )}
      </form.Field>

      <div className="rounded-xl p-4 space-y-3 border border-border/50">
        <div className="flex justify-between items-center">
          <span className="text-white/70">Цена:</span>
          <span className="text-lg font-bold">{order.originalPrice} ₽</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between items-center text-success-foreground">
            <span className="flex items-center gap-1">Скидка:</span>
            <span className="text-lg font-bold">
              -
              {order.originalPrice &&
                order.originalPrice * (order.discount / 100)}{" "}
              ₽
            </span>
          </div>
        )}
        <div className="border-t border-white/10 pt-3 flex justify-between items-center">
          <span className="text-lg font-semibold">Итого:</span>
          <span className="text-2xl font-bold">{order.finalPrice} ₽</span>
        </div>
      </div>
      {errors.length > 0 && (
        <span className="text-destructive text-sm">{errors}</span>
      )}
      <Button type="submit" disabled={isSubmitting || isValidating}>
        {isSubmitting ? "Оформляю..." : "К оплате"}
      </Button>
    </form>
  );
}
