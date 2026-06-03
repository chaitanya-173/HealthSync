import { useEffect, useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    <div className="w-full">
      <div
        className="
          w-full
          relative
          flex
          items-center
          justify-between
          gap-1
          p-1
          rounded-2xl
          bg-[var(--surface)]/70
          backdrop-blur-xl
          border border-[var(--border)]
          shadow
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
              onClick={() =>
                setSelectedDate(d.date)
              }
              className={`
                flex-1
                py-3
                rounded-xl
                flex flex-col
                items-center
                justify-center
                text-sm
                font-medium
                transition-all
                duration-300

                ${
                  selected
                    ? "bg-[var(--primary)] text-white shadow"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }
              `}
            >
              <span className="text-xs">
                {d.day}
              </span>

              <span className="text-base font-semibold">
                {d.dayNum}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}