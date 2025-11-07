import Image from "next/image";

interface DonateCardProps {
  name: string;
  image: string;
  price: number;
  category: string;
}

export default function ProductCard({
  category,
  name,
  price,
  image,
}: DonateCardProps) {
  return (
    // TODO: Переписать стили карточки
    <div className="bg-surface/90 p-3 rounded-lg ring-1 ring-zinc-600 transition hover:ring-2 hover:scale-103 group">
      <div className="mx-auto aspect-square w-50 h-50">
        <Image
          className="transition-transform group-hover:scale-105 object-cover aspect-square"
          width={200}
          height={200}
          src={image}
          alt={name}
          priority
        />
      </div>
      <div className="gap-1 mt-2 pt-4 border-t border-zinc-600">
        <span className="py-1 px-2 rounded-2xl bg-gray-600">{category}</span>
        <h3 className="text-primary">{name}</h3>
        <span className="">{price}</span>
      </div>
    </div>
  );
}
