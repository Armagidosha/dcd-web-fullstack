import type { Metadata } from "next";
import type { PaymentMethods } from "./types/payment";

export const POLICY_TYPES = {
  TERMS: "terms",
  PRIVACY: "privacy",
} as const;

export const PAYMENT_METHODS: PaymentMethods[] = ["YooKassa"];

export const PAYMENT_ERROR = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  PRODUCT_NOT_FOUND: "PRODUCT_NOT_FOUND",
  PROMO_INVALID: "PROMO_INVALID",
  PROMO_LIMIT_EXCEEDED: "PROMO_LIMIT_EXCEEDED",
  PROMO_EXPIRED: "PROMO_EXPIRED",
  ALREADY_PAID: "ALREADY_PAID",
  PAYMENT_CREATION_FAILED: "PAYMENT_CREATION_FAILED",
  DATABASE_ERROR: "DATABASE_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  UNSUPPORTED_METHOD: "UNSUPPORTED_METHOD",
} as const;

export const PLAYER_ERROR = {
  PLAYER_HAS_PRIVILEGE: "PLAYER_HAS_PRIVILEGE",
  PLAYER_NOT_FOUND: "PLAYER_NOT_FOUND",
} as const;

export const SERVER_ERROR = {
  SERVER_UNAVAILABLE: "SERVER_UNAVAILABLE",
} as const;

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
