import { Zap } from "lucide-react";

import DateBox from "../DateBox";
import WeekSelector from "../WeekSelector";
import NutritionProgressCard from "../NutritionProgressCard";

export default function DashboardHeader({
  selectedDate,
  setSelectedDate,
}) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div
      className="
        grid
        grid-cols-[1fr_380px]
        gap-6
      "
    >
      {/* LEFT */}
      <div className="flex flex-col justify-between">
        {/* Greeting */}
        <div>
          <p className="text-sm text-[var(--text-muted)]">
            {greeting},
          </p>

          <h2 className="text-2xl font-semibold mt-1">
            Chaitanya
          </h2>
        </div>

        {/* Date + Streak */}
        <div className="flex items-center justify-between mt-4">
          <DateBox selectedDate={selectedDate} />

          <div
            className="
              flex items-center gap-2
              px-3 py-2.5
              rounded-2xl
              bg-[var(--surface)]
            "
          >
            <Zap
              size={15}
              className="text-[var(--warning)]"
            />

            <span className="text-sm font-medium">
              7 Day Streak
            </span>
          </div>
        </div>

        {/* Week Selector */}
        <div className="mt-3">
          <WeekSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center">
        <NutritionProgressCard />
      </div>
    </div>
  );
}