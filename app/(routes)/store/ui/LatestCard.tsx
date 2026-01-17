import ImageWithFallback from "@shared/ui/ImageWithFallback";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { LatestOrder } from "@/app/shared/utils/types/products";

interface LatestCardProps extends LatestOrder {}

export default function LatestCard({
  productName,
  productImage,
  playerNick,
  purchasedAt,
}: LatestCardProps) {
  const formattedDate = purchasedAt
    ? format(purchasedAt, "H:mm d MMM", { locale: ru })
    : "Дата неизвестна";
  return (
    <div className="relative gradient-bg backdrop-blur-sm rounded-2xl overflow-hidden border border-border/40 transition-all duration-300 hover:border-border/80 group">
      {/* Декоративный градиент */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="relative flex items-center gap-4 p-4">
        {/* Изображение товара */}
        <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-surface-variant/30 border border-border/20 group-hover:border-primary/30 transition-all duration-300">
          {/* Фоновое свечение */}
          <div className="absolute inset-0 bg-linear-to-br from-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <ImageWithFallback
            className="relative z-10 transition-all duration-500 group-hover:scale-110 object-cover"
            width={64}
            height={64}
            src={productImage}
            alt={productName}
          />
        </div>

        {/* Информация о покупке */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Никнейм покупателя */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary truncate">
              {playerNick}
            </span>
            <span className="text-xs text-dim-text">купил(а)</span>
          </div>

          {/* Название товара */}
          <p className="text-sm font-medium text-light-text truncate group-hover:text-primary transition-colors duration-300">
            {productName}
          </p>

          {/* Дата покупки */}
          <p className="text-xs text-dim-text">{formattedDate}</p>
        </div>
      </div>

      {/* Декоративное свечение при наведении */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-transparent" />
      </div>
    </div>
  );
}
