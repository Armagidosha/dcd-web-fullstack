import { metaConfig } from "@shared/utils/constants";
import Header from "@shared/widgets/Header/Header";
import type { ReactNode } from "react";
import Footer from "@/app/shared/widgets/Footer";

interface DonatePageLayoutProps {
  children: ReactNode;
}

export const metadata = metaConfig.store;

const DonatePageLayout = ({ children }: DonatePageLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DonatePageLayout;
