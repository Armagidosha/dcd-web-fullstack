import type { Metadata } from "next";

export const metadata = {
  homePage: {
    title: { template: "%s - DraimCiDo", default: "Главная - DraimCiDo" },
    description:
      "Исследуйте мир DraimCiDo! Дружественный Minecraft сервер с уникальными механиками и интересным прогрессом.",
  },
} as const satisfies Record<string, Metadata>;
