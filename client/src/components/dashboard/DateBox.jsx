import { ChevronDown } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function DateBox() {
  const { selectedDate } = useDashboard();

  const formatDisplayDate = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--surface)] hover:opacity-90 transition-all duration-200">
      <span className="text-sm font-medium">
        {formatDisplayDate(selectedDate)}
      </span>

      <ChevronDown size={15} className="text-[var(--text-muted)]" />
    </button>
  );
}
