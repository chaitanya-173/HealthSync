import { useEffect, useMemo, useState } from "react";
import { Activity, Check, Pencil, Target } from "lucide-react";
import toast from "react-hot-toast";
import { getGoals, updateGoals } from "../services/userService";
import { useDashboard } from "../context/DashboardContext";

const goalOptions = [
  { value: "lose", label: "Lose Weight", adjustment: -500 },
  { value: "maintain", label: "Maintain Weight", adjustment: 0 },
  { value: "gain", label: "Gain Weight", adjustment: 300 },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const calculateGoals = ({ goal, weight, height, age, gender }) => {
  const base =
    gender === "female"
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5;

  const adjustment =
    goalOptions.find((item) => item.value === goal)?.adjustment || 0;
  const calories = Math.max(Math.round(base * 1.2 + adjustment), 1200);

  return {
    calories,
    carbs: Math.round((calories * 0.5) / 4),
    protein: Math.round((calories * 0.25) / 4),
    fat: Math.round((calories * 0.25) / 9),
  };
};

const macroPercentages = (goals) => {
  const calories = {
    carbs: (goals?.carbs || 0) * 4,
    protein: (goals?.protein || 0) * 4,
    fat: (goals?.fat || 0) * 9,
  };
  const total = Math.max(calories.carbs + calories.protein + calories.fat, 1);
  const carbs = Math.round((calories.carbs / total) * 100);
  let protein = Math.round((calories.protein / total) * 100);
  let fat = 100 - carbs - protein;

  if (fat < 0) {
    protein = Math.max(protein + fat, 0);
    fat = 0;
  }

  return {
    carbs,
    protein,
    fat,
  };
};

export default function DailyGoals() {
  const { fetchGoals } = useDashboard();
  const [goals, setGoals] = useState(null);
  const [mode, setMode] = useState("overview");
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [setup, setSetup] = useState({
    goal: "maintain",
    weight: 70,
    height: 170,
    age: 25,
    gender: "male",
  });
  const [form, setForm] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [distribution, setDistribution] = useState({
    carbs: 50,
    protein: 25,
  });

  const calculated = useMemo(() => calculateGoals(setup), [setup]);
  const percentages = useMemo(() => macroPercentages(goals), [goals]);
  const derivedFatPercent = clamp(
    100 - distribution.carbs - distribution.protein,
    0,
    100,
  );

  const calories = Number(goals?.calories || 0);

  const carbsGrams = Math.round((calories * distribution.carbs) / 100 / 4);
  const proteinGrams = Math.round((calories * distribution.protein) / 100 / 4);
  const fatGrams = Math.round((calories * derivedFatPercent) / 100 / 9);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const res = await getGoals();
        const nextGoals = res.data.data;

        setGoals(nextGoals);
        setForm({
          calories: nextGoals?.calories || 0,
          protein: nextGoals?.protein || 0,
          carbs: nextGoals?.carbs || 0,
          fat: nextGoals?.fat || 0,
        });

        const nextPercentages = macroPercentages(nextGoals);
        setDistribution({
          carbs: nextPercentages.carbs,
          protein: nextPercentages.protein,
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load goals");
      }
    };

    loadGoals();
  }, []);

  const saveGoals = async (payload, message = "Goals updated") => {
    try {
      setBusy(true);
      const res = await updateGoals(payload);
      const nextGoals = res.data.data;

      setGoals(nextGoals);
      setForm({
        calories: nextGoals.calories,
        protein: nextGoals.protein,
        carbs: nextGoals.carbs,
        fat: nextGoals.fat,
      });
      await fetchGoals();
      toast.success(message);
      setMode("overview");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save goals");
    } finally {
      setBusy(false);
    }
  };

  const handleManualSave = (event) => {
    event.preventDefault();
    saveGoals({
      calories: Number(form.calories),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fat: Number(form.fat),
    });
  };

  const handleDistributionSave = () => {
    const calories = Number(goals?.calories || 0);
    const payload = {
      calories,
      carbs: Math.round((calories * distribution.carbs) / 100 / 4),
      protein: Math.round((calories * distribution.protein) / 100 / 4),
      fat: Math.round((calories * derivedFatPercent) / 100 / 9),
    };

    saveGoals(payload, "Macro distribution updated");
  };

  const updateDistribution = (field, value) => {
    const nextValue = clamp(Number(value), 0, 100);

    setDistribution((current) => {
      const otherField = field === "carbs" ? "protein" : "carbs";
      const otherValue = clamp(current[otherField], 0, 100 - nextValue);

      return {
        ...current,
        [field]: nextValue,
        [otherField]: otherValue,
      };
    });
  };

  const steps = [
    {
      title: "What's your goal?",
      content: (
        <div className="grid gap-3">
          {goalOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setSetup((current) => ({ ...current, goal: option.value }))
              }
              className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                setup.goal === option.value
                  ? "border-[var(--primary)] bg-[var(--surface-alt)]"
                  : "border-[var(--border)] hover:bg-[var(--surface-alt)]"
              }`}
            >
              <span className="font-medium">{option.label}</span>
              {setup.goal === option.value && (
                <Check size={17} className="text-[var(--primary)]" />
              )}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "What's your weight?",
      field: "weight",
      suffix: "kg",
    },
    {
      title: "How tall are you?",
      field: "height",
      suffix: "cm",
    },
    {
      title: "How old are you?",
      field: "age",
      suffix: "years",
    },
    {
      title: "What's your gender?",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {["male", "female"].map((gender) => (
            <button
              key={gender}
              type="button"
              onClick={() => setSetup((current) => ({ ...current, gender }))}
              className={`rounded-lg border px-4 py-3 text-left capitalize transition ${
                setup.gender === gender
                  ? "border-[var(--primary)] bg-[var(--surface-alt)]"
                  : "border-[var(--border)] hover:bg-[var(--surface-alt)]"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      ),
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Daily Goals</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Calorie and macro targets for your daily dashboard.
          </p>
        </div>

        {mode === "setup" && (
          <button
            type="button"
            onClick={() => {
              setMode("overview");
              setStep(0);
            }}
            className="flex items-center gap-2 rounded-lg bg-[var(--surface)] px-4 py-2.5 text-sm font-medium"
          >
            <Target size={16} />
            View Goals
          </button>
        )}
      </div>

      {mode === "setup" ? (
        <div className="grid grid-cols-[1fr_340px] gap-6">
          <div className="rounded-lg bg-[var(--surface)] p-6">
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-[var(--surface-alt)]">
              <div
                className="h-full rounded-full bg-[var(--primary)] transition-all"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>

            <h2 className="mb-6 text-2xl font-semibold">{currentStep.title}</h2>

            {currentStep.content || (
              <label className="block max-w-xs">
                <span className="mb-2 block text-sm text-[var(--text-muted)]">
                  {currentStep.suffix}
                </span>

                <input
                  type="number"
                  min="1"
                  value={setup[currentStep.field]}
                  onChange={(event) =>
                    setSetup((current) => ({
                      ...current,
                      [currentStep.field]: Number(event.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-lg outline-none focus:border-[var(--primary)]"
                />
              </label>
            )}

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((value) => value - 1)}
                className="rounded-lg px-4 py-2.5 text-sm text-[var(--text-muted)] transition hover:bg-[var(--surface-alt)] disabled:opacity-30"
              >
                Back
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  if (step < steps.length - 1) {
                    setStep((value) => value + 1);
                    return;
                  }

                  saveGoals(calculated, "Daily goals calculated");
                }}
                className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-40"
              >
                {step === steps.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-[var(--surface)] p-5">
            <div className="mb-4 flex items-center gap-2">
              <Activity size={17} className="text-[var(--primary)]" />
              <h3 className="font-semibold">Estimate</h3>
            </div>

            <p className="text-3xl font-bold">{calculated.calories} kcal</p>
            <div className="mt-5 space-y-3 text-sm">
              <GoalRow label="Protein" value={`${calculated.protein}g`} />
              <GoalRow label="Carbs" value={`${calculated.carbs}g`} />
              <GoalRow label="Fat" value={`${calculated.fat}g`} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_360px] gap-6">
          <div className="rounded-lg bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-semibold">Current Daily Goals</h2>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              These goals are automatically calculated based on your profile.
            </p>

            <div className="mt-8 space-y-5">
              {/* Editable Calories */}
              <div className="rounded-lg border border-[var(--primary)]/30 bg-[var(--surface-alt)] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-[var(--text-muted)]">
                    Daily Calories Goal
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      saveGoals(
                        {
                          calories: Number(goals?.calories || 0),
                          protein: goals?.protein || 0,
                          carbs: goals?.carbs || 0,
                          fat: goals?.fat || 0,
                        },
                        "Calories updated",
                      )
                    }
                    disabled={busy}
                    className="rounded-md bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-40"
                  >
                    Save
                  </button>
                </div>

                <input
                  type="number"
                  min="1200"
                  value={goals?.calories || 0}
                  onChange={(e) =>
                    setGoals((prev) => ({
                      ...prev,
                      calories: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-transparent text-3xl font-bold outline-none"
                />

                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  Protein, carbs and fat are calculated automatically from
                  calories and macro distribution.
                </p>
              </div>

              {/* Auto calculated macros */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-[var(--surface-alt)] p-4">
                  <p className="text-sm text-[var(--text-muted)]">Protein</p>
                  <p className="mt-2 text-2xl font-semibold text-green-400">
                    {goals?.protein || 0}g
                  </p>
                </div>

                <div className="rounded-lg bg-[var(--surface-alt)] p-4">
                  <p className="text-sm text-[var(--text-muted)]">Carbs</p>
                  <p className="mt-2 text-2xl font-semibold text-amber-400">
                    {goals?.carbs || 0}g
                  </p>
                </div>

                <div className="rounded-lg bg-[var(--surface-alt)] p-4">
                  <p className="text-sm text-[var(--text-muted)]">Fat</p>
                  <p className="mt-2 text-2xl font-semibold text-purple-400">
                    {goals?.fat || 0}g
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  setMode("setup");
                  setStep(0);
                }}
                className="rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-medium text-white"
              >
                Use Daily Calorie Goal Calculator
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-[var(--surface)] p-5">
              <h3 className="mb-4 font-semibold">Macro Percentages</h3>
              <div className="space-y-3">
                <GoalRow
                  label="Carbs"
                  value={`${percentages.carbs}%`}
                  color="var(--warning)"
                />
                <GoalRow
                  label="Protein"
                  value={`${percentages.protein}%`}
                  color="var(--primary)"
                />
                <GoalRow
                  label="Fat"
                  value={`${percentages.fat}%`}
                  color="var(--purple)"
                />
              </div>
            </div>

            <div className="rounded-lg bg-[var(--surface)] p-5">
              <h3 className="mb-4 font-semibold">Distribution Editor</h3>

              <PercentInput
                label={`Carbs (${carbsGrams}g)`}
                value={distribution.carbs}
                onChange={(value) => updateDistribution("carbs", value)}
              />

              <PercentInput
                label={`Protein (${proteinGrams}g)`}
                value={distribution.protein}
                onChange={(value) => updateDistribution("protein", value)}
              />

              <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--surface-alt)] px-3 py-2 text-sm">
                <span>Fat ({fatGrams}g)</span>

                <span className="font-semibold">{derivedFatPercent}%</span>
              </div>

              <p className="mt-3 text-xs text-[var(--text-muted)]">
                Total:{" "}
                {distribution.carbs + distribution.protein + derivedFatPercent}%
              </p>

              <button
                type="button"
                onClick={handleDistributionSave}
                disabled={busy}
                className="mt-4 w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40"
              >
                Apply Distribution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GoalRow({ label, value, color }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[var(--surface-alt)] px-3 py-2">
      <span className="text-sm text-[var(--text-muted)]">{label}</span>
      <span className="font-semibold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function PercentInput({ label, value, onChange }) {
  return (
    <label className="mb-3 block">
      <span className="mb-2 block text-sm text-[var(--text-muted)]">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 accent-[var(--primary)]"
        />
        <div className="relative">
          <input
            type="number"
            min="0"
            max="100"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-20 rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 pr-7 text-sm outline-none focus:border-[var(--primary)]"
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">
            %
          </span>
        </div>
      </div>
    </label>
  );
}
