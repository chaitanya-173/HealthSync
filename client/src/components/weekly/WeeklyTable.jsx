export default function WeeklyTable({ data }) {
  return (
    <div className="bg-[var(--surface)] rounded-lg p-5">
      <div className="mb-4">
        <h3 className="font-semibold">
          Daily Breakdown
        </h3>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          Nutrition summary for each day
        </p>
      </div>

      <div className="space-y-2">
        {data.map((d) => {
          const date = new Date(d.date);

          return (
            <div
              key={d.date}
              className="
                flex items-center justify-between
                px-4 py-3
                rounded-lg
                bg-[var(--surface-alt)]
                hover:opacity-90
                transition-all
              "
            >
              {/* DATE */}
              <div className="w-20">
                <p className="font-medium">
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>

                <p className="text-xs text-[var(--text-muted)]">
                  {date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>

              {/* CALORIES */}
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)]">
                  Calories
                </p>

                <p className="font-semibold text-white">
                  {d.calories}
                </p>
              </div>

              {/* CARBS */}
              <div className="text-center">
                <p
                  className="text-xs"
                  style={{ color: "#F59E0B" }}
                >
                  Carbs
                </p>

                <p className="font-semibold">
                  {d.carbs}g
                </p>
              </div>

              {/* PROTEIN */}
              <div className="text-center">
                <p
                  className="text-xs"
                  style={{ color: "#22C55E" }}
                >
                  Protein
                </p>

                <p className="font-semibold">
                  {d.protein}g
                </p>
              </div>

              {/* FAT */}
              <div className="text-center">
                <p
                  className="text-xs"
                  style={{ color: "#A855F7" }}
                >
                  Fat
                </p>

                <p className="font-semibold">
                  {d.fat}g
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}