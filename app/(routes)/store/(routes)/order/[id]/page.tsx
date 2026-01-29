import Link from "next/link";
import { AlertIcon } from "@/app/shared/icons/AlertIcon";
import ClockIcon from "@/app/shared/icons/ClockIcon";
import { CheckIcon, CrossIcon } from "@/app/shared/icons/icons";
import Paper from "@/app/shared/ui/Paper";
import { getOrder } from "../../../actions/getOrder";

type OrderStatuses = "canceled" | "pending" | "succeeded" | "failed";

const configs = {
  pending: {
    icon: (
      <ClockIcon
        title="Ожидание оплаты"
        width={70}
        height={70}
        className="text-yellow-400"
      />
    ),
    title: "Ожидание оплаты",
    description: "Ваш заказ создан и ожидает подтверждения оплаты",
    bgGradient: "from-yellow-500/10 to-transparent",
    borderColor: "border-yellow-500/40",
    badgeBg: "bg-yellow-500/20",
    badgeText: "text-yellow-400",
  },
  succeeded: {
    icon: (
      <CheckIcon
        title="Успешно"
        width={70}
        height={70}
        className="text-success"
      />
    ),
    title: "Заказ оплачен",
    description: "Спасибо за покупку! Заказ успешно обработан",
    bgGradient: "from-emerald-500/10 to-transparent",
    borderColor: "border-emerald-500/40",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-400",
  },
  failed: {
    icon: (
      <CrossIcon
        title="Ошибка"
        width={70}
        height={70}
        className=" text-red-400"
      />
    ),
    title: "Оплата не удалась",
    description: "К сожалению, при обработке платежа произошла ошибка",
    bgGradient: "from-red-500/10 to-transparent",
    borderColor: "border-red-500/40",
    badgeBg: "bg-red-500/20",
    badgeText: "text-red-400",
  },
  canceled: {
    icon: (
      <AlertIcon
        title="Отменено"
        width={70}
        height={70}
        className=" text-gray-400"
      />
    ),
    title: "Заказ отменен",
    description: "Возможно этот заказ не был оплачен вовремя",
    bgGradient: "from-gray-500/10 to-transparent",
    borderColor: "border-gray-500/40",
    badgeBg: "bg-gray-500/20",
    badgeText: "text-gray-400",
  },
};

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);

  const getStatusConfig = (status: OrderStatuses) => {
    return configs[status] || configs.pending;
  };

  if (!order) {
    return (
      <section className="section pt-25!">
        <Paper className="p-4 max-w-2xl mx-auto" withBorder withGradient>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <AlertIcon
                title="Не найден"
                width={70}
                height={70}
                className=" text-gray-400"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">
              Заказ не найден
            </h1>
            <p className="text-gray-400">
              Заказ не найден. Пожалуйста, проверьте правильность ссылки.
            </p>
          </div>
        </Paper>
      </section>
    );
  }

  const statusConfig = getStatusConfig(order.status as OrderStatuses);

  return (
    <section className="section min-h-screen pt-25!">
      <div className="max-w-2xl mx-auto">
        <Paper withBorder withGradient>
          <div className="relative p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {statusConfig.icon}
              </div>
              <h1 className="text-3xl font-bold mb-2 text-white">
                {statusConfig.title}
              </h1>
              <p className="text-gray-400">{statusConfig.description}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                {/* <Package className="w-5 h-5 text-gray-500 mt-0.5" /> */}
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Товар</p>
                  <p className="font-semibold text-white">
                    {order.product.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                {/* <Tag className="w-5 h-5 text-gray-500 mt-0.5" /> */}
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Никнейм</p>
                  <p className="font-semibold text-white">
                    {order.customerNick}
                  </p>
                </div>
              </div>
            </div>

            <Paper className="p-4 space-y-2" withBorder>
              <div className="flex justify-between text-gray-400">
                <span>Исходная цена</span>
                <span>{order.originalPrice.toFixed(2)}₽</span>
              </div>
              {order.promoCode && (
                <div className="flex justify-between text-emerald-400">
                  <span>Промокод ({order.promoCode})</span>
                  <span>-{order.discount}%</span>
                </div>
              )}
              <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <div className="flex justify-between text-lg font-bold text-white pt-2">
                <span>Итого</span>
                <span className="text-primary">
                  {order.totalPrice.toFixed(2)}₽
                </span>
              </div>
            </Paper>

            <div className="mt-6 space-y-6">
              <Link
                href="/"
                className="w-full px-5 py-4 rounded-xl font-semibold transition-colors duration-300 hover:bg-primary"
              >
                На главную
              </Link>
            </div>
          </div>
        </Paper>

        <Paper className="p-6 mt-4 text-center" withBorder withGradient>
          <p className="text-sm text-gray-400 mb-2">
            Возникли вопросы? Свяжитесь с нами:
          </p>
          <Link
            href="mailto:draimcido@gmail.com"
            className="text-primary hover:underline font-semibold transition-colors"
          >
            draimcido@gmail.com
          </Link>
        </Paper>
      </div>
    </section>
  );
}
