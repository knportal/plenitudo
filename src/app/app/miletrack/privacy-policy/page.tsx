import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "MileTrack Privacy Policy | Plenitudo AI",
  description:
    "MileTrack privacy policy — your mileage data stays on your device. No account required, no backend servers, no personal information collection.",
};

export default function MileTrackPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              MileTrack Privacy Policy
            </h1>
            <Link
              href="/app"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to Apps
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            <strong>Last Updated:</strong> 2/23/2026
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
            {/* Overview */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Overview
              </h2>
              <p>
                MileTrack is designed with privacy as a core principle. We believe your mileage data is yours and should stay on your device. We do not operate backend servers for your trip data, and we do not collect personal information to create accounts.
              </p>
            </section>

            {/* No Account Required */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                No Account Required
              </h2>
              <p className="mb-2">
                MileTrack does not require account creation. There is no:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>Email address collection</li>
                <li>Password or authentication system</li>
                <li>User profiles or personal information storage</li>
                <li>Login or sign-up process</li>
              </ul>
              <p>
                You can start using MileTrack immediately after download without providing any personal information.
              </p>
            </section>

            {/* Data Collection and Storage */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Collection and Storage
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                What We Access (On Your Device Only)
              </h3>
              <p className="mb-2">
                To provide automatic trip detection, MileTrack requests access to:
              </p>

              <h4 className="text-sm font-semibold text-slate-200 mt-3 mb-1">
                Motion Activity
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li><strong>Purpose:</strong> Detect when you&apos;re driving vs. not driving</li>
                <li><strong>Used for:</strong> Auto Mode trip detection</li>
                <li><strong>Storage:</strong> Processed locally, not stored permanently</li>
              </ul>

              <h4 className="text-sm font-semibold text-slate-200 mt-3 mb-1">
                Location Services
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Purpose:</strong> Calculate trip distance and estimate start/end locations</li>
                <li><strong>Used for:</strong> Distance measurement during detected drives, optional address labels</li>
                <li><strong>Storage:</strong> Only start/end coordinates and calculated distance are saved locally</li>
                <li><strong>Note:</strong> Continuous location tracking only occurs during detected drives</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-6 mb-2">
                What We Store (Locally on Your Device)
              </h3>
              <p className="mb-2">
                All data is stored exclusively on your device in local files:
              </p>

              <h4 className="text-sm font-semibold text-slate-200 mt-3 mb-1">
                Trip Data
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>Trip distance (miles/kilometers)</li>
                <li>Trip date and duration</li>
                <li>Optional start/end location labels (city/area names)</li>
                <li>Optional category, client, project code, and notes you enter</li>
                <li>Source (auto-detected or manual)</li>
                <li>Confirmation status</li>
              </ul>

              <h4 className="text-sm font-semibold text-slate-200 mt-3 mb-1">
                User Preferences
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>Categories, clients, and rules you create</li>
                <li>Unit preferences (miles/kilometers)</li>
                <li>Auto Mode settings</li>
              </ul>

              <p className="text-slate-200">
                <strong>Important:</strong> Auto-detected trips are only considered &quot;confirmed&quot; after you review and categorize them in the Inbox. Unconfirmed trips can be deleted without affecting your records.
              </p>
            </section>

            {/* What We Do NOT Collect or Transmit */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                What We Do NOT Collect or Transmit
              </h2>
              <p className="mb-2">
                MileTrack does not collect, store, or transmit to external servers:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your name, email, phone number, or any personal identifiers</li>
                <li>Your precise location coordinates (beyond start/end of trips stored locally)</li>
                <li>Your complete location history or route paths</li>
                <li>Your device identifiers for tracking</li>
                <li>Your trip data or mileage records</li>
                <li>Analytics or usage data</li>
              </ul>
            </section>

            {/* Subscriptions */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Subscriptions
              </h2>
              <p className="mb-2">
                If you choose to subscribe to MileTrack Pro:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Subscriptions are managed entirely by Apple via the App Store</li>
                <li>Apple handles all payment processing using your existing Apple ID</li>
                <li>We receive only anonymized subscription status from Apple (active/expired)</li>
                <li>We do not have access to your payment information, credit card details, or Apple ID</li>
                <li>Subscription management is done through your Apple ID settings</li>
              </ul>
            </section>

            {/* Data Export */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Export
              </h2>
              <p className="mb-2">
                MileTrack allows you to export your trip data:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li><strong>CSV Export:</strong> Available on free tier for all confirmed trips</li>
                <li><strong>PDF Export:</strong> Available with Pro subscription for summary reports</li>
              </ul>
              <p className="mb-2">When you export:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Files are temporarily saved to your device&apos;s storage</li>
                <li>You share them using the standard iOS share sheet</li>
                <li>No data is uploaded to our servers during export</li>
                <li>Exported files remain entirely under your control</li>
              </ul>
            </section>

            {/* Data Deletion */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Deletion
              </h2>
              <p className="mb-2">
                You can delete your data at any time:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Delete individual trips from within the app</li>
                <li>Delete all data via Settings &gt; Privacy &gt; &quot;Delete all data&quot;</li>
                <li>Deleting the app removes all locally stored data</li>
                <li>There are no remote backups to delete since no data is transmitted to servers</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Third-Party Services
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Apple StoreKit (Subscriptions Only)
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Used solely for in-app subscription management</li>
                <li>
                  Apple&apos;s Privacy Policy applies:{" "}
                  <a
                    href="https://www.apple.com/legal/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    https://www.apple.com/legal/privacy/
                  </a>
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                MapKit (Reverse Geocoding)
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Used to convert coordinates to city/area names (e.g., &quot;Cupertino, CA&quot;)</li>
                <li>Processed by Apple&apos;s MapKit framework</li>
                <li>
                  Apple&apos;s Privacy Policy applies:{" "}
                  <a
                    href="https://www.apple.com/legal/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    https://www.apple.com/legal/privacy/
                  </a>
                </li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Children&apos;s Privacy
              </h2>
              <p>
                MileTrack does not knowingly collect any data from children under 13. Since we don&apos;t collect personal information from anyone, our service is inherently compliant with children&apos;s privacy requirements.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Your Rights
              </h2>
              <p className="mb-2">
                Since all data is stored locally on your device:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Access:</strong> You have complete access to all your data within the app</li>
                <li><strong>Correction:</strong> You can edit any trip details directly in the app</li>
                <li><strong>Deletion:</strong> You can delete individual trips or all data at any time</li>
                <li><strong>Export:</strong> You can export your data to CSV or PDF formats</li>
              </ul>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy to reflect changes in our practices or for legal reasons. We will notify you of any material changes by updating the &quot;Last Updated&quot; date and, where appropriate, through the app or App Store update notes.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Security
              </h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All data is stored locally using iOS&apos;s secure file system</li>
                <li>Files are protected by iOS device encryption</li>
                <li>No data transmission to external servers eliminates most remote security risks</li>
                <li>Regular app updates address any discovered vulnerabilities</li>
              </ul>
            </section>

            {/* International Users */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                International Users
              </h2>
              <p>
                Since MileTrack stores all data locally on your device and does not transmit data to servers, there are no international data transfers to disclose.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Contact Us
              </h2>
              <p className="mb-3">
                If you have questions about this privacy policy or MileTrack&apos;s privacy practices:
              </p>
              <div className="space-y-2">
                <p>
                  <strong className="text-slate-200">Email:</strong>{" "}
                  <a
                    href="mailto:info@plenitudo.ai"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    info@plenitudo.ai
                  </a>
                </p>
                <p>
                  <strong className="text-slate-200">Website:</strong>{" "}
                  <Link
                    href="/app/miletrack"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    https://www.plenitudo.ai/app/miletrack
                  </Link>
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400">
              <p><strong>Last Updated:</strong> 2/23/2026</p>
            </div>
          </div>
        </div>

        <PlFooter />
      </div>
    </div>
  );
}
