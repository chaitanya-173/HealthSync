import { useEffect, useState } from "react";

const days = ["S", "M", "T", "W", "T", "F", "S"];

export default function WeekSelector({
  selectedDate,
  setSelectedDate,
}) {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    const temp = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();

      d.setDate(today.getDate() - i);

      temp.push({
        date: d,
        day: days[d.getDay()],
        dayNum: d.getDate(),
      });
    }

    setWeekDays(temp);
  }, []);

  const isSameDay = (d1, d2) =>
    d1.toDateString() === d2.toDateString();

  return (
    <div
      className="
        flex items-center justify-between
        px-4 py-3
        rounded-lg
        bg-[var(--surface)]
      "
    >
      {weekDays.map((d, index) => {
        const selected = isSameDay(
          d.date,
          selectedDate
        );

        return (
          <button
            key={index}
            onClick={() => setSelectedDate(d.date)}
            className="
              flex flex-col items-center
              gap-1.5
            "
          >
            <span className="text-xs text-[var(--text-muted)]">
              {d.day}
            </span>

            <div
              className={`
                w-9 h-9
                rounded-full
                flex items-center justify-center
                text-sm font-semibold
                transition-all duration-200

                ${
                  selected
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--surface-alt)] text-[var(--text)]"
                }
              `}
            >
              {d.dayNum}
            </div>
          </button>
        );
      })}
    </div>
  );
}