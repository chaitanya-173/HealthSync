import { useCallback, useEffect, useState } from "react";
import { Droplet, Minus, Plus, Save } from "lucide-react";
import toast from "react-hot-toast";
import {
  getDailyWater,
  getWaterSettings,
  updateDailyWater,
  updateWaterSettings,
} from "../services/waterService";
import { useDashboard } from "../context/DashboardContext";

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function WaterTracker() {
  const { fetchWater, selectedDate } = useDashboard();
  const [date] = useState(formatLocalDate(new Date()));
  const [water, setWater] = useState(null);
  const [settings, setSettings] = useState({
    dailyLiters: 2.5,
    dailyCups: 10,
  });
  const [busy, setBusy] = useState(false);

  const loadWater = useCallback(async () => {
    try {
      const [settingsRes, waterRes] = await Promise.all([
        getWaterSettings(),
        getDailyWater(date),
      ]);

      const cups = settingsRes.data.data.dailyCups;

      setSettings({
        dailyCups: cups,
        dailyLiters: (cups * 0.25).toFixed(1),
      });
      setWater(waterRes.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not load water tracker",
      );
    }
  }, [date]);

  useEffect(() => {
    loadWater();
  }, [loadWater]);

  const changeWater = async (delta) => {
    try {
      setBusy(true);
      const res = await updateDailyWater({ date, delta });

      setWater(res.data.data);
      await fetchWater(selectedDate);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update water");
    } finally {
      setBusy(false);
    }
  };

  const saveSettings = async (event) => {
    event.preventDefault();

    try {
      setBusy(true);
      await updateWaterSettings({
        dailyCups: Number(settings.dailyCups),
        dailyLiters: Number(settings.dailyCups) * 0.25,
      });
      await loadWater();
      await fetchWater(selectedDate);
      toast.success("Water settings saved");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save settings");
    } finally {
      setBusy(false);
    }
  };

  const cupsConsumed = water?.cupsConsumed || 0;
  const cupsGoal = water?.cupsGoal || settings.dailyCups || 10;
  const litersConsumed = water?.litersConsumed || 0;
  const dailyLitersGoal = water?.dailyLitersGoal || settings.dailyLiters || 2.5;
  const cupsRemaining =
    water?.cupsRemaining ?? Math.max(cupsGoal - cupsConsumed, 0);
  const progress = Math.min((cupsConsumed / Math.max(cupsGoal, 1)) * 100, 100);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Water Tracker</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Track cups, liters, and your daily hydration goal.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-6">
        <div className="rounded-lg bg-[var(--surface)] p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Droplet size={22} />
            </span>

            <div>
              <h2 className="text-xl font-semibold">Today</h2>
              <p className="text-sm text-[var(--text-muted)]">
                {cupsConsumed > 0
                  ? `${cupsRemaining} cups remaining`
                  : "No water logged today."}
              </p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-4">
            <Metric label="Cups" value={`${cupsConsumed} / ${cupsGoal}`} />
            <Metric
              label="Liters"
              value={`${litersConsumed}L / ${dailyLitersGoal}L`}
            />
            <Metric label="Progress" value={`${Math.round(progress)}%`} />
          </div>

          <div className="mb-8 h-3 overflow-hidden rounded-full bg-[var(--surface-alt)]">
            <div
              className="h-full rounded-full bg-sky-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={busy || cupsConsumed <= 0}
              onClick={() => changeWater(-1)}
              className="flex items-center gap-2 rounded-lg bg-[var(--surface-alt)] px-4 py-3 text-sm font-medium transition hover:text-sky-400 disabled:opacity-40"
            >
              <Minus size={17} />
              Remove Cup
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => changeWater(1)}
              className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white disabled:opacity-40"
            >
              <Plus size={17} />
              Add Cup
            </button>
          </div>
        </div>

        <form
          onSubmit={saveSettings}
          className="rounded-lg bg-[var(--surface)] p-5"
        >
          <h2 className="mb-5 text-xl font-semibold">Water Settings</h2>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm text-[var(--text-muted)]">
              Daily cups goal
            </span>

            <input
              type="number"
              min="1"
              value={settings.dailyCups}
              onChange={(event) => {
                const cups = Number(event.target.value);

                setSettings({
                  dailyCups: cups,
                  dailyLiters: (cups * 0.25).toFixed(1),
                });
              }}
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--primary)]"
            />
          </label>

          <div className="mb-5 rounded-lg bg-[var(--surface-alt)] p-4">
            <p className="text-sm text-[var(--text-muted)]">
              Equivalent Water Goal
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {settings.dailyLiters}L
            </p>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white disabled:opacity-40"
          >
            <Save size={17} />
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-[var(--surface-alt)] p-4">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
