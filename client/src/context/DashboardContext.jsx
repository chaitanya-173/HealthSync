import { createContext, useContext, useState } from "react";
import { dummyLogs, dummySavedLogs } from "../components/dashboard/dashboardData";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logs, setLogs] = useState(dummyLogs);
  const [savedLogs, setSavedLogs] = useState(dummySavedLogs);

  const value = {
    selectedDate,
    setSelectedDate,
    logs,
    setLogs,
    savedLogs,
    setSavedLogs,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
