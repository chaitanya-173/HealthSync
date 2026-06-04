import { useState } from "react";
import { ChevronRight, Pencil, MoreVertical } from "lucide-react";

export default function LogCard({ log, index = 0 }) {
  const [expanded, setExpanded] = useState(false);

  const { result, createdAt, text } = log;

  const items = result?.items || [];
  const total = result?.total || {};
  const title = items
    .slice(0, 3)
    .map((item) => item.name)
    .join(" • ");

  return (
    <div
      className={`
    ${index % 2 === 0 ? "bg-white/[0.025]" : ""}

    transition
    hover:bg-white/[0.03]
  `}
    >
      {/* COLLAPSED HEADER */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="
          w-full
          px-5 py-2.5
          flex items-center justify-between
          text-left
        "
      >
        <div className="flex items-center gap-3 min-w-0">
          <ChevronRight
            size={16}
            className={`
              shrink-0
              transition-transform
              duration-200
              ${expanded ? "rotate-90" : ""}
            `}
          />

          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{title}</p>

            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              {new Date(createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center shrink-0 ml-auto">
          <div className="flex items-center gap-8">
            <div className="text-right w-10">
              <p className="text-sm font-semibold">{total.calories}</p>
              <p className="text-[10px] text-[var(--text-muted)]">Calories</p>
            </div>

            <div className="text-right w-8">
              <p className="text-sm font-semibold text-amber-400">
                {total.carbs}g
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">Carbs</p>
            </div>

            <div className="text-right w-8">
              <p className="text-sm font-semibold text-green-400">
                {total.protein}g
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">Protein</p>
            </div>

            <div className="text-right w-8">
              <p className="text-sm font-semibold text-purple-400">
                {total.fat}g
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">Fat</p>
            </div>
          </div>

          <div className="w-px h-8 bg-white/10 mx-5" />

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded hover:bg-white/[0.05]"
            >
              <Pencil size={14} />
            </button>

            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded hover:bg-white/[0.05]"
            >
              <MoreVertical size={14} />
            </button>
          </div>
        </div>
      </button>

      {/* EXPANDED CONTENT */}
      {expanded && (
        <div className="px-6 pb-3">
          <div className="py-2 space-y-1">
            {items.map((item, i) => (
              <div
                key={i}
                className="
    flex
    items-center
    justify-between
    py-2
  "
              >
                <div>
                  <p className="text-sm font-medium">{item.name}</p>

                  <p className="text-xs text-[var(--text-muted)]">
                    {item.quantity}
                  </p>
                </div>

                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded-md bg-[#202938]">
                    Calories: {item.calories} 
                  </span>

                  <span className="px-2 py-1 rounded-md bg-[#202938] text-amber-400">
                    Carbs: {item.carbs}g
                  </span>

                  <span className="px-2 py-1 rounded-md bg-[#202938] text-green-400">
                    Protein: {item.protein}g
                  </span>

                  <span className="px-2 py-1 rounded-md bg-[#202938] text-purple-400">
                    Fat: {item.fat}g
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
