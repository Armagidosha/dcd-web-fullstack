import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/ui/primitives/card";

export type FeedbackCardProps = {
  card: {
    title: string;
    imagePath: string;
    description: string;
    linkHref: string;
    linkTitle: string;
  };
};

export default function FeedbackCard({ card }: FeedbackCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center">
        <Image width={200} height={200} src={card.imagePath} alt={card.title} />
        <h3 className="text-lg font-semibold">{card.title}</h3>
        <p className="max-w-xs text-center">{card.description}</p>
        <Link className="link" target="blank" href={card.linkHref}>
          {card.linkTitle}
        </Link>
      </CardContent>
    </Card>
  );
}
