import { Flame, PieChart } from "lucide-react";

export default function StatsCards({ data }) {
  const {
    calories = { consumed: 0, burned: 0, remaining: 0 },
    macros = { carbs: 0, protein: 0, fat: 0 },
  } = data || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Calories Card */}
      <div className="
        rounded-lg p-5
        border border-[var(--border)]
        bg-[var(--surface)]/70 backdrop-blur-xl
        shadow
      ">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-orange-500" size={20} />
          <h3 className="font-semibold">Calories</h3>
        </div>

        <div className="flex justify-between text-center">
          <div>
            <p className="text-xl font-bold">{calories.consumed}</p>
            <p className="text-xs text-[var(--text-muted)]">Food</p>
          </div>

          <div>
            <p className="text-xl font-bold">{calories.burned}</p>
            <p className="text-xs text-[var(--text-muted)]">Exercise</p>
          </div>

          <div>
            <p className="text-xl font-bold">{calories.remaining}</p>
            <p className="text-xs text-[var(--text-muted)]">Remaining</p>
          </div>
        </div>
      </div>

      {/* Macros Card */}
      <div className="
        rounded-lg p-5
        border border-[var(--border)]
        bg-[var(--surface)]/70 backdrop-blur-xl
        shadow
      ">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="text-pink-500" size={20} />
          <h3 className="font-semibold">Macros</h3>
        </div>

        <div className="flex justify-between text-center">
          <div>
            <p className="text-lg font-bold">{macros.carbs}g</p>
            <p className="text-xs text-[var(--text-muted)]">Carbs</p>
          </div>

          <div>
            <p className="text-lg font-bold">{macros.protein}g</p>
            <p className="text-xs text-[var(--text-muted)]">Protein</p>
          </div>

          <div>
            <p className="text-lg font-bold">{macros.fat}g</p>
            <p className="text-xs text-[var(--text-muted)]">Fat</p>
          </div>
        </div>
      </div>

    </div>
  );
}