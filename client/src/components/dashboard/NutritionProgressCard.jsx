import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function NutritionProgressCard() {
  const calories = {
    current: 1850,
    goal: 2500,
  };

  const macros = [
    {
      label: "Carbs",
      current: 110,
      goal: 190,
      color: "#F59E0B",
      track: "#4B3200",
    },
    {
      label: "Protein",
      current: 110,
      goal: 150,
      color: "#22C55E",
      track: "#11361C",
    },
    {
      label: "Fat",
      current: 45,
      goal: 70,
      color: "#A855F7",
      track: "#2C1747",
    },
  ];

  const totalGoal = macros[0].goal + macros[1].goal + macros[2].goal;

  const TOTAL_ARC = 345;
  const START = 225;
  const GAP = 5;

  const carbsArc = (macros[0].goal / totalGoal) * TOTAL_ARC;
  const proteinArc = (macros[1].goal / totalGoal) * TOTAL_ARC;
  const fatArc = (macros[2].goal / totalGoal) * TOTAL_ARC;

  const carbsStart = START;
  const carbsEnd = carbsStart - carbsArc;

  const proteinStart = carbsEnd - GAP;
  const proteinEnd = proteinStart - proteinArc;

  const fatStart = proteinEnd - GAP;
  const fatEnd = fatStart - fatArc;

  const carbsProgress =
    Math.min(macros[0].current, macros[0].goal) / macros[0].goal;

  const proteinProgress =
    Math.min(macros[1].current, macros[1].goal) / macros[1].goal;

  const fatProgress =
    Math.min(macros[2].current, macros[2].goal) / macros[2].goal;

  return (
    <div className="w-full h-[205px] rounded-lg bg-[var(--surface)] px-6 py-3 flex items-center justify-center gap-12 overflow-hidden">
      {/* CHART */}
      <div className="relative w-[180px] h-[150px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* CARBS TRACK */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={carbsStart}
              endAngle={carbsEnd}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[0].track} />
            </Pie>

            {/* CARBS PROGRESS */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={carbsStart}
              endAngle={carbsStart - carbsArc * carbsProgress}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[0].color} />
            </Pie>

            {/* PROTEIN TRACK */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={proteinStart}
              endAngle={proteinEnd}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[1].track} />
            </Pie>

            {/* PROTEIN PROGRESS */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={proteinStart}
              endAngle={proteinStart - proteinArc * proteinProgress}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[1].color} />
            </Pie>

            {/* FAT TRACK */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={fatStart}
              endAngle={fatEnd}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
              isAnimationActive={false}
            >
              <Cell fill={macros[2].track} />
            </Pie>

            {/* FAT PROGRESS */}
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={fatStart}
              endAngle={fatStart - fatArc * fatProgress}
              innerRadius={68}
              outerRadius={74}
              stroke="none"
              cornerRadius={50}
            >
              <Cell fill={macros[2].color} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-[30px] font-bold leading-none">
            {calories.current}
          </h2>

          <p className="text-xs text-[var(--text-muted)]">/{calories.goal}</p>

          <p className="mt-1 text-[11px] text-[var(--text-muted)]">Calories</p>
        </div>
      </div>

      {/* STATS */}
      <div className="flex flex-col gap-3 w-[90px]">
        {macros.map((m) => (
          <div
            key={m.label}
            className="pl-2 border-l-2"
            style={{ borderColor: m.color }}
          >
            <p className="text-[11px] font-medium" style={{ color: m.color }}>
              {m.label}
            </p>

            <p className="text-[15px] font-semibold">
              {m.current}g
              <span className="text-[var(--text-muted)] font-normal">
                {" "}
                / {m.goal}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
