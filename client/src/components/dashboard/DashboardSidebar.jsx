import Calendar from "./Calender";
import DashboardWaterCard from "./DashboardWaterCard";
import { useDashboard } from "../../context/DashboardContext";

export default function DashboardSidebar() {
  const { selectedDate } = useDashboard();
  const calendarKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}`;

  return (
    <aside className="w-72 flex-shrink-0">
      <Calendar key={calendarKey} />
      <DashboardWaterCard />
    </aside>
  );
}
