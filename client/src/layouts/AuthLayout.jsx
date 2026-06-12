import React from "react";

export default function AuthLayout({ children, type = "login" }) {
  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)]">

      {/* LEFT SIDE (FORM) */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* RIGHT SIDE (INFO PANEL) */}
      <div className="w-1/2 relative hidden md:flex flex-col justify-center px-16 bg-[var(--surface)] border-l border-[var(--border)]">
        
        {/* Background subtle pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border border-[var(--border)] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border border-[var(--border)] rounded-full"></div>
        </div>

        <div className="relative  max-w-md space-y-6">

          <h1 className="text-4xl font-bold leading-tight">
            {type === "signup"
              ? "Start with HealthSync"
              : "Welcome back"}
          </h1>

          <p className="text-[var(--text-muted)] text-lg">
            {type === "signup"
              ? "Create your account to track nutrition, hydration, goals, and weekly progress."
              : "Continue tracking your meals, macros, hydration, and daily health goals."}
          </p>

          {/* Feature blocks */}
          <div className="space-y-4 mt-6">

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center">
                1
              </div>
              <div>
                <p className="font-medium">Log Meals Quickly</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Add food entries and keep your nutrition history organized.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center">
                2
              </div>
              <div>
                <p className="font-medium">Set Daily Goals</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Keep calories, protein, carbs, fat, and water in sync.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg)] flex items-center justify-center">
                3
              </div>
              <div>
                <p className="font-medium">Review Progress</p>
                <p className="text-sm text-[var(--text-muted)]">
                  See daily streaks and weekly insights from your dashboard.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
