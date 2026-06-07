import LogCards from "./LogCards";
import { useDashboard } from "../../context/DashboardContext";

export default function DashboardContent() {
  const { logs, savedLogs } = useDashboard();
  return (
    <div className="flex-1 min-h-0 mb-2">
      <LogCards logs={logs} savedLogs={savedLogs} />
    </div>
  );
}
