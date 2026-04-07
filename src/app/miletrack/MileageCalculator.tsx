"use client";

import { useState } from "react";

const RATE = 0.725;

export default function MileageCalculator() {
  const [miles, setMiles] = useState("");

  const numMiles = parseFloat(miles) || 0;
  const deduction = numMiles * RATE;

  return (
    <div className="rounded-2xl p-6 sm:p-8 ring-1 ring-white/10 bg-slate-900/60">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
        Mileage Deduction Calculator
      </h2>
      <p className="text-slate-400 text-sm text-center mb-8">
        2026 IRS standard mileage rate: $0.725/mile
      </p>

      <div className="max-w-md mx-auto">
        <label
          htmlFor="miles-input"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Estimated business miles per year
        </label>
        <input
          id="miles-input"
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="e.g. 10000"
          value={miles}
          onChange={(e) => setMiles(e.target.value)}
          className="w-full rounded-lg bg-slate-800 border border-white/10 px-4 py-3 text-white text-lg placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />

        <div className="mt-6 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 p-6 text-center">
          <p className="text-sm text-slate-400 mb-1">
            Your estimated tax deduction
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-emerald-400">
            ${deduction.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
          {numMiles > 0 && (
            <p className="text-xs text-slate-500 mt-2">
              {numMiles.toLocaleString()} miles &times; $0.725/mile
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
