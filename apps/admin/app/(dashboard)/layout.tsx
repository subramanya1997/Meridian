import { Sidebar } from "../../components/sidebar";
import { Topbar } from "../../components/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[260px]">
        <Topbar />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
