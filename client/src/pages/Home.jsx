import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardContent from "../components/dashboard/DashboardContent";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import InputBar from "../components/common/InputBar";

export default function Home() {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-1 min-w-0">
        <div className="h-[calc(100vh-120px)] min-h-0 flex flex-col gap-6">
          <DashboardHeader />
          <DashboardContent />
          <InputBar />
        </div>
      </div>
      <DashboardSidebar />
    </div>
  );
}