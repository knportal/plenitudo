import AIDailyList from "@/components/AIDaily/AIDailyList";
import PlHeader from "@/components/plenitudo/layout/PlHeader";
import PlFooter from "@/components/plenitudo/layout/PlFooter";
import PlBackgroundFX from "@/components/plenitudo/layout/PlBackgroundFX";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <PlBackgroundFX />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <PlHeader />

        {/* Page Header */}
        <div className="mt-16 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              AI Daily Breakthroughs
            </h1>
            <a
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </a>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl">
            Cross-verified AI news from 18+ trusted sources. Updated daily at 11
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
