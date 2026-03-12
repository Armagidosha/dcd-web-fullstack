import type { ReactNode } from "react";
import Footer from "@/ui/components/footer";
import Header from "@/ui/components/header/header";

interface HomePageLayoutProps {
  children: ReactNode;
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomePageLayout;
