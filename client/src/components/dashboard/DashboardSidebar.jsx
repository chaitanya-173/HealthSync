import Calendar from "./Calender";

export default function DashboardSidebar() {
  return (
    <aside
      className="
        fixed top-6 right-6 bottom-6
        w-72
        overflow-y-auto
      "
    >
      <Calendar />

      {/* WaterTracker */}

      {/* DailyGoals */}
    </aside>
  );
}