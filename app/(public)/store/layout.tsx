import type { ReactNode } from "react";
import { metadata as metadataConfig } from "@/app/shared/utils/constants";
import Footer from "@/app/shared/widgets/Footer/Footer";
import Header from "@/app/shared/widgets/Header/Header";

interface DonatePageLayoutProps {
  children: ReactNode;
}

export const metadata = metadataConfig.donatePage;

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
