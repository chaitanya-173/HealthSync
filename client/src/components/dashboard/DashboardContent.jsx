import LogCards from "../LogCards";

export default function DashboardContent({ logs, activeTab }) {
  return (
    <div
      className="
        flex-1
        min-h-0
      "
    >
      <LogCards
        logs={logs}
        activeTab={activeTab}
      />
    </div>
  );
}