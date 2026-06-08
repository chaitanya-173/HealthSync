import { waterIntakeData } from "./waterIntakeData";

export default function WaterIntakeCard() {
  const avgCups =
    waterIntakeData.reduce((s, d) => s + d.cups, 0) /
    waterIntakeData.length;

  const avgGoalCups =
    waterIntakeData.reduce((s, d) => s + d.goalCups, 0) /
    waterIntakeData.length;

  const avgVolume = (avgCups * 0.25).toFixed(1);

  const progress = (avgCups / avgGoalCups) * 100;

  return (
    <div className="bg-[var(--surface)] rounded-lg p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold">Water Intake</h3>

        <p className="text-xs text-[var(--text-muted)] mt-1">
          Daily hydration over the last 7 days
        </p>
      </div>

      {/* Summary */}
      <div className="mb-5">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-3xl font-bold text-sky-400">
              {avgVolume}L
            </p>

            <p className="text-xs text-[var(--text-muted)]">
              Daily Average
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">
              {Math.round(progress)}%
            </p>

            <p className="text-xs text-[var(--text-muted)]">
              Goal Completion
            </p>
          </div>
        </div>

        <div className="h-3 rounded-full bg-[var(--surface-alt)] overflow-hidden">
          <div
            className="h-full rounded-full bg-sky-500"
            style={{
              width: `${Math.min(progress, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Daily Hydration */}
      <div className="space-y-4">
        {waterIntakeData.map((d) => {
          const volume = (d.cups * 0.25).toFixed(1);

          const day = new Date(d.date).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            },
          );

          const width = Math.min(
            (d.cups / d.goalCups) * 100,
            100,
          );

          return (
            <div
              key={d.date}
              className="grid grid-cols-[90px_1fr_80px] items-center gap-4"
            >
              {/* LEFT */}
              <div>
                <p className="font-medium">{day}</p>

                <p className="text-xs text-[var(--text-muted)]">
                  {new Date(d.date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                    },
                  )}
                </p>
              </div>

              {/* CENTER BAR */}
              <div className="h-1.5 rounded-full bg-[var(--surface-alt)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{
                    width: `${width}%`,
                  }}
                />
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="font-semibold text-sky-400">
                  {volume}L
                </p>

                <p className="text-xs text-[var(--text-muted)]">
                  {d.cups}/{d.goalCups} cups
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}