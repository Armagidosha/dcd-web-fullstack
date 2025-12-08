import DashboardHeader from "./_components/new/DashboardHeader";

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
