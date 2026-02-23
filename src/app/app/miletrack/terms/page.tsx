import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "MileTrack Terms of Service | Plenitudo AI",
  description:
    "Terms of Service for MileTrack — terms and conditions for using the app.",
};

export default function MileTrackTermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              MileTrack Terms of Service
            </h1>
            <Link
              href="/app"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to Apps
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            <strong>Last Updated:</strong> February 21, 2026
          </p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                1. Agreement to Terms
              </h2>
              <p>
                By downloading, installing, or using MileTrack (&quot;the
                App&quot;), you agree to be bound by these Terms of Service
                (&quot;Terms&quot;). If you do not agree to these Terms, do not
                use the App.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                2. Description of Service
              </h2>
              <p className="mb-3">
                MileTrack is an iOS application that helps you track mileage for
                business, tax, or personal purposes. The App provides:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Automatic trip detection using your device&apos;s location and motion sensors</li>
                <li>Manual trip entry</li>
                <li>Trip categorization and organization</li>
                <li>Report generation (CSV and PDF formats)</li>
                <li>Optional Pro subscription for advanced features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                3. License Grant
              </h2>
              <p className="mb-3">
                Subject to these Terms, we grant you a limited, non-exclusive,
                non-transferable, revocable license to download, install, and
                use MileTrack on iOS devices you own or control, solely for your
                personal or internal business use.
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                You May:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use the App on devices you own or control</li>
                <li>Export your trip data for your own use</li>
                <li>Create backups as permitted by iOS</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                You May Not:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Modify, reverse engineer, decompile, or disassemble the App</li>
                <li>Remove copyright or proprietary notices</li>
                <li>Use the App for illegal purposes</li>
                <li>Attempt to circumvent subscription restrictions</li>
                <li>Share your subscription with others</li>
                <li>Use automated tools to interact with the App</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                4. Subscriptions
              </h2>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Free Tier
              </h3>
              <p className="mb-2">
                The free version of MileTrack includes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Unlimited trip tracking</li>
                <li>CSV exports</li>
                <li>Basic reports</li>
                <li>All core features</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Pro Subscription
              </h3>
              <p className="mb-2">
                Pro subscriptions are offered on monthly or annual recurring terms:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Enhanced reports with client breakdowns</li>
                <li>PDF export</li>
                <li>Custom date range reports</li>
                <li>Future Pro-only features</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Subscription Terms
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Payment:</strong> Subscriptions are charged through your Apple ID account</li>
                <li><strong>Auto-Renewal:</strong> Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period</li>
                <li><strong>Cancellation:</strong> Cancel anytime through App Store settings</li>
                <li><strong>No Refunds:</strong> Payments are non-refundable except as required by law</li>
                <li><strong>Price Changes:</strong> We may adjust subscription prices with advance notice; changes take effect at next renewal</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Managing Subscriptions
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>View and manage subscriptions in iOS Settings &gt; [Your Name] &gt; Subscriptions</li>
                <li>Changes take effect immediately or at next billing cycle</li>
                <li>Cancellation stops future charges but does not refund current period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                5. Data &amp; Privacy
              </h2>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Your Data
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>All trip data is stored locally on your device</li>
                <li>You retain ownership of your data</li>
                <li>We do not access, collect, or store your trip data on our servers</li>
                <li>See our Privacy Policy for details: <Link href="/app/miletrack/privacy-policy" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">Privacy Policy</Link></li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Location Services
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Auto Mode requires location permissions (&quot;Always&quot; recommended for background tracking)</li>
                <li>Location data is processed locally to detect trips</li>
                <li>You can disable location access anytime in iOS Settings</li>
                <li>Disabling location stops Auto Mode but doesn&apos;t affect manual trip entry</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Export Responsibility
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>You are responsible for securing exported files</li>
                <li>Exports may contain sensitive business information</li>
                <li>Be cautious when sharing exports via email or cloud services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                6. Accuracy Disclaimer
              </h2>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                No Warranty of Accuracy
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>MileTrack provides tools to track mileage, but accuracy depends on device sensors, GPS signal, and other factors outside our control</li>
                <li>Auto Mode detection is an estimate and may not capture all trips or may detect non-trips</li>
                <li>You are responsible for reviewing, verifying, and correcting all trip data before using for tax or business purposes</li>
                <li><strong>Do not rely solely on auto-detected trips without review</strong></li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Tax Compliance
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>MileTrack is a tool to help you track mileage</li>
                <li>It is not tax advice or a guarantee of tax deductibility</li>
                <li>Consult a tax professional about mileage deductions and record-keeping requirements</li>
                <li>You are responsible for complying with applicable tax laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                7. User Responsibilities
              </h2>
              <p className="mb-2">You agree to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide accurate information when manually entering trips</li>
                <li>Review auto-detected trips for accuracy</li>
                <li>Comply with applicable laws when using the App</li>
                <li>Not use the App while driving (except voice commands where legal)</li>
                <li>Maintain appropriate backups of important data</li>
                <li>Keep your device&apos;s operating system updated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                8. Intellectual Property
              </h2>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Our Rights
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>MileTrack, including its code, design, trademarks, and content, is owned by Plenitudo AI</li>
                <li>These Terms do not grant you ownership rights</li>
                <li>All rights not expressly granted are reserved</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Your Content
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>You retain ownership of trip data, notes, and other content you create</li>
                <li>You grant us no rights to your content (since it stays on your device)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                9. Disclaimer of Warranties
              </h2>
              <p className="mb-3">
                MileTrack is provided &quot;AS IS&quot; and &quot;AS
                AVAILABLE&quot; without warranties of any kind, either express or
                implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>Implied warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties of accuracy, reliability, or error-free operation</li>
                <li>Warranties that the App will meet your requirements</li>
                <li>Warranties that the App will be uninterrupted or secure</li>
              </ul>
              <p>Your use of the App is at your own risk.</p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                10. Limitation of Liability
              </h2>
              <p className="mb-3">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages</li>
                <li>We are not liable for loss of profits, data, or business opportunities</li>
                <li>We are not liable for damages resulting from use or inability to use the App</li>
                <li>Our total liability shall not exceed the amount you paid for subscriptions in the 12 months before the claim</li>
              </ul>
              <p>
                Some jurisdictions do not allow limitation of liability, so these
                limitations may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                11. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Plenitudo AI, its
                affiliates, and their respective officers, directors, employees,
                and agents from any claims, damages, losses, liabilities, and
                expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Your use of the App</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another person or entity</li>
                <li>Your violation of applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                12. Third-Party Services
              </h2>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Apple Services
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Subscriptions are governed by Apple&apos;s App Store Terms</li>
                <li>Apple is not responsible for MileTrack or these Terms</li>
                <li>Apple has no obligation to provide support for the App</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Third-Party Links
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The App may contain links to third-party websites</li>
                <li>We are not responsible for third-party content or privacy practices</li>
                <li>Your use of third-party services is at your own risk</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                13. Termination
              </h2>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                By You
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>You may stop using the App at any time</li>
                <li>Delete the App to remove all local data</li>
                <li>Cancel subscriptions through the App Store</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                By Us
              </h3>
              <p className="mb-2">
                We may terminate or suspend your access if you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent or illegal activity</li>
                <li>Abuse or misuse the App</li>
              </ul>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Effect of Termination
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your license to use the App ends immediately</li>
                <li>Subscription charges stop after the current billing period</li>
                <li>Local data remains on your device until you delete it</li>
                <li>Obligations that should survive (payment obligations, liability limitations) remain in effect</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                14. Changes to Terms
              </h2>
              <p>
                We may update these Terms from time to time. Changes become
                effective when posted. Continued use after changes indicates
                acceptance. For material changes, we&apos;ll provide prominent
                notice in the App or require acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                15. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the United States and
                the State of California, without regard to conflict of law
                principles. You agree to submit to the exclusive jurisdiction of
                courts in California.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                16. Dispute Resolution
              </h2>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Informal Resolution
              </h3>
              <p className="mb-4">
                Before filing a claim, contact us to attempt informal resolution:{" "}
                <a
                  href="mailto:support@plenitudo.ai"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  support@plenitudo.ai
                </a>
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Arbitration
              </h3>
              <p className="mb-4">
                Any disputes that cannot be resolved informally shall be
                resolved through binding arbitration in accordance with the
                American Arbitration Association&apos;s rules, rather than in
                court. Arbitration is conducted in California.
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Exceptions
              </h3>
              <p className="mb-4">
                Either party may seek injunctive relief in court for intellectual
                property infringement or unauthorized use.
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Class Action Waiver
              </h3>
              <p>
                Disputes must be brought individually, not as class actions or
                representative proceedings.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                17. Severability
              </h2>
              <p>
                If any provision of these Terms is found unenforceable, the
                remaining provisions continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                18. Entire Agreement
              </h2>
              <p>
                These Terms, together with our Privacy Policy, constitute the
                entire agreement between you and Plenitudo AI regarding
                MileTrack.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                19. Contact Information
              </h2>
              <p className="mb-2">
                For questions about these Terms:
              </p>
              <p className="mb-1">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@plenitudo.ai"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  support@plenitudo.ai
                </a>
              </p>
              <p className="mb-1">
                <strong>Web:</strong>{" "}
                <Link
                  href="/app/miletrack/support"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  MileTrack Support
                </Link>
              </p>
              <p className="mb-1">
                <strong>Developer:</strong> Plenitudo AI
              </p>
              <p>
                <strong>Last Updated:</strong> February 21, 2026
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400">
              <p>
                <strong>Last Updated:</strong> February 21, 2026
              </p>
            </div>
          </div>
        </div>

        <PlFooter />
      </div>
    </div>
  );
}
