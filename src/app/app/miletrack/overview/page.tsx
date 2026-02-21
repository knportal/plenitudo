import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "MileTrack Overview | Automatic Mileage Tracking for iOS",
  description:
    "MileTrack — automatic mileage tracking for iPhone. Track business miles effortlessly with intelligent trip detection, categories, reports, and privacy-first design.",
};

export default function MileTrackOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                MileTrack
              </h1>
              <p className="text-lg sm:text-xl text-slate-300">
                Automatic Mileage Tracking for iOS
              </p>
            </div>
            <Link
              href="/app"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to Apps
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="rounded-2xl p-6 sm:p-8 ring-1 ring-white/10 bg-gradient-to-br from-slate-900/60 to-slate-800/40">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Track your business miles effortlessly with MileTrack, the
              intelligent mileage tracker that works automatically in the
              background.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-6">
            Features
          </h2>
          <div className="space-y-6">
            {/* Automatic Trip Detection */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                🚗 Automatic Trip Detection
              </h3>
              <p className="text-slate-300 mb-4">
                MileTrack uses your iPhone&apos;s sensors to automatically detect
                when you&apos;re driving. No need to manually start or stop
                tracking—just drive and let the app do the work.
              </p>
              <p className="text-slate-400 text-sm font-medium mb-2">
                How it works:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                <li>Enable Auto Mode in settings</li>
                <li>Grant location and motion permissions</li>
                <li>Drive as usual—trips appear in your Inbox</li>
                <li>Review and categorize detected trips</li>
              </ol>
            </div>

            {/* Organized Trip Management */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                📊 Organized Trip Management
              </h3>
              <p className="text-slate-300 mb-3">
                Keep all your mileage data organized:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Categories:</strong> Business, Personal, Medical,
                    Charity, Commute, etc.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Clients &amp; Organizations:</strong> Track trips by
                    client for easy billing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Project Codes:</strong> Assign project or job codes
                    to trips
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Notes:</strong> Add custom notes to any trip
                  </span>
                </li>
              </ul>
            </div>

            {/* Smart Inbox */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                📥 Smart Inbox
              </h3>
              <p className="text-slate-300 mb-3">
                Auto-detected trips wait in your Inbox for review:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm mb-3">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Verify trip accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Add category (required)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Add client, project, or notes (optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Confirm or dismiss</span>
                </li>
              </ul>
              <p className="text-slate-400 text-sm">
                Trips don&apos;t count toward your mileage until confirmed.
              </p>
            </div>

            {/* Manual Trip Entry */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                📱 Manual Trip Entry
              </h3>
              <p className="text-slate-300 mb-3">
                Don&apos;t have Auto Mode enabled? No problem:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Manually add trips anytime</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    Enter start/end locations with smart address autocomplete
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Automatic distance calculation between addresses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Add all the same details as auto-detected trips</span>
                </li>
              </ul>
            </div>

            {/* Rules Engine */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                🎯 Powerful Rules Engine
              </h3>
              <p className="text-slate-300 mb-3">
                Create rules to automatically categorize trips:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Location-based:</strong> &quot;Trips starting from
                    Home → Personal&quot;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Time-based:</strong> &quot;Weekday trips →
                    Business&quot;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Client-based:</strong> &quot;Trips with Acme Corp →
                    Business + Acme Corp client&quot;
                  </span>
                </li>
              </ul>
              <p className="mt-3 text-slate-400 text-sm">
                Save time by letting rules handle common trip patterns.
              </p>
            </div>

            {/* Detailed Reports */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                📈 Detailed Reports
              </h3>
              <p className="text-slate-300 mb-3">
                Get insights into your mileage:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Date Ranges:</strong> Current month, specific
                    months/years, or custom ranges
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Filters:</strong> Filter by category or client
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Summaries:</strong> Total miles, estimated tax
                    value, trip counts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Breakdowns:</strong> See mileage by client (Pro
                    only)
                  </span>
                </li>
              </ul>
            </div>

            {/* Export */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                📤 Export Your Data
              </h3>
              <p className="text-slate-300 mb-3">
                Export trips in multiple formats:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm mb-3">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>CSV:</strong> Compatible with Excel, Google Sheets,
                    tax software (Free)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>PDF:</strong> Professional summary reports with
                    breakdowns (Pro)
                  </span>
                </li>
              </ul>
              <p className="text-slate-400 text-sm">
                No account required—exports are generated locally and shared via
                iOS share sheet.
              </p>
            </div>

            {/* Privacy-First */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                🔒 Privacy-First Design
              </h3>
              <p className="text-slate-300 mb-3">
                Your data stays on your device:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>All trip data stored locally</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>No cloud servers or accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>No tracking or analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Full control over your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Export and delete anytime</span>
                </li>
              </ul>
            </div>

            {/* Beautiful Design */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                🎨 Beautiful Design
              </h3>
              <p className="text-slate-300 mb-3">
                Built with iOS design principles:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Native iOS interface</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Liquid Glass design system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Dark mode support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    Accessibility features (VoiceOver, Dynamic Type)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Smooth animations and intuitive gestures</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-6">
            Pricing
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">
                Free Tier
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Get started with full trip tracking:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✅</span>
                  <span>Unlimited automatic trip detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✅</span>
                  <span>Unlimited manual trip entry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✅</span>
                  <span>All categories, clients, rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✅</span>
                  <span>CSV exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✅</span>
                  <span>Basic reports</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl p-6 ring-1 ring-emerald-500/20 bg-emerald-500/5">
              <h3 className="text-lg font-semibold text-emerald-300 mb-3">
                Pro Subscription
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Unlock advanced features:
              </p>
              <ul className="space-y-2 text-slate-300 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✨</span>
                  <span>PDF summary exports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✨</span>
                  <span>Advanced client breakdown reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✨</span>
                  <span>Custom date range reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✨</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✨</span>
                  <span>Future Pro features</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-white/10 space-y-1 text-sm">
                <p className="text-slate-200 font-medium">
                  $5.99/month — Monthly plan
                </p>
                <p className="text-slate-200 font-medium">
                  $39.99/year — Annual plan
                </p>
                <p className="text-slate-400 text-xs mt-2">
                  Start with free tier, upgrade anytime. Cancel anytime through
                  App Store.
                </p>
              </div>
            </div>
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
                <span>iPhone (not available on iPad)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>
                  For Auto Mode: Location permission (&quot;Always&quot;
                  recommended), Motion &amp; Fitness permission, Background App
                  Refresh enabled
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Manual trip entry works without permissions.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Use Cases
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">
                  Business Owners &amp; Freelancers
                </h3>
                <p className="text-sm text-slate-300">
                  Track client visits, business errands, and work-related travel.
                  Generate reports for tax deductions or client billing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">
                  Sales &amp; Real Estate Professionals
                </h3>
                <p className="text-sm text-slate-300">
                  Automatically log every client meeting, showing, or sales call.
                  Export mileage for expense reimbursement.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">
                  Rideshare &amp; Delivery Drivers
                </h3>
                <p className="text-sm text-slate-300">
                  Track miles driven for tax purposes. Separate business miles
                  from personal driving.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">
                  Healthcare Professionals
                </h3>
                <p className="text-sm text-slate-300">
                  Log medical trips between facilities, home visits, or patient
                  transport.
                </p>
              </div>
              <div className="sm:col-span-2">
                <h3 className="font-semibold text-slate-200 mb-2">
                  Charitable Work
                </h3>
                <p className="text-sm text-slate-300">
                  Track miles driven for nonprofit organizations or volunteer
                  work for tax deductions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why MileTrack */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Why MileTrack?
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">🎯</span>
                <span>
                  <strong>Accurate &amp; Reliable:</strong> Uses iPhone&apos;s
                  GPS and motion sensors for precise trip detection. Smart
                  algorithms reduce false positives.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">⚡</span>
                <span>
                  <strong>Effortless:</strong> Set it and forget it. Auto Mode
                  works in the background without draining your battery.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">🛡️</span>
                <span>
                  <strong>Privacy-Focused:</strong> No accounts, no servers, no
                  tracking. Your data never leaves your device unless you export
                  it.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">📱</span>
                <span>
                  <strong>iOS-Native:</strong> Built specifically for iPhone
                  with Apple&apos;s latest frameworks and design guidelines.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">💪</span>
                <span>
                  <strong>Full-Featured:</strong> From auto-detection to rules to
                  reports, MileTrack has everything you need for mileage
                  tracking.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">🆓</span>
                <span>
                  <strong>Try Risk-Free:</strong> Start with the full-featured
                  free tier. No credit card required. Upgrade to Pro only if you
                  need advanced reports.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA - Download */}
        <section className="mb-12 text-center">
          <div className="rounded-2xl p-8 ring-1 ring-white/10 bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
              Download MileTrack
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Available now on the App Store.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://apps.apple.com/app/miletrack"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:from-emerald-400 hover:to-blue-400 transition-all focus:outline-none focus-visible:ring ring-emerald-400"
              >
                Download on the App Store →
              </a>
              <Link
                href="/app/miletrack/support"
                className="px-6 py-3 rounded-lg bg-slate-800/60 ring-1 ring-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring ring-emerald-400"
              >
                Support
              </Link>
            </div>
          </div>
        </section>

        {/* Support & Resources */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Support &amp; Resources
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <ul className="space-y-2 text-slate-300">
              <li>
                <strong className="text-slate-200">Support:</strong>{" "}
                <Link
                  href="/app/miletrack/support"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  plenitudo.ai/app/miletrack/support
                </Link>
              </li>
              <li>
                <strong className="text-slate-200">Privacy Policy:</strong>{" "}
                <Link
                  href="/app/miletrack/privacy-policy"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  plenitudo.ai/app/miletrack/privacy-policy
                </Link>
              </li>
              <li>
                <strong className="text-slate-200">Terms of Service:</strong>{" "}
                <Link
                  href="/app/miletrack/terms"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  plenitudo.ai/app/miletrack/terms
                </Link>
              </li>
              <li>
                <strong className="text-slate-200">Contact:</strong>{" "}
                <a
                  href="mailto:support@plenitudo.ai"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  support@plenitudo.ai
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* About Plenitudo AI */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            About Plenitudo AI
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <p className="text-slate-300 mb-4">
              Plenitudo AI builds intelligent productivity tools for iOS. We
              believe in:
            </p>
            <ul className="space-y-2 text-slate-300 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Privacy by design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Quality over quantity</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>User-centric development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Sustainable, fair pricing</span>
              </li>
            </ul>
            <p className="text-slate-300">
              MileTrack is our commitment to helping professionals track
              mileage effortlessly while keeping their data private and secure.
            </p>
          </div>
        </section>

        {/* Tagline & Copyright */}
        <section className="mb-12 text-center">
          <p className="text-lg font-medium text-slate-200 mb-2">
            MileTrack — Drive. Track. Done.
          </p>
          <p className="text-sm text-slate-400">
            © 2026 Plenitudo AI. All rights reserved.
          </p>
        </section>

        <PlFooter />
      </div>
    </div>
  );
}
