import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "MileTrack Support | Plenitudo AI",
  description:
    "Get help with MileTrack. Find answers to common questions, FAQs, troubleshooting, and contact support.",
};

export default function MileTrackSupportPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                MileTrack Support
              </h1>
              <p className="text-lg sm:text-xl text-slate-300">
                Find answers to common questions and get help using the app
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

        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Quick Links
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/app/miletrack/privacy-policy"
              className="rounded-xl p-4 ring-1 ring-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-colors focus:outline-none focus-visible:ring ring-emerald-400"
            >
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Privacy Policy
              </h3>
              <p className="text-sm text-slate-300">
                How we handle your data
              </p>
            </Link>
            <Link
              href="/app/miletrack/terms"
              className="rounded-xl p-4 ring-1 ring-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-colors focus:outline-none focus-visible:ring ring-emerald-400"
            >
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Terms of Service
              </h3>
              <p className="text-sm text-slate-300">
                Terms and conditions for MileTrack
              </p>
            </Link>
            <Link
              href="/app/miletrack/overview"
              className="rounded-xl p-4 ring-1 ring-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-colors focus:outline-none focus-visible:ring ring-emerald-400"
            >
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                App Overview
              </h3>
              <p className="text-sm text-slate-300">
                Learn about MileTrack and its features
              </p>
            </Link>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-6">
            Frequently Asked Questions
          </h2>

          {/* Getting Started */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Getting Started
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How do I start tracking trips?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: There are two ways:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong>Auto Mode:</strong> Enable Auto Mode in Settings &gt; Auto Mode &amp; Tracking to automatically detect drives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong>Manual Entry:</strong> Tap &quot;Add Trip&quot; on the Home screen to manually enter a trip</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What permissions does MileTrack need?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: For Auto Mode, you&apos;ll need to grant:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Location permissions (&quot;Always&quot; recommended for background tracking)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Motion &amp; Fitness permissions (for drive detection)</span>
                  </li>
                </ul>
                <p className="text-slate-300 mt-2">
                  Manual trip entry works without any permissions.
                </p>
              </div>
            </div>
          </div>

          {/* Auto Mode */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Auto Mode
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Why isn&apos;t Auto Mode detecting my trips?
                </h4>
                <p className="text-slate-300 mb-2">A: Check the following:</p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Auto Mode is enabled (Settings &gt; Auto Mode &amp; Tracking)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Location is set to &quot;Always&quot; in iOS Settings &gt; MileTrack</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Motion &amp; Fitness is enabled in iOS Settings &gt; Privacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Your device has good GPS signal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>You&apos;re driving above 5 mph for at least 2 minutes</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Auto Mode detected a non-trip. What do I do?
                </h4>
                <p className="text-slate-300">
                  A: In the Inbox, tap &quot;Not a trip&quot; to ignore false detections. These won&apos;t count toward your mileage.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can Auto Mode work in the background?
                </h4>
                <p className="text-slate-300">
                  A: Yes, if you grant &quot;Always&quot; location permission. MileTrack uses iOS background location updates to detect drives even when the app is closed.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Does Auto Mode drain my battery?
                </h4>
                <p className="text-slate-300">
                  A: MileTrack is optimized for battery efficiency. It uses motion activity to trigger location tracking only when you&apos;re likely driving. Battery impact is similar to other navigation apps.
                </p>
              </div>
            </div>
          </div>

          {/* Trips & Inbox */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Trips &amp; Inbox
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What is the Inbox?
                </h4>
                <p className="text-slate-300">
                  A: The Inbox shows auto-detected trips that need your review. You must categorize and confirm trips before they count toward your mileage.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Why do I need to confirm trips?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: Confirmation ensures you only count actual business/tax-deductible trips. It gives you a chance to:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Verify the trip is correct</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Add a category</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Add client/project information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Correct any errors</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can I edit a trip after confirming it?
                </h4>
                <p className="text-slate-300">
                  A: Yes! Tap any confirmed trip in Inbox &gt; Recent Confirmed or Reports &gt; Trips to edit details.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How do I merge multiple short trips into one?
                </h4>
                <p className="text-slate-300 mb-2">A: In Inbox:</p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Tap &quot;Select&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Select the trips to merge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Tap &quot;Merge&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>The merged trip will appear in your Inbox to categorize</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Categories, Clients & Rules */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Categories, Clients &amp; Rules
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What are Categories?
                </h4>
                <p className="text-slate-300">
                  A: Categories help you organize trips by purpose (Business, Personal, Medical, Charity, etc.). Categories are required to confirm trips.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How do I add custom categories?
                </h4>
                <p className="text-slate-300">
                  A: Settings &gt; Categories &gt; &quot;+&quot; button
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What are Clients &amp; Organizations?
                </h4>
                <p className="text-slate-300">
                  A: Optional fields to track which client/organization a trip was for. Useful for billing or expense reports.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What are Rules?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: Rules automatically categorize trips based on location, time, or client. For example:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>&quot;Trips to/from Office → Business category&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>&quot;Weekend trips → Personal category&quot;</span>
                  </li>
                </ul>
                <p className="text-slate-300 mt-2">
                  Create rules in Settings &gt; Rules.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How do I create a rule?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: Settings &gt; Rules &gt; &quot;+&quot;. Rules can match:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Start or end location (by address text)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Time window (weekdays, weekends, specific hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Client name</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reports & Exports */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Reports &amp; Exports
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How do I export my trips?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: Go to Reports, select a date range, then:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong>CSV:</strong> Tap &quot;CSV&quot; to export a spreadsheet (free tier)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong>PDF:</strong> Tap &quot;PDF&quot; to export a formatted summary (Pro subscription)</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What&apos;s included in exports?
                </h4>
                <p className="text-slate-300 mb-2">A: Exports include:</p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Trip date, distance, duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Start and end locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Category, client, project code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Notes</span>
                  </li>
                </ul>
                <p className="text-slate-300 mt-2">
                  PDF exports also include summary totals and client breakdowns.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can I filter reports?
                </h4>
                <p className="text-slate-300">
                  A: Yes! Use the Category and Client filters in Reports to show only specific types of trips.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What date ranges can I choose?
                </h4>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong>Month:</strong> Current month or any specific month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong>Year:</strong> Current year or past years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong>Custom:</strong> Any date range (Pro subscription)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Subscriptions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Subscriptions
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What&apos;s included in the free tier?
                </h4>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Unlimited trip tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Auto Mode</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>CSV exports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>All core features</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What&apos;s included in Pro?
                </h4>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>PDF summary exports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Advanced reports with client breakdowns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Custom date range reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Future Pro-only features</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How do I subscribe?
                </h4>
                <p className="text-slate-300">
                  A: Settings &gt; Subscription &amp; Billing &gt; Choose Monthly or Annual plan
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How do I cancel my subscription?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: iOS Settings &gt; [Your Name] &gt; Subscriptions &gt; MileTrack &gt; Cancel
                </p>
                <p className="text-slate-300">
                  Cancellation stops future charges but doesn&apos;t refund the current billing period.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can I get a refund?
                </h4>
                <p className="text-slate-300">
                  A: Refund policies are handled by Apple. Contact Apple Support for refund requests.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Privacy &amp; Data
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Where is my data stored?
                </h4>
                <p className="text-slate-300">
                  A: All trip data is stored locally on your device. MileTrack does not use cloud servers or upload your data.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can I access my data from another device?
                </h4>
                <p className="text-slate-300">
                  A: No, MileTrack doesn&apos;t sync between devices. Data stays on the device where it was created.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How do I delete all my data?
                </h4>
                <p className="text-slate-300">
                  A: Settings &gt; Privacy &amp; Data &gt; Delete all data. This permanently deletes trips, categories, clients, and rules from your device.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Is my data backed up?
                </h4>
                <p className="text-slate-300">
                  A: iOS device backups (iCloud or iTunes) may include MileTrack data. To exclude from backups, disable MileTrack in iOS backup settings.
                </p>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Troubleshooting
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: The app crashed or isn&apos;t working. What should I do?
                </h4>
                <p className="text-slate-300 mb-2">A: Try these steps:</p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Force quit the app (swipe up from app switcher)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Restart your device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Make sure you&apos;re on the latest iOS version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Update MileTrack from the App Store</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>If issues persist, contact support</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Trip distances seem inaccurate. Why?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: Distance accuracy depends on GPS signal quality. Factors that affect accuracy:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Being indoors or in areas with poor GPS reception</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Tall buildings or dense tree cover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Device GPS hardware limitations</span>
                  </li>
                </ul>
                <p className="text-slate-300 mt-2">
                  Always review auto-detected trips for accuracy.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: I&apos;m not seeing address labels on my trips.
                </h4>
                <p className="text-slate-300">
                  A: Address labels (start/end locations) are fetched from Apple&apos;s geocoding service and may take a few seconds to load. Ensure you have an internet connection.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: A feature isn&apos;t working as expected.
                </h4>
                <p className="text-slate-300 mb-2">
                  A: First, try force-quitting and reopening the app. If the issue persists, please contact support with details about:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>What feature isn&apos;t working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>What you expected to happen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>What actually happened</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Screenshots (if applicable)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tax & Legal Disclaimer */}
        <section className="mb-12">
          <div className="rounded-xl p-6 ring-1 ring-amber-500/20 bg-amber-500/5">
            <h3 className="text-lg font-semibold text-amber-300 mb-3">
              Tax &amp; Legal Information
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              <strong>Disclaimer:</strong> MileTrack is a tool to help you track mileage. It does not provide tax advice. Consult a tax professional about:
            </p>
            <ul className="space-y-1 text-sm text-slate-300 ml-4 mb-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>What trips are deductible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>Record-keeping requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>Applicable tax laws in your jurisdiction</span>
              </li>
            </ul>
            <p className="text-sm text-slate-300">
              Always review and verify trip data before using for tax purposes.
            </p>
          </div>
        </section>

        {/* Contact Support */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Contact Support
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <p className="text-slate-300 mb-4">
              Can&apos;t find an answer? We&apos;re here to help!
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-slate-300 mb-2">
                  <strong className="text-slate-200">Email:</strong>{" "}
                  <a
                    href="mailto:support@plenitudo.ai"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    support@plenitudo.ai
                  </a>
                </p>
                <p className="text-slate-300 text-sm">
                  <strong className="text-slate-200">Response Time:</strong> We aim to respond within 1–2 business days
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-2">
                  When contacting support, please include:
                </p>
                <ul className="space-y-1 text-sm text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Your device model and iOS version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>MileTrack version (Settings &gt; About)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Detailed description of the issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Screenshots (if applicable)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* App Information */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            App Information
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <ul className="space-y-2 text-slate-300">
              <li><strong className="text-slate-200">Developer:</strong> Plenitudo AI</li>
              <li><strong className="text-slate-200">Last Updated:</strong> February 21, 2026</li>
              <li><strong className="text-slate-200">Version:</strong> 1.0</li>
            </ul>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Stay Updated
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <p className="text-slate-300">
              Follow us for updates, tips, and announcements:{" "}
              <Link
                href="/app/miletrack/overview"
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
              >
                Website: plenitudo.ai/app/miletrack/overview
              </Link>
            </p>
          </div>
        </section>

        <PlFooter />
      </div>
    </div>
  );
}
