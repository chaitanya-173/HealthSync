import { useState } from "react";
import WeekSelector from "../components/WeekSelector";
import StatsCards from "../components/StatsCards";
import DateBox from "../components/DateBox";
import LogCard from "../components/LogCard";
import InputBar from "../components/InputBar";

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
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
      {/* 🧠 Top Section (Fixed) */}
      <div className="relative flex items-center justify-center">
        <div className="absolute left-0">
          <DateBox selectedDate={selectedDate} />
        </div>

        <WeekSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {/* 🔥 Stats (Fixed) */}
      <StatsCards
        data={{
          calories: {
            consumed: 950,
            burned: 0,
            remaining: 1150,
          },
          macros: {
            carbs: 112,
            protein: 41,
            fat: 35.5,
          },
        }}
      />

      {/* 🔥 LOGS (Scrollable Area ✅) */}
      <div className="flex-1 no-scrollbar overflow-y-auto pr-2 space-y-4">
        <LogCard log={mockLog} />
        <LogCard log={mockLog} />
        <LogCard log={mockLog} />
        <LogCard log={mockLog} />
        <LogCard log={mockLog} />
      </div>

      {/* ⌨️ Input Bar */}
      <InputBar />
    </div>
  );
}