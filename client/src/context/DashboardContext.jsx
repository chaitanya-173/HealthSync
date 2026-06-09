import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { getLogsByDay } from "../services/logService";
import { getSavedEntries } from "../services/savedService";
import { getSummary } from "../services/summaryService";
import { getGoals } from "../services/userService";

const DashboardContext = createContext();

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function DashboardProvider({ children }) {
  const { user, loadingUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logs, setLogs] = useState([]);
  const [savedLogs, setSavedLogs] = useState([]);
  const [summary, setSummary] = useState(null);
  const [goals, setGoals] = useState(null);

  const fetchLogs = useCallback(async (date) => {
    try {
      const formattedDate = formatLocalDate(date);

      const res = await getLogsByDay(formattedDate);

      setLogs(res.data.data || []);
    } catch (error) {
      console.error("LOGS ERROR", error.response?.data || error);
      setLogs([]);
    }
  }, []);

  const fetchSavedLogs = useCallback(async () => {
    try {
      const res = await getSavedEntries();

      setSavedLogs(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch saved logs:", error);
      setSavedLogs([]);
    }
  }, []);

  const fetchSummary = useCallback(async (date) => {
    try {
      const formattedDate = formatLocalDate(date);

      const res = await getSummary(formattedDate);

      setSummary(res.data.data);
    } catch (error) {
      console.error("SUMMARY ERROR", error.response?.data || error);
      setSummary(null);
    }
  }, []);

  const fetchGoals = useCallback(async () => {
    try {
      const res = await getGoals();

      setGoals(res.data.data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      setGoals(null);
    }
  }, []);

  useEffect(() => {
    if (loadingUser) return;

    if (!user) {
      // Dashboard state belongs to the signed-in session.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLogs([]);
      setSavedLogs([]);
      setSummary(null);
      setGoals(null);
      return;
    }

    fetchLogs(selectedDate);
    fetchSummary(selectedDate);
  }, [fetchLogs, fetchSummary, loadingUser, selectedDate, user]);

  useEffect(() => {
    if (loadingUser || !user) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGoals();
    fetchSavedLogs();
  }, [fetchGoals, fetchSavedLogs, loadingUser, user]);

  const value = {
    selectedDate,
    setSelectedDate,
    formatLocalDate,

    logs,
    setLogs,
    fetchLogs,

    savedLogs,
    setSavedLogs,
    fetchSavedLogs,

    summary,
    setSummary,

    goals,
    setGoals,

    fetchSummary,
    fetchGoals,
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
