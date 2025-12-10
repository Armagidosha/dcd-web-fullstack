import DashboardHeader from "./widgets/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
