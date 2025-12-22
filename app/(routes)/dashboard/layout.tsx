import DashboardHeader from "./widgets/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen py-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </>
  );
}
