interface TitleInfoProps {
  description?: string;
}

export default function TitleInfo({ description }: TitleInfoProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-semibold text-light-text mb-2">
          Панель управления
        </h1>
        {description && <p className="text-primary">{description}</p>}
      </div>
    </div>
  );
}
