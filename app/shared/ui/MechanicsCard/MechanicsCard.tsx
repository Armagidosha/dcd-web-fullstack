import Image from "next/image";

interface MechanicsCardProps {
  iconPath: string;
  title: string;
  description: string;
}

export default function MechanicsCard({
  iconPath,
  title,
  description,
}: MechanicsCardProps) {
  return (
    <div className="grid place-items-center text-center gap-2" key={title}>
      <Image width={30} height={30} src={iconPath} alt={title} />
      <h3 className="text-center text-lg font-semibold">{title}</h3>
      <p className="text-pretty text-md">{description}</p>
    </div>
  );
}
