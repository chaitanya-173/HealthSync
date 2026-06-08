import WeeklyProgressCard from "../components/weekly/WeeklyProgressCard";
import CaloriesChart from "../components/weekly/CaloriesChart";
import MacroChart from "../components/weekly/MacroChart";
import WeeklyTable from "../components/weekly/WeeklyTable";
import WeeklyInsights from "../components/weekly/WeeklyWaterIntakeCard";

import { weeklySummaryData } from "../components/weekly/dummyWeeklySummaryData";

export default function WeeklySummary() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">
          Weekly Summary
        </h1>

        <p className="text-sm text-[var(--text-muted)] mt-1">
          Last 7 days nutrition overview
        </p>
      </div>

      <div className="grid grid-cols-[380px_1fr] gap-6">
        <WeeklyProgressCard data={weeklySummaryData} />
        <CaloriesChart data={weeklySummaryData} />
      </div>

      <MacroChart data={weeklySummaryData} />

      <div className="grid grid-cols-2 gap-6">
        <WeeklyInsights data={weeklySummaryData} />
        <WeeklyTable data={weeklySummaryData} />
      </div>
    </div>
  );
}