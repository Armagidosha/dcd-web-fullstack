import Header from "@shared/widgets/Header/Header";
import type { ReactNode } from "react";
import Footer from "@/app/shared/widgets/Footer";

interface RulesLayoutProps {
  children: ReactNode;
}

export default function RulesLayout({ children }: RulesLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
