import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "Plena Beta | Mindfulness Tracking with Real-Time Biometrics",
  description:
    "Plena is a mindfulness tracking application for iPhone and Apple Watch that monitors your biometric data in real time during mindfulness sessions.",
};

export default function PlenaBetaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Plena
              </h1>
              <p className="text-lg sm:text-xl text-slate-300">
                Mindfulness Tracking with Real-Time Biometrics
              </p>
            </div>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="rounded-2xl p-6 sm:p-8 ring-1 ring-white/10 bg-gradient-to-br from-slate-900/60 to-slate-800/40">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Plena is a mindfulness tracking application for iPhone and Apple
              Watch that monitors your biometric data in real time during
              mindfulness sessions. Track heart rate, HRV, respiratory rate, and
              other vital signs to understand how your body responds to
              mindfulness practice.
            </p>
          </div>
        </section>

        {/* The Triangle Section */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            🔺 The Triangle: Mind, Breath, Body
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <p className="text-slate-300 mb-4">
              The triangle represents three core rhythms:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-semibold mt-1">•</span>
                <span>
                  <strong>Heart Rate</strong> reflects moment-to-moment activity
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-semibold mt-1">•</span>
                <span>
                  <strong>HRV</strong> shows adaptability and stress balance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-semibold mt-1">•</span>
                <span>
                  <strong>Breath</strong> regulates the entire system
                </span>
              </li>
            </ul>
            <p className="mt-4 text-slate-300">
              When these work in harmony, they create balance—stable, coherent,
              and calm. That's what Plena measures in real time.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-6">
            Key Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Feature Card 1 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Real-Time Biometric Tracking
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Tracks Heart Rate (BPM), HRV (SDNN), Respiratory Rate, Body
                Temperature, and VO₂ Max. All data collected in real time using
                Apple's HealthKit framework.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Stress Zone Classification
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Automatically classifies readings into color-coded zones:{" "}
                <span className="text-blue-400">Calm (Blue)</span>,{" "}
                <span className="text-green-400">Optimal (Green)</span>, and{" "}
                <span className="text-orange-400">
                  Elevated Stress (Orange)
                </span>
                . Provides instant visual feedback.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Comprehensive Dashboard
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                View progress with session statistics, trend analysis, frequency
                charts, duration trends, and HRV insights. Supports Day, Week,
                Month, and Year views.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Interactive Data Visualization
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Explore historical session data with interactive graphs,
                time-based views, sensor-specific charts, range indicators, and
                trend analysis.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Apple Watch Integration
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Start sessions directly from your Watch with independent
                operation. See real-time sensor readings, stress zone feedback,
                and easy controls with a 3-2-1 countdown.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Session Management
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Review session summaries, log your state of mind, and
                automatically save all sessions. Import existing HealthKit data.
              </p>
            </div>

            {/* Feature Card 7 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Readiness Score
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Get a holistic view of recovery with a daily score (0-100) based
                on Resting Heart Rate, HRV Balance, Body Temperature, Recovery
                Index, and Sleep metrics. View breakdowns and compare to
                yesterday.
              </p>
            </div>

            {/* Feature Card 8 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Smart Insights
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                Analyzes data to provide weekly HRV trends, improvement
                tracking, and pattern recognition to discover optimal times and
                durations.
              </p>
            </div>
          </div>
        </section>

        {/* Why Plena */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Why Plena?
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <p className="text-slate-300 mb-4">
              Move beyond subjective feelings and gain objective insights. Plena
              combines mindfulness with biometric tracking to help you:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Understand how mindfulness affects your body</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Track progress with real data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Identify patterns and optimal practice times</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Build consistent mindfulness habits</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>
                  See the interconnected balance of mind, body, and breath
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Privacy & Security
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <p className="text-slate-300">
              Your health data is stored locally and never shared with third
              parties. Optional CloudKit sync keeps data synchronized between
              devices. Plena uses Apple's secure HealthKit framework. You
              control all permissions.
            </p>
            <Link
              href="/privacy-policy"
              className="mt-4 inline-block text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
            >
              Read our full Privacy Policy →
            </Link>
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Requirements
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>iOS 17.0 or later</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>
                  Apple Watch Series 4 or later (optional but recommended for
                  full sensor support)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>HealthKit permissions (required for tracking)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>
                  Physical device required (HealthKit doesn't work in
                  simulators)
                </span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-slate-400 mb-2">
                <strong>Apple Watch Compatibility:</strong>
              </p>
              <p className="text-sm text-slate-400">
                Heart Rate (all models Series 1+), HRV/SDNN (Series 4+),
                Respiratory Rate (Series 6+), Temperature (Series 8/Ultra+), and
                VO₂ Max (Series 3+, accuracy varies).
              </p>
            </div>
          </div>
        </section>

        {/* Beta Testing Section */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            What We're Testing
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-emerald-500/20 bg-emerald-500/5">
            <p className="text-slate-300 mb-4">
              During this beta, we're interested in feedback on:
            </p>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Sensor accuracy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Stress zone classification</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Dashboard clarity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Apple Watch performance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Session syncing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Overall user experience</span>
              </li>
            </ul>
            <p className="mt-4 text-slate-300">
              Your feedback helps us refine Plena before launch. Thank you!
            </p>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-12">
          <div className="rounded-xl p-6 ring-1 ring-amber-500/20 bg-amber-500/5">
            <h3 className="text-lg font-semibold text-amber-300 mb-3">
              Important Medical Disclaimer
            </h3>
            <p className="text-sm text-slate-300">
              Plena is not a medical device and does not provide medical advice,
              diagnosis, or treatment. Information is for wellness and
              self-improvement purposes only. Do not use Plena data to diagnose,
              treat, or prevent any disease. Consult healthcare professionals
              for medical advice. Sensor readings are estimates, not clinical
              measurements.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12 text-center">
          <div className="rounded-2xl p-8 ring-1 ring-white/10 bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
              Ready to Transform Your Mindfulness Practice?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join the Plena beta and discover the data behind your mindfulness
              sessions. Track your progress, understand your body's response,
              and build a more consistent practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://testflight.apple.com/join/YOUR_CODE"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:from-emerald-400 hover:to-blue-400 transition-all focus:outline-none focus-visible:ring ring-emerald-400"
              >
                Join TestFlight Beta
              </a>
              <Link
                href="/privacy-policy"
                className="px-6 py-3 rounded-lg bg-slate-800/60 ring-1 ring-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring ring-emerald-400"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </section>

        <PlFooter />
      </div>
    </div>
  );
}
