/* eslint-disable react-refresh/only-export-components */
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
import { getStreak } from "../services/logService";
import { getDailyWater } from "../services/waterService";

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
  const [water, setWater] = useState(null);
  const [streak, setStreak] = useState(0);

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

  const fetchWater = useCallback(async (date) => {
    try {
      const formattedDate = formatLocalDate(date);
      const res = await getDailyWater(formattedDate);

      setWater(res.data.data);
    } catch (error) {
      console.error("WATER ERROR", error.response?.data || error);
      setWater(null);
    }
  }, []);

  const fetchStreak = useCallback(async () => {
    try {
      const res = await getStreak();

      setStreak(res.data.data?.streak || 0);
    } catch (error) {
      console.error("STREAK ERROR", error.response?.data || error);
      setStreak(0);
    }
  }, []);

  useEffect(() => {
    if (loadingUser) return;

    if (!user) {
      setLogs([]);
      setSavedLogs([]);
      setSummary(null);
      setGoals(null);
      setWater(null);
      setStreak(0);
      return;
    }

    fetchLogs(selectedDate);
    fetchSummary(selectedDate);
    fetchWater(selectedDate);
  }, [fetchLogs, fetchSummary, fetchWater, loadingUser, selectedDate, user]);

  useEffect(() => {
    if (loadingUser || !user) return;
    fetchGoals();
    fetchSavedLogs();
    fetchStreak();
  }, [fetchGoals, fetchSavedLogs, fetchStreak, loadingUser, user]);

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

    water,
    setWater,
    fetchWater,

    streak,
    setStreak,
    fetchStreak,

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
