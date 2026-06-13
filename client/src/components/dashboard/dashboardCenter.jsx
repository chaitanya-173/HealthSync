import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import InputBar from "../common/InputBar";

export default function DashboardCenter() {
  return (
    <div className="flex-1 min-w-0 flex flex-col h-[calc(100vh-48px)] overflow-hidden rounded-lg">
      <DashboardHeader />

      <div className="flex-1 min-h-0 mt-6">
        <DashboardContent />
      </div>

      <div className="mt-6">
        <InputBar />
      </div>
    </div>
  );
}