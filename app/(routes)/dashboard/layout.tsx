import { metaConfig } from "@/app/shared/utils/constants";
import DashboardHeader from "./widgets/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata = metaConfig.dashboard;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <DashboardHeader />
      <div className="py-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </>
  );
}
