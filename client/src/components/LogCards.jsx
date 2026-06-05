import { useState } from "react";
import { NotebookPen, Bookmark } from "lucide-react";
import LogCard from "./LogCard";

export default function LogCards({ logs }) {
  const [activeTab, setActiveTab] = useState("logs");

  const savedFoods = [
    "Low Fat Milk",
    "Eggs",
    "Banana",
    "Paratha",
    "Rice",
    "Paneer",
  ];

  return (
    <div className="bg-[var(--surface)] rounded-lg h-full overflow-y-auto no-scrollbar px-5 pb-5">
      {/* Tabs */}
      <div className="pt-5 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                activeTab === "logs"
                  ? "bg-[var(--surface-alt)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }
            `}
          >
            <NotebookPen size={15} />
            Logged
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                activeTab === "saved"
                  ? "bg-[var(--surface-alt)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }
            `}
          >
            <Bookmark size={15} />
            Saved
          </button>
        </div>
      </div>

      {/* Logged Meals */}
      {activeTab === "logs" && (
        <div className="space-y-3">
          {logs.map((log, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden bg-[var(--surface)]"
            >
              <LogCard log={log} index={index} />
            </div>
          ))}
        </div>
      )}

      {/* Saved Meals */}
      {activeTab === "saved" && (
        <div className="space-y-3">
          {savedFoods.map((food, index) => (
            <div
              key={index}
              className="px-4 py-3 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-all cursor-pointer"
            >
              {food}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
