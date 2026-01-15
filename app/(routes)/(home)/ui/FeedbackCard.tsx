import Image from "next/image";
import Link from "next/link";
import Paper from "@/app/shared/ui/Paper";

interface FeedbackCardProps {
  title: string;
  imagePath: string;
  description: string;
  linkHref: string;
  link: string;
}

export default function FeedbackCard({ card }: { card: FeedbackCardProps }) {
  return (
    <Paper
      key={card.title}
      className="place-items-center w-full grid p-4 
        transition-transform duration-300 hover:scale-102"
      withBorder
      withGradient
    >
      <Image width={200} height={200} src={card.imagePath} alt={card.title} />
      <div className="text-center max-w-3xs">
        <h3 className="text-lg font-semibold">{card.title}</h3>
        <p>
          {card.description}
          <Link className="text-primary " target="blank" href={card.linkHref}>
            {card.link}
          </Link>
          .
        </p>
      </div>
    </Paper>
  );
}
