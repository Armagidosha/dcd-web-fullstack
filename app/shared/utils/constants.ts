import type { Metadata } from "next";

export const metadata = {
  homePage: {
    title: { template: "%s - DraimCiDo", default: "Главная - DraimCiDo" },
    description:
      "Исследуйте мир DraimCiDo! Дружественный Minecraft сервер с уникальными механиками и интересным прогрессом.",
  },
  donatePage: {
    title: "Донат-услуги",
    description:
      "Поддержите проект DraimCiDo и получите доступ к дополнительным возможностям!",
  },
  notFound: {
    title: "404",
    robots: {
      index: false,
      follow: false,
    },
  },
  rulesPage: {
    title: "Правила",
    description:
      "Изучите правила проекта DraimCiDo, чтобы обеспечить приятную и комфортную игровую атмосферу для всех участников.",
  },
} as const satisfies Record<string, Metadata>;
