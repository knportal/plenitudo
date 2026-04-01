import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Plenitudo AI",
  description:
    "Privacy Policy for Plenitudo iOS apps — Plena and MileTrack. Your data stays on your device. No backend servers, no accounts, no data selling.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Plenitudo Apps — Privacy Policy
            </h1>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            <strong>Last Updated:</strong> April 1, 2026
            <br />
            <strong>Effective Date:</strong> April 1, 2026
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            This policy covers all iOS apps published by Plenitudo:{" "}
            <strong className="text-slate-300">Plena</strong> and{" "}
            <strong className="text-slate-300">MileTrack</strong>.
          </p>
        </div>

        {/* Jump links */}
        <div className="mb-10 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 space-y-1">
          <p className="font-semibold text-slate-100 mb-2">Jump to app section:</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            <li>
              <a href="#plena" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                Plena — Mindful Biometrics
              </a>
            </li>
            <li>
              <a href="#miletrack" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                MileTrack — Mileage Tracker
              </a>
            </li>
            <li>
              <a href="#shared" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                Shared Policies
              </a>
            </li>
          </ul>
        </div>

        {/* Privacy Policy Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="space-y-12 text-sm sm:text-base text-slate-300 leading-relaxed">

            {/* --- SHARED PRINCIPLES --- */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Our Core Privacy Commitment
              </h2>
              <p>
                Plenitudo (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) builds apps that respect your privacy. Across all of our iOS apps, the same principles apply:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                <li>
                  <strong>No backend servers for your personal data</strong> — your data lives on your device
                </li>
                <li>
                  <strong>No accounts required</strong> — no email, no passwords, no sign-up
                </li>
                <li>
                  <strong>No selling or sharing your data</strong> with advertisers or third parties
                </li>
                <li>
                  <strong>No analytics SDKs</strong> tracking your behavior
                </li>
                <li>
                  <strong>You are always in control</strong> — delete your data at any time
                </li>
              </ul>
            </section>

            {/* ======================= */}
            {/* PLENA SECTION           */}
            {/* ======================= */}
            <section id="plena" className="pt-4 border-t border-white/10">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-1">
                  Plena — Mindful Biometrics
                </h2>
                <p className="text-xs text-slate-400">
                  App: Plena Biofeedback &nbsp;·&nbsp; App Store: com.plena.meditation.app
                </p>
              </div>

              <p className="mb-4">
                Plena is a mindfulness tracking application that reads biometric data from Apple Watch via HealthKit. It is committed to protecting your health data.
              </p>

              <p className="text-emerald-300 font-medium mb-6">
                <strong>Important:</strong> This app uses Apple&apos;s HealthKit framework to access health data. Your health information is sensitive, and we take its protection seriously.
              </p>

              {/* Information We Collect */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-4 mb-2">
                  Information We Collect
                </h3>

                <h4 className="text-sm font-semibold text-slate-200 mt-4 mb-1">
                  Health Data (via HealthKit)
                </h4>
                <p>Plena accesses the following health data types through Apple&apos;s HealthKit framework:</p>
                <p className="font-medium text-slate-200 mt-3 mb-1"><strong>Data We Read:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Heart Rate (beats per minute)</li>
                  <li>Heart Rate Variability (HRV/SDNN) in milliseconds</li>
                  <li>Respiratory Rate (breaths per minute)</li>
                  <li>Body Temperature</li>
                  <li>VO₂ Max (maximum oxygen consumption)</li>
                </ul>
                <p className="font-medium text-slate-200 mt-3 mb-1"><strong>Data We Write:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Mindfulness session data</li>
                  <li>Session duration and timestamps</li>
                </ul>
                <p className="font-medium text-slate-200 mt-3 mb-1"><strong>How HealthKit Works:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>HealthKit is Apple&apos;s secure health data storage system</li>
                  <li>You control what data Plena can access</li>
                  <li>You can revoke access at any time in iOS Settings</li>
                  <li>HealthKit data is stored locally on your device or in your iCloud account</li>
                </ul>

                <h4 className="text-sm font-semibold text-slate-200 mt-4 mb-1">Device & Usage Information</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Device model and operating system version</li>
                  <li>App version</li>
                  <li>Session start/stop times and features used</li>
                  <li>Crash reports and performance data (collected automatically by Apple)</li>
                </ul>
              </section>

              {/* How We Use */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  How We Use Your Information
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Display real-time biometric readings during mindfulness sessions</li>
                  <li>Calculate stress zone classifications</li>
                  <li>Generate session summaries and statistics</li>
                  <li>Create data visualizations and trend analysis</li>
                  <li>Provide personalized insights about your mindfulness practice</li>
                </ul>
                <p className="font-medium text-slate-200 mt-3 mb-1"><strong>We Do NOT:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Sell your data to third parties</li>
                  <li>Share your health data with advertisers</li>
                  <li>Use your data for marketing purposes without consent</li>
                  <li>Store your health data on our servers</li>
                  <li>Access your data for purposes other than app functionality</li>
                </ul>
              </section>

              {/* Data Storage */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Data Storage & Security
                </h3>
                <p className="font-medium text-slate-200 mb-1"><strong>Primary Storage:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Health data is stored locally on your device using CoreData</li>
                  <li>All health data remains on your device unless you enable iCloud sync</li>
                </ul>
                <p className="font-medium text-slate-200 mt-3 mb-1"><strong>iCloud Sync (Optional):</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Syncs session data between your iPhone and Apple Watch</li>
                  <li>Stored in your personal iCloud account, encrypted end-to-end by Apple</li>
                  <li>You can disable iCloud sync at any time in Settings</li>
                  <li>Raw HealthKit data does NOT sync (stays in HealthKit only)</li>
                </ul>
                <p className="font-medium text-slate-200 mt-3 mb-1"><strong>Security:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All health data access uses Apple&apos;s secure HealthKit framework</li>
                  <li>Data is encrypted at rest on your device</li>
                  <li>No transmission to our servers</li>
                </ul>
              </section>

              {/* Your Rights — Plena */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Your Rights (Plena)
                </h3>
                <p className="font-medium text-slate-200 mb-1"><strong>View your health data:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Open the Health app on your iPhone to browse all health records</li>
                  <li>Open Plena to view your Dashboard and Data tabs</li>
                </ul>
                <p className="font-medium text-slate-200 mt-3 mb-1"><strong>Delete app data:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Delete the Plena app to remove all local data</li>
                  <li>HealthKit data must be deleted separately via the Health app</li>
                  <li>iCloud data can be removed in iCloud Settings</li>
                </ul>
                <p className="font-medium text-slate-200 mt-3 mb-1"><strong>Manage HealthKit permissions:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Settings → Privacy & Security → Health → Plena</li>
                  <li>Toggle individual data types ON/OFF as desired</li>
                </ol>
              </section>

              {/* Medical Disclaimer */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Medical Disclaimer
                </h3>
                <p className="text-emerald-300 font-medium">
                  <strong>Important:</strong> Plena is not a medical device and does not provide medical advice, diagnosis, or treatment. The information provided is for wellness and self-improvement purposes only. Consult a healthcare professional for medical decisions.
                </p>
              </section>

              {/* Subscriptions — Plena */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Subscriptions
                </h3>
                <p>
                  In-app purchases are managed entirely by Apple via the App Store. We receive only anonymized subscription status (active/expired). We do not have access to your payment information or Apple ID.
                </p>
              </section>
            </section>

            {/* ======================== */}
            {/* MILETRACK SECTION        */}
            {/* ======================== */}
            <section id="miletrack" className="pt-4 border-t border-white/10">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-1">
                  MileTrack — Mileage Tracker
                </h2>
                <p className="text-xs text-slate-400">
                  App: MileTrack by Plenitudo &nbsp;·&nbsp; App Store: ai.plenitudo.MileTrack
                </p>
              </div>

              <p className="mb-4">
                MileTrack is designed with privacy as a core principle. Your mileage data is yours and stays on your device. We do not operate backend servers for trip data, and no account is required.
              </p>

              {/* No Account */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-4 mb-2">
                  No Account Required
                </h3>
                <p className="mb-2">MileTrack does not require account creation. There is no:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Email address collection</li>
                  <li>Password or authentication system</li>
                  <li>User profiles or personal information storage</li>
                  <li>Login or sign-up process</li>
                </ul>
                <p className="mt-2">
                  You can start using MileTrack immediately after download without providing any personal information.
                </p>
              </section>

              {/* Data Collection */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Data Collection and Storage
                </h3>

                <h4 className="text-sm font-semibold text-slate-200 mt-3 mb-1">
                  What We Access (On Your Device Only)
                </h4>
                <p className="mb-2">To provide automatic trip detection, MileTrack requests access to:</p>

                <p className="font-medium text-slate-200 mb-1">Motion Activity:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li><strong>Purpose:</strong> Detect when you&apos;re driving vs. not driving</li>
                  <li><strong>Used for:</strong> Auto Mode trip detection</li>
                  <li><strong>Storage:</strong> Processed locally, not stored permanently</li>
                </ul>

                <p className="font-medium text-slate-200 mb-1">Location Services:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li><strong>Purpose:</strong> Calculate trip distance, record route, and estimate start/end locations</li>
                  <li><strong>Used for:</strong> Distance measurement, route tracing, and optional address labels</li>
                  <li><strong>Route trace:</strong> GPS coordinates are sampled throughout each trip (up to 500 points per trip) and stored locally for map visualization</li>
                  <li><strong>Note:</strong> Continuous location tracking only occurs during active detected drives</li>
                </ul>

                <h4 className="text-sm font-semibold text-slate-200 mt-3 mb-1">
                  What We Store (Locally on Your Device)
                </h4>
                <p className="mb-2">All data is stored exclusively on your device:</p>

                <p className="font-medium text-slate-200 mb-1">Trip Data:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Trip distance (miles/kilometers)</li>
                  <li>Trip date and duration</li>
                  <li>Route trace — GPS coordinates sampled during the trip (up to 500 points)</li>
                  <li>Optional start/end location labels (city/area names)</li>
                  <li>Optional category, client, project code, and notes you enter</li>
                  <li>Source (auto-detected or manual) and confirmation status</li>
                </ul>

                <p className="font-medium text-slate-200 mb-1">User Preferences:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Categories, clients, vehicles, and rules you create</li>
                  <li>Unit preferences (miles/kilometers)</li>
                  <li>Mileage rates (e.g., IRS standard rate: $0.725/mile for 2026)</li>
                  <li>Auto Mode settings</li>
                </ul>

                <p className="text-slate-200">
                  <strong>Note:</strong> Auto-detected trips are only considered &quot;confirmed&quot; after you review and categorize them in the Inbox. Unconfirmed trips can be deleted without affecting your records.
                </p>
              </section>

              {/* What We Do NOT Collect */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  What We Do NOT Collect or Transmit
                </h3>
                <p className="mb-2">MileTrack does not collect, store, or transmit to external servers:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your name, email, phone number, or any personal identifiers</li>
                  <li>Your trip or location data (everything stays on-device)</li>
                  <li>Device identifiers for tracking</li>
                  <li>Analytics or usage data</li>
                  <li>Any third-party analytics or advertising SDKs</li>
                </ul>
              </section>

              {/* iCloud Sync */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  iCloud Sync
                </h3>
                <p>
                  If iCloud Drive is enabled, trip data is backed up to your private iCloud container. This data is encrypted by Apple and stored in your personal iCloud account — we cannot access it. You can disable this via Settings → Apple ID → iCloud.
                </p>
              </section>

              {/* Subscriptions */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Subscriptions
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Subscriptions are managed entirely by Apple via the App Store</li>
                  <li>Apple handles all payment processing using your existing Apple ID</li>
                  <li>We receive only anonymized subscription status (active/expired)</li>
                  <li>We do not have access to your payment information or Apple ID</li>
                </ul>
              </section>

              {/* Data Export */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Data Export
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li><strong>CSV Export:</strong> Available for all confirmed trips</li>
                  <li><strong>PDF Export:</strong> Available with Pro subscription for summary reports</li>
                </ul>
                <p>When you export, files are temporarily saved to your device&apos;s storage and shared via the iOS share sheet. No data is uploaded to our servers during export.</p>
              </section>

              {/* Third-Party Services */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Third-Party Services
                </h3>
                <p className="font-medium text-slate-200 mb-1">Apple StoreKit (Subscriptions Only):</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Used solely for in-app subscription management</li>
                  <li>
                    Apple&apos;s Privacy Policy applies:{" "}
                    <a
                      href="https://www.apple.com/legal/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      apple.com/legal/privacy
                    </a>
                  </li>
                </ul>
                <p className="font-medium text-slate-200 mb-1">MapKit (Reverse Geocoding):</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Used to convert coordinates to city/area names (e.g., &quot;Boston, MA&quot;)</li>
                  <li>Processed by Apple&apos;s MapKit framework — Apple&apos;s Privacy Policy applies</li>
                </ul>
              </section>

              {/* Your Rights — MileTrack */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Your Rights (MileTrack)
                </h3>
                <p className="mb-2">Since all data is stored locally on your device:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Access:</strong> Complete access to all your data within the app</li>
                  <li><strong>Correction:</strong> Edit any trip details directly in the app</li>
                  <li><strong>Deletion:</strong> Delete individual trips, or all data via Settings → Privacy & Data → &quot;Delete All Data&quot;</li>
                  <li><strong>Export:</strong> Export your data to CSV or PDF at any time</li>
                </ul>
                <p className="mt-2">
                  Uninstalling the app removes all locally stored data. iCloud backups can be removed via Settings → Apple ID → iCloud → Manage Storage.
                </p>
              </section>
            </section>

            {/* ======================== */}
            {/* SHARED POLICIES          */}
            {/* ======================== */}
            <section id="shared" className="pt-4 border-t border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-6">
                Shared Policies (All Plenitudo Apps)
              </h2>

              {/* Children's Privacy */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-4 mb-2">
                  Children&apos;s Privacy
                </h3>
                <p>
                  Our apps are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. Since we collect no personal information from anyone, our apps are inherently compliant with children&apos;s privacy requirements. Contact us if you believe a child&apos;s data has been inadvertently collected.
                </p>
              </section>

              {/* California Privacy Rights */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  California Privacy Rights (CCPA)
                </h3>
                <p>If you are a California resident, you have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Know what personal information is collected</li>
                  <li>Delete personal information</li>
                  <li>Opt-out of sale of personal information (we do not sell data)</li>
                  <li>Non-discrimination for exercising privacy rights</li>
                </ul>
              </section>

              {/* GDPR */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  European Union Rights (GDPR)
                </h3>
                <p>If you are located in the European Union, you have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Erasure (&quot;right to be forgotten&quot;)</li>
                  <li>Restrict processing</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                  <li>Withdraw consent</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact us at{" "}
                  <a
                    href="mailto:info@plenitudo.ai"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    info@plenitudo.ai
                  </a>
                  .
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Data Security
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All data is stored using iOS&apos;s secure, encrypted file system</li>
                  <li>iOS device encryption protects data when your device is locked</li>
                  <li>App sandbox isolation prevents cross-app data access</li>
                  <li>iCloud data (where applicable) is encrypted by Apple</li>
                  <li>No data transmission to external servers eliminates most remote security risks</li>
                </ul>
              </section>

              {/* International Users */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  International Users
                </h3>
                <p>
                  Since our apps store data locally on your device and do not transmit personal data to external servers, there are no international data transfers to disclose. iCloud data is stored according to your iCloud account region and Apple&apos;s regional policies.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Changes to This Privacy Policy
                </h3>
                <p>
                  We may update this Privacy Policy from time to time. Changes will be effective when posted on our website. We will notify you of significant changes by updating the &quot;Last Updated&quot; date and, where appropriate, through an app update or App Store release notes.
                </p>
                <p className="mt-2">
                  <strong>Continued use of our apps after changes constitutes acceptance of the updated policy.</strong>
                </p>
              </section>

              {/* Contact */}
              <section>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mt-6 mb-2">
                  Contact Us
                </h3>
                <p className="mb-3">
                  If you have questions, concerns, or requests regarding this Privacy Policy or your data:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong className="text-slate-200">Privacy Inquiries:</strong>{" "}
                    <a
                      href="mailto:info@plenitudo.ai?subject=Privacy Policy Inquiry"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      info@plenitudo.ai
                    </a>
                  </p>
                  <p>
                    <strong className="text-slate-200">General Support:</strong>{" "}
                    <a
                      href="mailto:hello@plenitudo.ai"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      hello@plenitudo.ai
                    </a>
                  </p>
                  <p>
                    <strong className="text-slate-200">Plena Support:</strong>{" "}
                    <Link
                      href="/app/plena/support"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      plenitudo.ai/app/plena/support
                    </Link>
                  </p>
                  <p>
                    <strong className="text-slate-200">MileTrack Support:</strong>{" "}
                    <Link
                      href="/app/miletrack/support"
                      className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                    >
                      plenitudo.ai/app/miletrack/support
                    </Link>
                  </p>
                </div>
              </section>
            </section>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400">
              <p>
                <strong>Last Updated:</strong> April 1, 2026
                <br />
                <strong>Version:</strong> 2.0 — Combined Plenitudo Apps Policy
              </p>
            </div>
          </div>
        </div>

        <PlFooter />
      </div>
    </div>
  );
}
