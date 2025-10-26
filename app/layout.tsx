import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { metadata as metadataConfig } from "@/constants";

import "@/styles/reset.css";
import "@/styles/globals.scss";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  preload: false,
});

export const metadata: Metadata = metadataConfig.homePage;

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
