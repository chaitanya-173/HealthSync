import { useState } from "react";
import WeekSelector from "../components/WeekSelector";
import DateBox from "../components/DateBox";
import LogCard from "../components/LogCard";
import InputBar from "../components/InputBar";
import NutritionProgressCard from "../components/NutritionProgressCard";

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
    analysis:
      "This meal provides a balanced mix of proteins and carbs, suitable for a mid-day energy boost.",
  },
  _id: "69db981cc0f7efbdd27ed032",
  createdAt: "2026-04-12T13:03:24.402Z",
  updatedAt: "2026-04-12T13:03:24.402Z",
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-5">
      {/* TOP */}
      <div className="grid grid-cols-2 gap-5">
        <div className="min-w-0">
          <div className="flex gap-3 mb-4">
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
        </div>

        <div className="w-full">
          <NutritionProgressCard />
        </div>
      </div>

      {/* LOGS */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
        <LogCard log={mockLog} />
        <LogCard log={mockLog} />
        <LogCard log={mockLog} />
        <LogCard log={mockLog} />
        <LogCard log={mockLog} />
      </div>

      {/* INPUT */}
      <InputBar />
    </div>
  );
}
