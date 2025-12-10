import { metaConfig } from "@shared/utils/constants";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "@styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  preload: false,
});

export const metadata: Metadata = metaConfig.home;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
