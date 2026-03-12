import type { Metadata } from "next";

export const metaConfig = {
  home: {
    title: { template: "%s - DraimCiDo", default: "Главная - DraimCiDo" },
    description:
      "Исследуйте мир DraimCiDo! Дружественный Minecraft сервер с уникальными механиками и интересным прогрессом.",
  },
  store: {
    title: "Донат-услуги",
    description:
      "Поддержите проект DraimCiDo и получите доступ к дополнительным возможностям!",
  },
  rules: {
    title: "Правила",
    description:
      "Изучите правила проекта DraimCiDo, чтобы обеспечить приятную и комфортную игровую атмосферу для всех участников.",
  },
  notFound: {
    title: "404",
    robots: {
      index: false,
      follow: false,
    },
  },
  privacy: {
    title: "Политика конфиденциальности",
    description:
      "Узнайте, какие данные мы собираем и как их обрабатываем на сервере DraimCiDo.",
  },
  terms: {
    title: "Пользовательское соглашение",
    description:
      "Ознакомьтесь с правилами использования сервера DraimCiDo и условиями предоставления услуг.",
  },
  dashboard: {
    title: "Панель управления",
    robots: { index: false, follow: false },
  },
  signIn: {
    title: "Вход",
    robots: { index: false, follow: false },
  },
} as const satisfies Record<string, Metadata>;
