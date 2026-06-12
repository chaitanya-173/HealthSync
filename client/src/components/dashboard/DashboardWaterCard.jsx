import { Droplet, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import { updateDailyWater } from "../../services/waterService";

export default function DashboardWaterCard() {
  const { selectedDate, formatLocalDate, water, fetchWater } = useDashboard();

  const cupsConsumed = water?.cupsConsumed || 0;
  const cupsGoal = water?.cupsGoal || 10;
  const dailyLitersGoal = water?.dailyLitersGoal || 2.5;
  const litersConsumed = water?.litersConsumed || 0;
  const progress = Math.min((cupsConsumed / Math.max(cupsGoal, 1)) * 100, 100);

  const handleAddCup = async () => {
    try {
      await updateDailyWater({
        date: formatLocalDate(selectedDate),
        delta: 1,
      });

      await fetchWater(selectedDate);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add water");
    }
  };

  const handleRemoveCup = async () => {
    try {
      await updateDailyWater({
        date: formatLocalDate(selectedDate),
        delta: -1,
      });

      await fetchWater(selectedDate);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not remove water");
    }
  };

  return (
    <div className="mt-4 rounded-lg bg-[var(--surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <Link to="/water" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
            <Droplet size={17} />
          </span>

          <div>
            <h3 className="text-sm font-semibold">Water</h3>
            <p className="text-xs text-[var(--text-muted)]">
              {cupsConsumed > 0
                ? `${water.cupsRemaining} cups remaining`
                : "No water logged today."}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={cupsConsumed <= 0}
            onClick={handleRemoveCup}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-alt)] text-[var(--text)] transition hover:text-sky-400 disabled:opacity-40"
            title="Remove cup"
          >
            <Minus size={16} />
          </button>

          <button
            type="button"
            onClick={handleAddCup}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-alt)] text-[var(--text)] transition hover:text-sky-400"
            title="Add cup"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">
            {cupsConsumed} / {cupsGoal} Cups
          </span>

          <span className="text-xs text-[var(--text-muted)]">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-alt)]">
          <div
            className="h-full rounded-full bg-sky-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          {litersConsumed}L / {dailyLitersGoal}L
        </p>
      </div>
    </div>
  );
}
