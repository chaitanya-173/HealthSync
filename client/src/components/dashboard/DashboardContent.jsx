import LogCards from "./LogCards";
import { useDashboard } from "../../context/DashboardContext";

export default function DashboardContent() {
  const { logs, savedLogs } = useDashboard();
  return (
    <div className="h-[calc(100vh-365px)]">
  <LogCards logs={logs} savedLogs={savedLogs} />
</div>
  );
}
