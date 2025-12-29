import { metaConfig } from "@/app/shared/utils/constants";
import Footer from "@/app/shared/widgets/Footer";
import Header from "@/app/shared/widgets/Header/Header";

interface PrivacyLayoutProps {
  children: React.ReactNode;
}

export const metadata = metaConfig.privacy;

export default function PrivacyLayout({ children }: PrivacyLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
