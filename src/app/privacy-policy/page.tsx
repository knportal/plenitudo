import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | Plenitudo AI",
  description:
    "Privacy Policy for Plena - a mindfulness tracking application. Learn how we collect, use, and protect your health data through Apple's HealthKit framework.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Plena Privacy Policy
            </h1>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            <strong>Last Updated:</strong> February 12, 2026
            <br />
            <strong>Effective Date:</strong> February 12, 2026
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Introduction
              </h2>
              <p>
                Plena (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
                committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our mindfulness tracking application
                (&quot;App&quot;) and related services.
              </p>
              <p className="mt-3 text-emerald-300 font-medium">
                <strong>Important:</strong> This app uses Apple&apos;s HealthKit
                framework to access health data. Your health information is
                sensitive, and we take its protection seriously.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Information We Collect
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Health Data (via HealthKit)
              </h3>
              <p>
                Plena accesses the following health data types through
                Apple&apos;s HealthKit framework:
              </p>

              <div className="mt-3">
                <p className="font-medium text-slate-200 mb-2">
                  <strong>Data We Read:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Heart Rate (beats per minute)</li>
                  <li>Heart Rate Variability (HRV/SDNN) in milliseconds</li>
                  <li>Respiratory Rate (breaths per minute)</li>
                  <li>Body Temperature</li>
                  <li>VO₂ Max (maximum oxygen consumption)</li>
                </ul>
              </div>

              <div className="mt-3">
                <p className="font-medium text-slate-200 mb-2">
                  <strong>Data We Write:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Mindfulness session data (mindfulness sessions)</li>
                  <li>Session duration and timestamps</li>
                </ul>
              </div>

              <div className="mt-3">
                <p className="font-medium text-slate-200 mb-2">
                  <strong>How HealthKit Works:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    HealthKit is Apple&apos;s secure health data storage system
                  </li>
                  <li>You control what data Plena can access</li>
                  <li>You can revoke access at any time</li>
                  <li>
                    HealthKit data is stored locally on your device or in your
                    iCloud account
                  </li>
                </ul>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Device Information
              </h3>
              <p>We may collect information about your device, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Device model and operating system version</li>
                <li>App version</li>
                <li>
                  Unique device identifiers (when necessary for app
                  functionality)
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Usage Data
              </h3>
              <p>
                We may collect information about how you use the App, including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Session start and stop times</li>
                <li>Features used within the app</li>
                <li>
                  Crash reports and performance data (automatically collected by
                  Apple)
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                How We Use Your Information
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Primary Uses
              </h3>

              <p className="font-medium text-slate-200 mb-2">
                <strong>Health Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Display real-time biometric readings during mindfulness
                  sessions
                </li>
                <li>Calculate stress zone classifications</li>
                <li>Generate session summaries and statistics</li>
                <li>Create data visualizations and trend analysis</li>
                <li>
                  Provide personalized insights about your mindfulness practice
                </li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>Device Information:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Ensure app compatibility</li>
                <li>Troubleshoot technical issues</li>
                <li>Improve app performance</li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>Usage Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Understand how features are used</li>
                <li>Improve user experience</li>
                <li>Identify and fix bugs</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                We Do NOT:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Sell your data</strong> to third parties
                </li>
                <li>
                  <strong>Share your health data</strong> with advertisers
                </li>
                <li>
                  <strong>Use your data</strong> for marketing purposes without
                  consent
                </li>
                <li>
                  <strong>Access your data</strong> for purposes other than app
                  functionality
                </li>
                <li>
                  <strong>Store your data</strong> on our servers
                </li>
              </ul>
            </section>

            {/* Data Storage & Security */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Storage & Security
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Local Storage
              </h3>
              <p className="font-medium text-slate-200 mb-2">
                <strong>Primary Storage:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Health data is stored locally on your device using CoreData
                </li>
                <li>
                  All health data remains on your device unless you enable
                  iCloud sync
                </li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>What is Stored Locally:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Session summaries and statistics</li>
                <li>App preferences and settings</li>
                <li>Historical data visualizations</li>
                <li>Cache and temporary files</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                iCloud Sync (Optional)
              </h3>
              <p className="font-medium text-slate-200 mb-2">
                <strong>If You Enable CloudKit/iCloud:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Data syncs between your iPhone and Apple Watch</li>
                <li>Data is stored in your personal iCloud account</li>
                <li>Sync is encrypted end-to-end by Apple</li>
                <li>You can disable iCloud sync anytime in Settings</li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>What Syncs:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Session data</li>
                <li>Statistics and summaries</li>
                <li>App settings and preferences</li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>What Does NOT Sync:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Raw HealthKit data (stays in HealthKit)</li>
                <li>Your HealthKit permissions (device-specific)</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Security Measures
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>HealthKit Integration:</strong> All health data access
                  uses Apple&apos;s secure HealthKit framework
                </li>
                <li>
                  <strong>Local Storage:</strong> Data is encrypted at rest on
                  your device
                </li>
                <li>
                  <strong>iCloud Encryption:</strong> If using iCloud, data is
                  encrypted by Apple
                </li>
                <li>
                  <strong>No Third-Party Servers:</strong> We do not transmit
                  your health data to our servers
                </li>
                <li>
                  <strong>Device Security:</strong> Your device&apos;s built-in
                  security protects your data
                </li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Sharing
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Third-Party Services
              </h3>
              <p className="font-medium text-slate-200 mb-2">
                <strong>Apple HealthKit:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>We read and write data to HealthKit</li>
                <li>HealthKit is managed by Apple, not by us</li>
                <li>See Apple&apos;s Privacy Policy for HealthKit data handling</li>
                <li>You control HealthKit permissions in iOS Settings</li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>Apple CloudKit (if enabled):</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Used for syncing data between your devices</li>
                <li>Managed by Apple</li>
                <li>Data remains in your iCloud account</li>
                <li>Encrypted by Apple</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                What We Do NOT Share
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  We do <strong>NOT</strong> share your health data with third
                  parties
                </li>
                <li>
                  We do <strong>NOT</strong> sell your data
                </li>
                <li>
                  We do <strong>NOT</strong> use analytics services that collect
                  health data
                </li>
                <li>
                  We do <strong>NOT</strong> share data with advertisers
                </li>
                <li>
                  We do <strong>NOT</strong> share data with social media
                  platforms
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Legal Requirements
              </h3>
              <p>
                We may disclose your information if required by law, such as:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>To comply with legal obligations</li>
                <li>To respond to valid legal requests</li>
                <li>To protect our rights or the rights of others</li>
                <li>
                  In emergency situations to protect health or safety
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Your Rights
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Access to Your Data
              </h3>
              <p className="font-medium text-slate-200 mb-2">
                <strong>View Your Health Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Open the Health app on your iPhone</li>
                <li>
                  Browse → View your heart rate, HRV, respiratory rate, etc.
                </li>
                <li>All health data is accessible in the Health app</li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>View App Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Open Plena app</li>
                <li>Go to Dashboard tab to view your statistics</li>
                <li>Go to Data tab to view historical visualizations</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Data Deletion
              </h3>
              <p className="font-medium text-slate-200 mb-2">
                <strong>Delete HealthKit Data:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Open Health app on iPhone</li>
                <li>Browse → Find the data type (e.g., Heart Rate)</li>
                <li>Tap &quot;Show All Data&quot;</li>
                <li>Tap &quot;Edit&quot; → Delete specific entries or all data</li>
              </ol>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>Delete App Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Delete the Plena app from your device</li>
                <li>This removes local app data</li>
                <li>HealthKit data remains (delete separately if desired)</li>
                <li>iCloud data may remain (delete in iCloud settings)</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                HealthKit Permissions
              </h3>
              <p className="font-medium text-slate-200 mb-2">
                <strong>Manage Permissions:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Settings → Privacy & Security → Health</li>
                <li>Tap &quot;Plena&quot;</li>
                <li>Toggle ON/OFF for each data type</li>
                <li>Changes take effect immediately</li>
              </ol>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>Revoke All Permissions:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Turn OFF all data types in Settings</li>
                <li>App will not be able to access health data</li>
                <li>App functionality will be limited</li>
              </ul>
            </section>

            {/* Health Data Specific Information */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Health Data Specific Information
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                HealthKit Integration
              </h3>
              <p className="font-medium text-slate-200 mb-2">
                <strong>What is HealthKit?</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>HealthKit is Apple&apos;s secure framework for health data</li>
                <li>It acts as a central repository for health information</li>
                <li>Apps can read and write data with your permission</li>
                <li>All HealthKit data is encrypted and secure</li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>Our Use of HealthKit:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>We read biometric data during mindfulness sessions</li>
                <li>We write mindfulness session data back to HealthKit</li>
                <li>We do not read or write data outside of app usage</li>
                <li>
                  We only access data types necessary for app functionality
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Health Data Privacy
              </h3>
              <p className="font-medium text-slate-200 mb-2">
                <strong>Your Health Data is Private:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Stored securely on your device or in your iCloud account
                </li>
                <li>Encrypted by Apple&apos;s security systems</li>
                <li>Not transmitted to our servers</li>
                <li>Not shared with third parties</li>
                <li>Under your control at all times</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Medical Disclaimer
              </h3>
              <p className="text-emerald-300 font-medium">
                <strong>Important:</strong> Plena is not a medical device and
                does not provide medical advice, diagnosis, or treatment. The
                information provided by Plena is for wellness and
                self-improvement purposes only.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>
                  Do not use Plena data to diagnose, treat, or prevent any
                  disease
                </li>
                <li>Consult healthcare professionals for medical advice</li>
                <li>Do not rely on Plena data for medical decisions</li>
                <li>
                  Plena data is not a substitute for professional medical care
                </li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Children&apos;s Privacy
              </h2>
              <p>
                Plena is not intended for children under the age of 13. We do
                not knowingly collect personal information from children under
                13.
              </p>
              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>If you are a parent or guardian:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>HealthKit requires users to be 13+ to use health apps</li>
                <li>
                  Children&apos;s health data should be managed through Family
                  Sharing features
                </li>
                <li>
                  Contact us if you believe we have inadvertently collected data
                  from a child under 13
                </li>
              </ul>
            </section>

            {/* Changes to This Privacy Policy */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be effective when posted in the app or on our website.
              </p>
              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>We will notify you of significant changes by:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Posting the updated policy in the app</li>
                <li>Updating the &quot;Last Updated&quot; date</li>
                <li>
                  Providing notification through the app (for major changes)
                </li>
              </ul>
              <p className="mt-3">
                <strong>
                  Continued use of the app after changes constitutes acceptance
                  of the updated policy.
                </strong>
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Retention
              </h2>
              <p className="font-medium text-slate-200 mb-2">
                <strong>Local Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Stored on your device until you delete the app</li>
                <li>You can delete data anytime by deleting the app</li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>iCloud Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Stored in your iCloud account until you delete it</li>
                <li>Follows your iCloud storage settings</li>
                <li>Can be deleted in iCloud settings</li>
              </ul>

              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>HealthKit Data:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Managed by Apple&apos;s HealthKit system</li>
                <li>Follows your Health app settings</li>
                <li>You control retention in the Health app</li>
              </ul>
            </section>

            {/* International Users */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                International Users
              </h2>
              <p>If you are using Plena outside the United States:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>
                  Your data may be processed and stored in your country or
                  region
                </li>
                <li>
                  iCloud data is stored according to your iCloud account region
                </li>
                <li>
                  HealthKit data is stored according to Apple&apos;s regional
                  policies
                </li>
                <li>We comply with applicable data protection laws</li>
              </ul>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Contact Us
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this
                Privacy Policy or your data:
              </p>
              <div className="mt-3 space-y-2">
                <p className="font-medium text-slate-200">
                  <strong>Privacy Policy:</strong>
                </p>
                <p>
                  <a
                    href="https://www.plenitudo.ai/privacy-policy"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    https://www.plenitudo.ai/privacy-policy
                  </a>
                </p>

                <p className="font-medium text-slate-200 mt-3">
                  <strong>Privacy Inquiries:</strong>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@plenitudo.ai?subject=Privacy Policy Inquiry"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    info@plenitudo.ai
                  </a>
                  <br />
                  Subject: Privacy Policy Inquiry
                </p>

                <p className="font-medium text-slate-200 mt-3">
                  <strong>General Support:</strong>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:hello@plenitudo.ai"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    hello@plenitudo.ai
                  </a>
                  <br />
                  Support:{" "}
                  <Link
                    href="/app/plena/support"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Visit Support Page
                  </Link>
                </p>

                <p className="font-medium text-slate-200 mt-3">
                  <strong>Mailing Address (if applicable):</strong>
                </p>
                <p className="text-slate-400 italic">
                  [Add your business address if required]
                </p>
              </div>
            </section>

            {/* California Privacy Rights */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                California Privacy Rights
              </h2>
              <p>
                If you are a California resident, you have additional rights
                under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>
                  Right to opt-out of sale of personal information (we do not
                  sell data)
                </li>
                <li>
                  Right to non-discrimination for exercising privacy rights
                </li>
              </ul>
              <p className="mt-3">
                <strong>Note:</strong> We do not sell personal information. We
                do not share health data with third parties for commercial
                purposes.
              </p>
            </section>

            {/* European Union (GDPR) Rights */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                European Union (GDPR) Rights
              </h2>
              <p>
                If you are located in the European Union, you have additional
                rights under the General Data Protection Regulation (GDPR):
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Right of access to your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
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

            {/* Consent */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Consent
              </h2>
              <p>By using Plena, you consent to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>
                  The collection and use of information as described in this
                  Privacy Policy
                </li>
                <li>HealthKit data access as described</li>
                <li>Local storage of session data on your device</li>
                <li>Optional iCloud sync (if enabled)</li>
              </ul>
              <p className="font-medium text-slate-200 mt-3 mb-2">
                <strong>You can withdraw consent by:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Revoking HealthKit permissions in Settings</li>
                <li>Disabling iCloud sync</li>
                <li>Deleting the app</li>
              </ul>
            </section>

            {/* Summary */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Summary
              </h2>
              <p className="font-medium text-slate-200 mb-2">
                <strong>In Simple Terms:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>We only access health data you explicitly permit</li>
                <li>
                  Your data stays on your device or in your iCloud account
                </li>
                <li>We don&apos;t share your data with anyone</li>
                <li>You control all permissions</li>
                <li>You can delete your data anytime</li>
              </ul>
              <p className="mt-3 text-emerald-300">
                <strong>Your Privacy Matters:</strong> We built Plena with
                privacy in mind. Your health data is yours, and we&apos;re just
                here to help you understand it better.
              </p>
              <p className="mt-3 text-slate-400 text-sm">
                For support, see our{" "}
                <Link
                  href="/app/plena/support"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  Support Page
                </Link>
                .
              </p>
            </section>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400">
              <p>
                <strong>Last Updated:</strong> February 12, 2026
                <br />
                <strong>Version:</strong> 1.0
              </p>
            </div>
          </div>
        </div>

        <PlFooter />
      </div>
    </div>
  );
}
