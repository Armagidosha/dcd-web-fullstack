import Header from "@shared/widgets/Header/Header";
import type { ReactNode } from "react";
import Footer from "@/app/shared/widgets/Footer";

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
