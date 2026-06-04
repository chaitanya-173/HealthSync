import { useState } from "react";
import { NotebookPen, Bookmark } from "lucide-react";

import WeekSelector from "../components/WeekSelector";
import DateBox from "../components/DateBox";
import InputBar from "../components/InputBar";
import NutritionProgressCard from "../components/NutritionProgressCard";
import LogCards from "../components/LogCards";

const mockLog = {
  userId: "69d5e15060e540429d62ef8e",
  text: "3 paranthe with 1 katori paneer bhurji low fat aur 1 glass doodh",
  result: {
    is_valid: true,
    type: "food",
    items: [
      {
        name: "Paratha",
        quantity: "3",
        calories: 600,
        protein: 18,
        carbs: 90,
        fat: 18,
      },
      {
        name: "Paneer Bhurji (Low Fat)",
        quantity: "1 bowl",
        calories: 250,
        protein: 15,
        carbs: 10,
        fat: 15,
      },
      {
        name: "Milk (Low Fat)",
        quantity: "1 glass",
        calories: 100,
        protein: 8,
        carbs: 12,
        fat: 2.5,
      },
    ],
    total: {
      calories: 950,
      protein: 41,
      carbs: 112,
      fat: 35.5,
    },
  },
  createdAt: "2026-04-12T13:03:24.402Z",
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("logs");

  const logs = Array(12).fill(mockLog);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-5 min-h-0">
      {/* TOP SECTION */}
      <div className="grid grid-cols-[1fr_420px] gap-5">
        {/* LEFT */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <DateBox selectedDate={selectedDate} />

            <button
              className="
                px-5 py-3
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]/70
                backdrop-blur-xl
              "
            >
              Future
            </button>
          </div>

          <WeekSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          {/* TABS MOVED HERE */}
          <div className="flex items-center gap-8 pt-1">
            <button
              onClick={() => setActiveTab("logs")}
              className={`
                flex items-center gap-2
                text-sm
                pb-2
                transition
                ${
                  activeTab === "logs"
                    ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                    : "text-[var(--text-muted)] border-b-2 border-transparent hover:text-white"
                }
              `}
            >
              <NotebookPen size={15} />
              Logged
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`
                flex items-center gap-2
                text-sm
                pb-2
                transition
                ${
                  activeTab === "saved"
                    ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                    : "text-[var(--text-muted)] border-b-2 border-transparent hover:text-white"
                }
              `}
            >
              <Bookmark size={15} />
              Saved
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <NutritionProgressCard />
      </div>

      {/* LOGS */}
      <div className="flex-1 min-h-0">
        <LogCards logs={logs} activeTab={activeTab} />
      </div>

      {/* INPUT */}
      <InputBar />
    </div>
  );
}