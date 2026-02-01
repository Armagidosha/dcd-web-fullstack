"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { checkPlayerPrivilege } from "@/lib/actions/payment/check-nickname";
import { calculateFinalPrice } from "@/lib/actions/payment/checkPromo";
import Button from "@/app/shared/ui/Button";
import Dot from "@/app/shared/ui/Dot";
import CheckBox from "@/app/shared/ui/Input/CheckBox";
import TextInput from "@/app/shared/ui/Input/TextInput";
import { debounce } from "@/app/shared/utils/functions";
import { useAsync } from "@/app/shared/utils/hooks";
import { useForm } from "@/app/shared/utils/hooks/useForm";
import type { PaymentMethods } from "@/app/shared/utils/types/payment";
import type { Product } from "@/lib/generated/prisma/client";
import { createPayment } from "../../../../../lib/actions/payment/create-payment";
import { YooKassaLogo } from "@/ui/icons/media.icons";
import { CardIcon, PackageIcon } from "@/ui/icons/ui.icons";

interface ProductPurchaseFormProps {
  product: Pick<Product, "price" | "id">;
  className?: string;
}

type PaymentForm = {
  promoCode: string;
  playerNick: string;
  playerEmail: string;
  terms: boolean;
};

type PaymentCards = {
  id: PaymentMethods;
  name: string;
  icon: React.ReactNode;
};

const paymentMethods: PaymentCards[] = [
  { id: "YooKassa", name: "", icon: <YooKassaLogo /> },
];

type Promo = {
  finalPrice: number;
  discount: number;
};

export default function ProductPurchaseForm({
  product,
  className,
}: ProductPurchaseFormProps) {
  const router = useRouter();
  const {
    errors,
    isLoading,
    clearFieldError,
    clearErrors,
    setFieldError,
    execute,
  } = useAsync();
  const [requestId] = useState(() => uuidv4());
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethods>(
    paymentMethods[0].id,
  );
  const [order, setOrder] = useState<Promo>({
    finalPrice: product.price,
    discount: 0,
  });

  const { inputs, handleChange } = useForm<PaymentForm>({
    initialValues: {
      promoCode: "",
      playerNick: "",
      playerEmail: "",
      terms: false,
    },
    onChangeWrapper: (name) => {
      clearFieldError(name);
    },
  });

  const debouncedCheckPromo = useMemo(
    () =>
      debounce(async (price: number, promo: string) => {
        const result = await calculateFinalPrice(price, promo);
        if (!result.success) {
          setFieldError(result.details);
          setOrder({ finalPrice: product.price, discount: 0 });
        } else {
          const discount = product.price - Number(result.finalPrice);
          setOrder({
            finalPrice: Number(result.finalPrice),
            discount: discount,
          });
        }
      }, 1500),
    [setFieldError, product.price],
  );

  const debouncedCheckNickname = useMemo(
    () =>
      debounce(async (nickname: string, donate: string) => {
        const result = await checkPlayerPrivilege(nickname, donate);
        if (!result.success) {
          setFieldError(result.details);
        }
      }, 1500),
    [setFieldError],
  );

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    clearErrors();

    const payment = await execute(() =>
      createPayment({
        requestId,
        productId: product.id,
        promoCode: inputs.promoCode,
        playerNick: inputs.playerNick,
        playerEmail: inputs.playerEmail,
        paymentMethod: selectedPayment,
      }),
    );

    if (payment?.confirmationUrl) {
      router.push(payment.confirmationUrl);
    }
  };

  const handlePromoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleChange(event);
    const promo = event.target.value;

    if (!promo.length) {
      setOrder({ finalPrice: product.price, discount: 0 });
      return;
    }

    debouncedCheckPromo(product.price, promo);
  };

  const handleNicknameChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleChange(event);
    const nick = event.target.value;

    if (!nick.length) return;

    debouncedCheckNickname(nick, product.id);
  };

  const canSubmit = (inputs: PaymentForm): boolean => {
    const min3 = (v: string) => v.trim().length >= 3;
    return min3(inputs.playerNick) && min3(inputs.playerEmail) && inputs.terms;
  };

  const isDisabled = isLoading || !canSubmit(inputs);

  return (
    <form
      className={clsx("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* Данные игрока */}
      <h3 className="text-xl font-bold text-primary flex items-center gap-2">
        Данные игрока
      </h3>
      <div>
        <TextInput
          label="Почта"
          name="playerEmail"
          type="email"
          placeholder="player@example.com"
          onChange={handleChange}
          errors={errors.playerEmail}
          minLength={3}
          disabled={isLoading}
          required
        />
        <TextInput
          label="Игровой никнейм"
          name="playerNick"
          type="text"
          errors={errors.playerNick}
          placeholder="Steve"
          onChange={handleNicknameChange}
          minLength={3}
          maxLength={16}
          disabled={isLoading}
          required
        />
        <TextInput
          label="Промокод (необязательно)"
          name="promoCode"
          type="text"
          errors={errors.promoCode}
          placeholder="SALE"
          onChange={handlePromoChange}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <CardIcon />
          Способ оплаты
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedPayment(method.id)}
              disabled={isLoading}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200
                flex flex-col items-center justify-center gap-2
                ${
                  selectedPayment === method.id
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-border/50 bg-surface hover:border-primary/50 hover:bg-surface-variant"
                }
                ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {/* TODO: Изменить иконки на реальные */}
              <span className="text-3xl">{method.icon}</span>
              {method.name.length > 0 && (
                <span className="text-sm font-semibold">{method.name}</span>
              )}
              {selectedPayment === method.id && (
                <Dot posX="left-2" posY="top-2" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <PackageIcon />
          Информация по заказу
        </h3>
        <div className="bg-surface rounded-xl p-4 space-y-3 border border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-white/70">Цена:</span>
            <span className="text-lg font-bold">{product.price} ₽</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between items-center text-success">
              <span className="flex items-center gap-1">
                <span>🎉</span>
                Скидка:
              </span>
              <span className="text-lg font-bold">-{order.discount} ₽</span>
            </div>
          )}
          <div className="border-t border-white/10 pt-3 flex justify-between items-center">
            <span className="text-lg font-semibold">Итого:</span>
            <span className="text-2xl font-bold text-primary">
              {order.finalPrice} ₽
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 bg-surface rounded-xl border border-border/50">
        <CheckBox
          name="terms"
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <label
          className="select-none cursor-pointer text-sm text-white/80"
          htmlFor="terms"
        >
          Я ознакомился и принимаю{" "}
          <Link
            className="text-primary underline hover:text-primary/80 transition-colors"
            href="/privacy"
            target="_blank"
          >
            Политику конфиденциальности
          </Link>{" "}
          и{" "}
          <Link
            className="text-primary underline hover:text-primary/80 transition-colors"
            href="/terms"
            target="_blank"
          >
            Пользовательское соглашение
          </Link>
        </label>
      </div>
      <div className="space-y-2">
        {errors?.form?.map((error) => (
          <p key={error} className="ml-1 text-xs text-primary select-none">
            {error}
          </p>
        ))}
        <Button type="submit" disabled={isDisabled}>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Оформление...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>🚀</span>
              Купить за {order.finalPrice} ₽
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
