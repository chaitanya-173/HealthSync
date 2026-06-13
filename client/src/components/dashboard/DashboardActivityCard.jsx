import { Flame } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

export default function DashboardActivityCard() {
  const { summary, goals } = useDashboard();

  if (!summary || !goals) {
    return (
      <div className="mt-4 h-[180px] rounded-lg bg-[var(--surface)] animate-pulse" />
    );
  }

  const consumed =
    summary.consumedCalories ??
    Math.max(summary.totalCalories, 0);

  const burned =
    summary.burnedCalories ?? 0;

  const goal = goals.calories || 2000;

  const remaining = goal - consumed + burned;

  const progress = Math.min(
    (consumed / goal) * 100,
    100
  );

  return (
    <div className="mt-4 rounded-lg bg-[var(--surface)] p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
          <Flame size={17} />
        </span>

        <div>
          <h3 className="text-sm font-semibold">
            Calories Remaining
          </h3>

          <p className="text-xs text-[var(--text-muted)]">
            Daily calorie budget
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-[20px] font-bold leading-none">
          {remaining}
        </h2>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          kcal remaining
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-[var(--surface-alt)] px-3 py-2">
          <p className="text-[11px] text-[var(--text-muted)]">
            Consumed
          </p>

          <p className="text-lg font-semibold">
            {consumed}
          </p>
        </div>

        <div className="rounded-lg bg-[var(--surface-alt)] p-3">
          <p className="text-[11px] text-[var(--text-muted)]">
            Burned
          </p>

          <p className="text-lg font-semibold text-red-500">
            {burned}
          </p>
        </div>
      </div>
    </div>
  );
}