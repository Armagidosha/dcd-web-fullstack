import type { ReactNode } from "react";
import Footer from "@/app/shared/widgets/Footer/Footer";
import Header from "@/app/shared/widgets/Header/Header";

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
