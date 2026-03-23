import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "Apps | Plenitudo AI",
  description:
    "Apps by Plenitudo — Plena (mindfulness), MileTrack (mileage tracking), FullCapture (AR property scanning), and more.",
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
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://apps.apple.com/app/id6756549507"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Plena on the App Store"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/download-on-app-store.svg" alt="Download on the App Store" height="40" style={{ height: 40 }} />
              </a>
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
          <div className="rounded-xl p-6 sm:p-8 ring-1 ring-white/10 bg-slate-900/40">
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              MileTrack
            </h2>
            <p className="text-slate-300 mb-4">
              Smart mileage tracking for drivers. Automatically log trips, track
              business vs personal miles, and generate IRS-ready reports. Simple,
              accurate, and built for real-world use.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="https://apps.apple.com/app/id6759682972"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download MileTrack on the App Store"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/download-on-app-store.svg" alt="Download on the App Store" height="40" style={{ height: 40 }} />
              </a>
              <Link
                href="/app/miletrack/overview"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 ring-1 ring-white/10 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium"
              >
                Overview
              </Link>
              <Link
                href="/app/miletrack/support"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 ring-1 ring-white/10 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium"
              >
                Support
              </Link>
              <Link
                href="/app/miletrack/privacy-policy"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 ring-1 ring-white/10 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/app/miletrack/terms"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 ring-1 ring-white/10 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors text-sm font-medium"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* FullCapture */}
          <div className="rounded-xl p-6 sm:p-8 ring-1 ring-white/10 bg-slate-900/40">
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              FullCapture
            </h2>
            <p className="text-slate-300 mb-4">
              AR-powered property scanning for real estate professionals. Capture
              spaces in 3D with your iPhone, create interactive flythroughs, and
              share immersive property tours. Built for the future of real estate
              marketing.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-400/30 text-sm font-medium">
                In Development
              </span>
            </div>
          </div>
        </section>

        <PlFooter />
      </div>
    </div>
  );
}
