import LogCards from "../LogCards";

export default function DashboardContent({ logs, savedLogs }) {
  return (
    <div className="flex-1 min-h-0 mb-2">
      <LogCards logs={logs} savedLogs={savedLogs} />
    </div>
  );
}
