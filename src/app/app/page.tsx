import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "Apps | Plenitudo AI",
  description:
    "Apps by Plenitudo — Plena (mindfulness tracking), MileTrack (coming soon), and more.",
};

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="mt-8 mb-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Apps
            </h1>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <p className="text-slate-300">
            Apps by Plenitudo — for mindfulness, wellness, and more.
          </p>
        </div>

        <section className="space-y-8">
          {/* Plena */}
          <div className="rounded-xl p-6 sm:p-8 ring-1 ring-white/10 bg-slate-900/40">
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              Plena
            </h2>
            <p className="text-slate-300 mb-4">
              Mindfulness tracking with real-time biometrics for iPhone and
              Apple Watch. Track heart rate, HRV, respiratory rate, and other
              vital signs during sessions to see how your body responds to
              mindfulness practice.
            </p>
            <div className="flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 ring-1 ring-white/10 text-slate-400 text-sm font-medium"
                aria-label="App Store link coming soon"
              >
                App Store — soon
              </span>
              <Link
                href="/app/plena/beta"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 ring-1 ring-white/10 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium"
              >
                Overview
              </Link>
              <Link
                href="/app/plena/support"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 ring-1 ring-white/10 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium"
              >
                Support
              </Link>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 ring-1 ring-white/10 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* MileTrack */}
          <div className="rounded-xl p-6 sm:p-8 ring-1 ring-white/10 bg-slate-900/40 opacity-90">
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              MileTrack
            </h2>
            <p className="text-slate-300 mb-4">
              Running and distance tracking — coming soon.
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-slate-700/60 text-slate-400 text-sm font-medium">
              Coming soon
            </span>
          </div>
        </section>

        <PlFooter />
      </div>
    </div>
  );
}
