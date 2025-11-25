import AIDailyList from "@/components/AIDaily/AIDailyList";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-6">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              AI Daily Breakthroughs
            </h1>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
            Cross-verified AI news from 43 trusted sources. Updated daily at 11
            AM ET.
          </p>
        </div>

        {/* AI Daily List */}
        <AIDailyList />

        <PlFooter />
      </div>
    </div>
  );
}
