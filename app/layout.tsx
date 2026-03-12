import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { metaConfig } from "@/lib/utils/constants/meta";

import "./globals.css";

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
    <html data-scroll-behavior="smooth" className="scroll-smooth" lang="ru">
      <body className={montserrat.className}>
        <div className="flex flex-col min-h-screen px-4">{children}</div>
      </body>
    </html>
  );
}
