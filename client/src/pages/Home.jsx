import DashboardCenter from "../components/dashboard/dashboardCenter";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

export default function Home() {
  return (
    <div className="flex gap-6 h-[calc(100vh-48px)]">
      <DashboardCenter />
      <DashboardSidebar />
    </div>
  );
}