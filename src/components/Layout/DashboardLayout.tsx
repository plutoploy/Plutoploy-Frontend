import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#070527]">
      <Sidebar />
      <main className="flex-1 overflow-auto ml-64">
        {children}
      </main>
    </div>
  );
}
