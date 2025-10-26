import type { ReactNode } from "react";
import Footer from "../widgets/Footer/Footer";
import Header from "../widgets/Header/Header";

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
