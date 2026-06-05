import { Zap } from "lucide-react";

import DateBox from "../DateBox";
import WeekSelector from "../WeekSelector";
import NutritionProgressCard from "../NutritionProgressCard";

export default function DashboardHeader({ selectedDate, setSelectedDate }) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="grid grid-cols-[1fr_380px] gap-6">
      {/* LEFT */}
      <div className="flex flex-col gap-4">
        {/* Greeting */}
        <div>
          <p className="text-sm text-[var(--text-muted)]">{greeting},</p>

          <h2 className="text-2xl font-semibold">Chaitanya</h2>
        </div>

        {/* Date + Streak */}
        <div className="flex items-center justify-between">
          <DateBox selectedDate={selectedDate} />

          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--surface)]">
            <Zap size={15} className="text-[var(--warning)]" />

            <span className="text-sm font-medium">7 Day Streak</span>
          </div>
        </div>

        {/* Week Selector */}
        <WeekSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {/* RIGHT */}
      <div className="flex">
        <NutritionProgressCard />
      </div>
    </div>
  );
}
