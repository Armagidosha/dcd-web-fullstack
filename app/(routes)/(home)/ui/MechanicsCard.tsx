interface MechanicsCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export default function MechanicsCard({
  icon,
  title,
  description,
}: MechanicsCardProps) {
  return (
    <div className="grid place-items-center text-center gap-2" key={title}>
      {icon}
      <h3 className="text-center text-lg font-semibold">{title}</h3>
      <p className="text-pretty text-md">{description}</p>
    </div>
  );
}
