import { Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import DateBox from "./DateBox";
import WeekSelector from "./WeekSelector";
import NutritionProgressCard from "./NutritionProgressCard";
import { useDashboard } from "../../context/DashboardContext";

export default function DashboardHeader() {
  const { user } = useAuth();
  const { streak } = useDashboard();

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="grid grid-cols-[1fr_380px] gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-[var(--text-muted)]">
            {greeting},
          </p>

          <h2 className="text-2xl font-semibold">
            {user?.name || "User"}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <DateBox />

          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--surface)]">
            <Zap
              size={15}
              className="text-[var(--warning)]"
            />

            <span className="text-sm font-medium">
              {streak > 0
  ? `${streak} Day Streak`
  : "Start your streak"}
            </span>
          </div>
        </div>

        <WeekSelector />
      </div>

      <div className="flex">
        <NutritionProgressCard/>
      </div>
    </div>
  );
}
