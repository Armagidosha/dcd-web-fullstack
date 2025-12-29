interface TitleInfoProps {
  title: string;
  description?: string;
}

export default function TitleInfo({ title, description }: TitleInfoProps) {
  return (
    <div className="flex flex-col mb-8">
      <h1 className="text-3xl font-semibold text-light-text mb-2">{title}</h1>
      {description && <p className="text-primary">{description}</p>}
    </div>
  );
}
