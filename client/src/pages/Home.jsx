import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardContent from "../components/dashboard/DashboardContent";
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
  },
  createdAt: "2026-04-12T13:03:24.402Z",
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const logs = Array(4).fill(mockLog);

  return (
    <div className="h-[calc(100vh-120px)] min-h-0 flex flex-col gap-5">
      <DashboardHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <DashboardContent logs={logs} />

      <InputBar />
    </div>
  );
}