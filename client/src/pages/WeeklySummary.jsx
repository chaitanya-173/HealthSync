import { useEffect, useState } from "react";
import WeeklyProgressCard from "../components/weekly/WeeklyProgressCard";
import CaloriesChart from "../components/weekly/CaloriesChart";
import MacroChart from "../components/weekly/MacroChart";
import WeeklyTable from "../components/weekly/WeeklyTable";
import WeeklyInsights from "../components/weekly/WeeklyWaterIntakeCard";
import { getWeeklyLogs } from "../services/logService";

export default function WeeklySummary() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        setLoading(true);
        const res = await getWeeklyLogs();

        setWeeklyData(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch weekly summary:", error);
        setWeeklyData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

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

      {loading && (
        <div className="h-[240px] rounded-lg bg-[var(--surface)] animate-pulse" />
      )}

      {!loading && weeklyData.length === 0 && (
        <div className="rounded-lg bg-[var(--surface)] p-6 text-sm text-[var(--text-muted)]">
          No nutrition logs found for the last 7 days.
        </div>
      )}

      {!loading && weeklyData.length > 0 && (
        <>
          <div className="grid grid-cols-[380px_1fr] gap-6">
            <WeeklyProgressCard data={weeklyData} />
            <CaloriesChart data={weeklyData} />
          </div>

          <MacroChart data={weeklyData} />

          <div className="grid grid-cols-2 gap-6">
            <WeeklyInsights data={weeklyData} />
            <WeeklyTable data={weeklyData} />
          </div>
        </>
      )}
    </div>
  );
}
