import { Pencil, MoreVertical } from "lucide-react";

export default function LogCard({ log }) {
  const { result, createdAt, text } = log;

  const items = result?.items || [];
  const total = result?.total || {};

  const macros = [
    { label: "Cal", value: total.calories },
    { label: "C", value: total.carbs },
    { label: "P", value: total.protein },
    { label: "F", value: total.fat },
  ];

  return (
    <div
      className="
      rounded-xl p-4
      border border-[var(--border)]
      bg-[var(--surface)]/70 backdrop-blur-xl
      shadow-sm
      space-y-3
      hover:shadow-md transition
    "
    >
      {/* 🔹 Input */}
      {text && (
        <p className="text-[11px] text-[var(--text-muted)] truncate">
          {text}
        </p>
      )}

      {/* 🔹 Items */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="space-y-1">
            <p className="text-sm font-medium">
              {item.name}{" "}
              <span className="text-[var(--text-muted)] text-xs">
                ({item.quantity})
              </span>
            </p>

            <div className="flex gap-2 flex-wrap text-[10px]">
              <span className="px-2 py-[2px] rounded-md bg-[var(--border)]">
                {item.calories} cal
              </span>
              <span className="px-2 py-[2px] rounded-md bg-[var(--border)]">
                C {item.carbs}
              </span>
              <span className="px-2 py-[2px] rounded-md bg-[var(--border)]">
                P {item.protein}
              </span>
              <span className="px-2 py-[2px] rounded-md bg-[var(--border)]">
                F {item.fat}
              </span>
            </div>

            {i !== items.length - 1 && (
              <div className="border-t border-[var(--border)] mt-2" />
            )}
          </div>
        ))}
      </div>

      {/* 🔹 TOTAL (Circular Style) */}
      <div className="flex justify-between items-center pt-2 border-t border-[var(--border)]">
        <div className="flex gap-4">
          {macros.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              {/* Circle */}
              <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] flex items-center justify-center text-[11px] font-semibold">
                {m.value}
              </div>

              <span className="text-[10px] text-[var(--text-muted)]">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Time + actions */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[var(--text-muted)]">
            {new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          <Pencil size={14} className="cursor-pointer" />
          <MoreVertical size={14} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}