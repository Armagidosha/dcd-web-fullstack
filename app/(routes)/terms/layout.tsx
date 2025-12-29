import { metaConfig } from "@/app/shared/utils/constants";
import Footer from "@/app/shared/widgets/Footer";
import Header from "@/app/shared/widgets/Header/Header";

interface TermsLayoutProps {
  children: React.ReactNode;
}

export const metadata = metaConfig.terms;

export default function TermsLayout({ children }: TermsLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
