import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import NewSidebar from "../components/layout/NewSidebar";
import { Outlet } from "react-router-dom";

export default function NewAppLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <NewSidebar />

      <main className="ml-[272px] mr-[320px] p-6">
        <Outlet />
      </main>

      <DashboardSidebar />
    </div>
  );
}