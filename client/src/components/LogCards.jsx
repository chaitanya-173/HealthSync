import LogCard from "./LogCard";

export default function LogCards({ logs, activeTab }) {
  const savedFoods = [
    "Low Fat Milk",
    "Eggs",
    "Banana",
    "Paratha",
    "Rice",
    "Paneer",
  ];

  return (
    <div
      className="
        h-full
        overflow-y-auto
        no-scrollbar
      "
    >
      {activeTab === "logs" && (
        <div>
          {logs.map((log, index) => (
            <LogCard key={index} log={log} index={index} />
          ))}
        </div>
      )}

      {activeTab === "saved" && (
        <div className="space-y-2">
          {savedFoods.map((food, index) => (
            <div
              key={index}
              className="
                px-4 py-3
                rounded-lg
                bg-[#151515]
                hover:bg-[#1d1d1d]
                transition
                cursor-pointer
              "
            >
              {food}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}