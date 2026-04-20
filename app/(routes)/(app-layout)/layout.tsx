import type { ReactNode } from "react";
import Footer from "@/ui/components/footer";
import Header from "@/ui/components/header/header";

interface HomePageLayoutProps {
  children: ReactNode;
}

export default function HomePageLayout({ children }: HomePageLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
