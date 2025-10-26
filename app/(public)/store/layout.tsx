import type { ReactNode } from "react";

import { metadata as metadataConfig } from "@/app/shared/lib/constants";
import Footer from "@/app/widgets/Footer/Footer";
import Header from "@/app/widgets/Header/Header";

interface DonatePageLayoutProps {
  children: ReactNode;
}

export const metadata = metadataConfig.donatePage;

const DonatePageLayout = ({ children }: DonatePageLayoutProps) => {
  return (
    <>
      <Header /> <main></main>
      {children}
      <Footer />
    </>
  );
};

export default DonatePageLayout;
