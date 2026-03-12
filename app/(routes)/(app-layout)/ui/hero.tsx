import Image from "next/image";
import Chevron from "@/ui/components/chevron";
import { Section } from "@/ui/primitives/section";

export default function Hero() {
  return (
    <Section className="flex justify-center h-screen pt-24">
      <div className="flex items-center flex-col md:flex-row">
        <div>
          <h1 className="text-2xl md:text-3xl">DraimCiDo</h1>
          <p className="text-shadow-lg mt-2 md:mt-4 max-w-xl">
            Вступайте в наше дружественное игровое комьюнити, познавайте новые
            просторы игры и наслаждайтесь игрой вместе с другими игроками.
          </p>
        </div>
        <Image
          className="drop-shadow-2xl -order-1 md:order-1"
          width={375}
          height={450}
          priority
          src="/images/greeting.png"
          alt="Приветствие"
        />
      </div>
      <Chevron className="absolute hidden md:block bottom-8 left-2/4 -translate-x-2/4" />
    </Section>
  );
}
