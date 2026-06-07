import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardContent from "../components/dashboard/DashboardContent";
import InputBar from "../components/common/InputBar";

export default function Home() {
  return (
    <div className="h-[calc(100vh-120px)] min-h-0 flex flex-col gap-6">
      <DashboardHeader />
      <DashboardContent />
      <InputBar />
    </div>
  );
}
