import ImageWithFallback from "@shared/ui/ImageWithFallback";
import type { ProductsWithCategory } from "@shared/utils/types/categories";

interface DonateCardProps {
  card: ProductsWithCategory;
  onClick: (card: ProductsWithCategory) => void;
}

export default function ProductCard({ card, onClick }: DonateCardProps) {
  const { category, image, name, price } = card;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <Есть доп. кнопка>
    // biome-ignore lint/a11y/useKeyWithClickEvents: <Есть доп. кнопка>
    <div
      className="relative gradient-bg backdrop-blur-sm rounded-2xl overflow-hidden ring-1 ring-border/40 transition-all duration-300 hover:ring-border/80 hover:-translate-y-1 group cursor-pointer w-full text-left"
      onClick={() => onClick(card)}
    >
      {/* Декоративный градиент сверху */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Контейнер изображения */}
      <div className="relative p-4">
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface-variant/30 ring-1 ring-border/20 group-hover:ring-primary/30 transition-all duration-300">
          {/* Фоновое свечение */}
          <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <ImageWithFallback
            className="relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 object-cover"
            width={300}
            height={300}
            src={image}
            alt={name}
            priority
          />

          {/* Пульсирующая точка */}
          <span className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>

        {/* Бейдж категории - абсолютное позиционирование */}
        {category && (
          <div className="absolute bottom-6 left-6 z-10">
            <span className="inline-flex px-3 py-1.5 text-xs font-medium rounded-full bg-surface-variant/90 backdrop-blur-md border border-border/30 text-light-text/90 shadow-lg">
              {category.name}
            </span>
          </div>
        )}
      </div>

      {/* Информация о продукте */}
      <div className="px-4 pb-4 space-y-3">
        {/* Название */}
        <h3 className="text-lg font-bold text-light-text group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-14">
          {name}
        </h3>

        {/* Разделитель */}
        <div className="h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />

        {/* Нижняя секция с ценой и кнопкой */}
        <div className="flex items-center justify-between gap-3">
          {/* Цена */}
          <div className="flex flex-col">
            <span className="text-xs text-dim-text font-medium">Цена</span>
            <span className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
              {price}₽
            </span>
          </div>

          {/* Кнопка */}
          <button
            className="flex items-center gap-2 px-5 py-2.5 cursor-pointer bg-primary rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/60 hover:scale-105 active:scale-95"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick(card);
            }}
          >
            <span>Купить</span>
          </button>
        </div>
      </div>

      {/* Декоративное свечение при наведении */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-t from-primary/5 via-transparent to-transparent" />
      </div>
    </div>
  );
}
