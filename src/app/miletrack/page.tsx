import MileageCalculator from "./MileageCalculator";

const APP_STORE_URL = "https://apps.apple.com/app/id6759682972";

const features = [
  {
    title: "Automatic Trip Detection",
    description:
      "MileTrack runs in the background using your iPhone's sensors. Just drive — trips appear in your inbox for review.",
    icon: "📍",
  },
  {
    title: "IRS-Ready Reports",
    description:
      "Export CSV or PDF reports with dates, distances, categories, and the 2026 standard mileage rate applied. Hand them straight to your CPA.",
    icon: "📄",
  },
  {
    title: "Manual Trip Log",
    description:
      "Forgot to track? Add trips manually with smart address autocomplete and automatic distance calculation.",
    icon: "✏️",
  },
  {
    title: "Smart Categorization",
    description:
      "Business, medical, charity, personal — categorize trips and set up rules to auto-classify future drives.",
    icon: "🏷️",
  },
  {
    title: "Privacy-First",
    description:
      "All data stays on your device. No accounts, no cloud servers, no tracking. Export or delete anytime.",
    icon: "🔒",
  },
  {
    title: "Free to Start",
    description:
      "Unlimited trip tracking and CSV exports are free. Upgrade to Pro for PDF reports and advanced breakdowns.",
    icon: "🆓",
  },
];

export default function MileTrackLandingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      {/* Hero */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-red-500/15 ring-1 ring-red-500/30 text-red-400 text-sm font-medium">
          Tax deadline: April 15, 2026
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Stop losing
          <br />
          <span className="text-emerald-400">mileage deductions</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Every untracked business mile costs you{" "}
          <strong className="text-white">$0.725</strong> in tax deductions.
          MileTrack records them automatically on your iPhone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-lg transition-colors"
          >
            Download Free
          </a>
          <a
            href="#calculator"
            className="text-slate-400 hover:text-white transition-colors text-sm underline underline-offset-4"
          >
            See what you could save &darr;
          </a>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="pb-16 sm:pb-24">
        <MileageCalculator />
      </section>

      {/* Features */}
      <section className="pb-16 sm:pb-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
          Everything you need for tax-ready mileage
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-16 sm:pb-24 text-center">
        <div className="rounded-2xl p-8 sm:p-12 ring-1 ring-white/10 bg-gradient-to-br from-emerald-500/10 to-slate-900/60">
          <p className="text-red-400 font-medium mb-2">
            April 15 is coming fast
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Start tracking today — it&apos;s free
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            Every mile you drive from now until April 15 is worth $0.725 off
            your tax bill. Don&apos;t leave money on the road.
          </p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download MileTrack on the App Store"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/download-on-app-store.svg"
              alt="Download on the App Store"
              height="54"
              className="mx-auto"
              style={{ height: 54 }}
            />
          </a>
        </div>
      </section>
    </div>
  );
}
