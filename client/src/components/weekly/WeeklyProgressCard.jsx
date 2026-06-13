import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useDashboard } from "../../context/DashboardContext";

export default function WeeklyProgressCard({ data }) {
  const { goals } = useDashboard();
  const days = Math.max(data.length, 1);

  const avgCalories = Math.round(
    data.reduce((s, d) => s + d.calories, 0) / days,
  );

  const avgProtein = Math.round(data.reduce((s, d) => s + d.protein, 0) / days);
  const avgCarbs = Math.round(data.reduce((s, d) => s + d.carbs, 0) / days);
  const avgFat = Math.round(data.reduce((s, d) => s + d.fat, 0) / days);

  const macros = [
    {
      label: "Carbs (g)",
      current: avgCarbs,
      goal: goals?.carbs || 250,
      color: "#F59E0B",
      track: "#4B3200",
    },
    {
      label: "Protein (g)",
      current: avgProtein,
      goal: goals?.protein || 125,
      color: "#22C55E",
      track: "#11361C",
    },
    {
      label: "Fat (g)",
      current: avgFat,
      goal: goals?.fat || 56,
      color: "#A855F7",
      track: "#2C1747",
    },
  ];

  const totalGoal = macros.reduce((s, m) => s + m.goal, 0);

  const TOTAL_ARC = 345;
  const START = 225;
  const GAP = 5;

  const carbsArc = (macros[0].goal / totalGoal) * TOTAL_ARC;
  const proteinArc = (macros[1].goal / totalGoal) * TOTAL_ARC;
  const fatArc = (macros[2].goal / totalGoal) * TOTAL_ARC;

  const carbsProgress =
    Math.min(macros[0].current, macros[0].goal) / macros[0].goal;

  const proteinProgress =
    Math.min(macros[1].current, macros[1].goal) / macros[1].goal;

  const fatProgress =
    Math.min(macros[2].current, macros[2].goal) / macros[2].goal;

  return (
    <div className="h-[240px] rounded-lg bg-[var(--surface)] px-6 py-4 flex items-center gap-10">
      <div className="relative w-[180px] h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* CARBS */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={START}
              endAngle={START - carbsArc}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[0].track} />
            </Pie>

            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={START}
              endAngle={START - carbsArc * carbsProgress}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[0].color} />
            </Pie>

            {/* PROTEIN */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={START - carbsArc - GAP}
              endAngle={START - carbsArc - GAP - proteinArc}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[1].track} />
            </Pie>

            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={START - carbsArc - GAP}
              endAngle={START - carbsArc - GAP - proteinArc * proteinProgress}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[1].color} />
            </Pie>

            {/* FAT */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={START - carbsArc - GAP - proteinArc - GAP}
              endAngle={START - carbsArc - GAP - proteinArc - GAP - fatArc}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[2].track} />
            </Pie>

            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={START - carbsArc - GAP - proteinArc - GAP}
              endAngle={
                START - carbsArc - GAP - proteinArc - GAP - fatArc * fatProgress
              }
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[2].color} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold">{avgCalories}</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Avg Calories (kcal)
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {macros.map((m) => (
          <div
            key={m.label}
            className="pl-3 border-l-2"
            style={{ borderColor: m.color }}
          >
            <p className="text-xs font-medium" style={{ color: m.color }}>
              Avg {m.label}
            </p>

            <p className="font-semibold">{m.current}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
