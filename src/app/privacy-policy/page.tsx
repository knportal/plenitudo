import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "App Store Privacy Disclosure | Plenitudo AI",
  description:
    "App Store Privacy Disclosure for Plena - mapping data collection practices to Apple's App Store Privacy requirements. Learn how we handle health and fitness data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              App Store Privacy Disclosure for Plena
            </h1>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            <strong>Last Updated:</strong> December 18, 2025
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            This document maps Plena&apos;s data collection practices to
            Apple&apos;s App Store Privacy Disclosure requirements.
          </p>
        </div>

        {/* Privacy Disclosure Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
            {/* Summary */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Summary
              </h2>
              <p>
                Plena collects health and fitness data through Apple&apos;s
                HealthKit framework. All data is stored locally on the
                user&apos;s device and is not transmitted to external servers.
                No third-party analytics, advertising, or tracking services are
                used.
              </p>
            </section>

            {/* Data Types Collected */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Types Collected
              </h2>

              {/* Health Data */}
              <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <h3 className="text-base sm:text-lg font-semibold text-slate-200 mb-3">
                  1. Health & Fitness
                </h3>

                <h4 className="text-sm sm:text-base font-semibold text-emerald-400 mb-2">
                  Health Data
                </h4>
                <p className="text-slate-400 text-sm mb-2">
                  <strong>Data Type:</strong> Health (Health & Fitness category)
                </p>

                <p className="font-medium text-slate-200 mb-2">
                  <strong>What is collected:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Heart Rate (beats per minute)</li>
                  <li>Heart Rate Variability (HRV/SDNN) in milliseconds</li>
                  <li>Respiratory Rate (breaths per minute)</li>
                  <li>Body Temperature (wrist temperature, when available)</li>
                  <li>VO₂ Max (estimated fitness level, when available)</li>
                  <li>
                    Sleep Analysis data (sleep duration, sleep periods, and
                    sleep stages)
                  </li>
                  <li>Resting Heart Rate (for readiness score calculation)</li>
                </ul>

                <p className="font-medium text-slate-200 mt-3 mb-2">
                  <strong>How it&apos;s collected:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Read from Apple HealthKit framework</li>
                  <li>
                    Collected during meditation sessions via Apple Watch sensors
                  </li>
                  <li>
                    Historical data may be read from HealthKit for trend
                    analysis
                  </li>
                </ul>

                <p className="font-medium text-slate-200 mt-3 mb-2">
                  <strong>Purpose:</strong>
                </p>
                <ul className="list-none space-y-1 ml-4">
                  <li>
                    <span className="text-emerald-400">✅</span>{" "}
                    <strong>App Functionality</strong>
                  </li>
                  <li className="ml-6">
                    - Display real-time biometric readings during meditation
                    sessions
                  </li>
                  <li className="ml-6">
                    - Calculate stress zone classifications (Calm, Optimal,
                    Elevated Stress)
                  </li>
                  <li className="ml-6">
                    - Generate session summaries and statistics
                  </li>
                  <li className="ml-6">
                    - Create data visualizations and trend analysis
                  </li>
                  <li className="ml-6">- Calculate readiness scores</li>
                  <li className="ml-6">- Provide personalized insights</li>
                </ul>

                <div className="mt-3 space-y-1">
                  <p>
                    <strong>Linked to User:</strong>{" "}
                    <span className="text-emerald-400">✅ Yes</span> - Health
                    data is inherently linked to the user&apos;s identity
                  </p>
                  <p>
                    <strong>Used for Tracking:</strong>{" "}
                    <span className="text-red-400">❌ No</span> - Health data is
                    not used for tracking purposes
                  </p>
                  <p>
                    <strong>Third-Party Sharing:</strong>{" "}
                    <span className="text-red-400">❌ No</span> - Health data is
                    not shared with third parties
                  </p>
                </div>
              </div>

              {/* Fitness Data */}
              <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <h4 className="text-sm sm:text-base font-semibold text-emerald-400 mb-2">
                  Fitness Data
                </h4>
                <p className="text-slate-400 text-sm mb-2">
                  <strong>Data Type:</strong> Fitness (Health & Fitness
                  category)
                </p>

                <p className="font-medium text-slate-200 mb-2">
                  <strong>What is collected:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Meditation session duration and timestamps</li>
                  <li>Session frequency and patterns</li>
                  <li>Mindfulness session data (written to HealthKit)</li>
                </ul>

                <p className="font-medium text-slate-200 mt-3 mb-2">
                  <strong>How it&apos;s collected:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Generated by the app during meditation sessions</li>
                  <li>
                    Written to HealthKit for integration with Apple Health app
                  </li>
                  <li>Stored locally in CoreData</li>
                </ul>

                <p className="font-medium text-slate-200 mt-3 mb-2">
                  <strong>Purpose:</strong>
                </p>
                <ul className="list-none space-y-1 ml-4">
                  <li>
                    <span className="text-emerald-400">✅</span>{" "}
                    <strong>App Functionality</strong>
                  </li>
                  <li className="ml-6">- Track meditation practice</li>
                  <li className="ml-6">- Calculate session statistics</li>
                  <li className="ml-6">- Generate progress insights</li>
                  <li className="ml-6">- Sync between iPhone and Apple Watch</li>
                </ul>

                <div className="mt-3 space-y-1">
                  <p>
                    <strong>Linked to User:</strong>{" "}
                    <span className="text-emerald-400">✅ Yes</span> - Session
                    data is linked to the user
                  </p>
                  <p>
                    <strong>Used for Tracking:</strong>{" "}
                    <span className="text-red-400">❌ No</span> - Session data
                    is not used for tracking
                  </p>
                  <p>
                    <strong>Third-Party Sharing:</strong>{" "}
                    <span className="text-red-400">❌ No</span> - Session data
                    is not shared with third parties
                  </p>
                </div>
              </div>
            </section>

            {/* Data NOT Collected */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data NOT Collected
              </h2>
              <p className="mb-3">
                The following data types are <strong>NOT</strong> collected by
                Plena:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <p>
                    <span className="text-red-400">❌</span> Contact Info (Name,
                    Email, Phone, Address)
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> Financial Info
                    (Payment, Credit, etc.)
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> Location Data
                    (Precise or Coarse)
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> Sensitive Info
                    (Race, Sexual Orientation, etc.)
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> User Content
                    (Photos, Videos, Audio, etc.)
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> Browsing History
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="text-red-400">❌</span> Search History
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> User ID (no user
                    accounts or authentication)
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> Device ID (no
                    advertising identifiers)
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> Product Interaction
                    (no in-app purchases tracked)
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> Advertising Data
                  </p>
                  <p>
                    <span className="text-red-400">❌</span> Other Usage Data
                    (no analytics services)
                  </p>
                </div>
              </div>
            </section>

            {/* Data Use Purposes */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Use Purposes
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                App Functionality{" "}
                <span className="text-emerald-400 text-sm">✅</span>
              </h3>
              <p className="mb-2">
                All collected data is used <strong>exclusively</strong> for app
                functionality:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Real-time sensor data display</li>
                <li>Stress zone calculations</li>
                <li>Session tracking and statistics</li>
                <li>Data visualizations and trend analysis</li>
                <li>Readiness score calculations</li>
                <li>Device synchronization (iPhone ↔ Apple Watch)</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                NOT Used For:
              </h3>
              <ul className="list-none space-y-1 ml-4">
                <li>
                  <span className="text-red-400">❌</span> Third-Party
                  Advertising
                </li>
                <li>
                  <span className="text-red-400">❌</span> Developer&apos;s
                  Advertising or Marketing
                </li>
                <li>
                  <span className="text-red-400">❌</span> Analytics (no
                  analytics services integrated)
                </li>
                <li>
                  <span className="text-red-400">❌</span> Product
                  Personalization (beyond app functionality)
                </li>
                <li>
                  <span className="text-red-400">❌</span> Tracking
                </li>
                <li>
                  <span className="text-red-400">❌</span> Other Purposes
                </li>
              </ul>
            </section>

            {/* Data Storage & Transmission */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Storage & Transmission
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Local Storage
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  All data is stored locally on the user&apos;s device using
                  CoreData
                </li>
                <li>
                  Data is stored in an App Group container for sharing between
                  iPhone and Apple Watch
                </li>
                <li>
                  HealthKit data remains in Apple&apos;s HealthKit system
                  (managed by Apple)
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Cloud Storage (Optional)
              </h3>
              <p className="mb-2">
                If the user enables iCloud/CloudKit sync:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Session data may sync between devices via the user&apos;s
                  iCloud account
                </li>
                <li>Data is encrypted by Apple</li>
                <li>
                  Data remains in the user&apos;s personal iCloud account
                </li>
                <li>This is managed by Apple, not by Plena</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Data Transmission
              </h3>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-emerald-800/50">
                <ul className="list-none space-y-2">
                  <li>
                    <span className="text-red-400">❌</span>{" "}
                    <strong>
                      No data is transmitted to Plena&apos;s servers
                    </strong>
                  </li>
                  <li>
                    <span className="text-red-400">❌</span>{" "}
                    <strong>
                      No data is transmitted to third-party servers
                    </strong>
                  </li>
                  <li>
                    <span className="text-red-400">❌</span>{" "}
                    <strong>No data is shared with analytics services</strong>
                  </li>
                  <li>
                    <span className="text-red-400">❌</span>{" "}
                    <strong>
                      No data is shared with advertising networks
                    </strong>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Linked to User */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Data Linked to User
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Health Data
              </h3>
              <p>
                <span className="text-emerald-400">✅</span>{" "}
                <strong>Yes, linked to user</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>
                  Health data is inherently personal and linked to the
                  user&apos;s identity
                </li>
                <li>
                  Data is stored in HealthKit, which is tied to the user&apos;s
                  Apple ID
                </li>
                <li>No anonymization or de-identification is performed</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Session Data
              </h3>
              <p>
                <span className="text-emerald-400">✅</span>{" "}
                <strong>Yes, linked to user</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>
                  Session data is stored locally and associated with the
                  device/user
                </li>
                <li>
                  No user accounts are created, but data is device-specific
                </li>
              </ul>
            </section>

            {/* Tracking */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Tracking
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Is Data Used for Tracking?
              </h3>
              <p className="text-lg">
                <span className="text-red-400">❌</span> <strong>No</strong>
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Definition Compliance
              </h3>
              <p className="mb-2">
                According to Apple&apos;s definition, &quot;tracking&quot;
                refers to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Linking data with Third-Party Data for targeted advertising or
                  advertising measurement
                </li>
                <li>Sharing data with a data broker</li>
              </ul>

              <p className="mt-3 mb-2">
                Plena does <strong>NOT</strong>:
              </p>
              <ul className="list-none space-y-1 ml-4">
                <li>
                  <span className="text-red-400">❌</span> Link data with
                  third-party data
                </li>
                <li>
                  <span className="text-red-400">❌</span> Share data with data
                  brokers
                </li>
                <li>
                  <span className="text-red-400">❌</span> Use data for targeted
                  advertising
                </li>
                <li>
                  <span className="text-red-400">❌</span> Use data for
                  advertising measurement
                </li>
                <li>
                  <span className="text-red-400">❌</span> Share data with
                  advertising networks
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Data Processing Location
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  All data processing occurs <strong>on-device</strong>
                </li>
                <li>
                  HealthKit data is processed by Apple&apos;s HealthKit
                  framework
                </li>
                <li>No data is sent off-device for processing</li>
              </ul>
            </section>

            {/* Third-Party Partners */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Third-Party Partners
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Apple Services Used
              </h3>

              <div className="space-y-4">
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="font-medium text-emerald-400">
                    1. HealthKit (Apple)
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                    <li>Framework for accessing health data</li>
                    <li>Managed by Apple</li>
                    <li>Data remains in Apple&apos;s HealthKit system</li>
                    <li>User controls permissions in iOS Settings</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="font-medium text-emerald-400">
                    2. CloudKit/iCloud (Apple, Optional)
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                    <li>Used for device synchronization if enabled by user</li>
                    <li>Managed by Apple</li>
                    <li>Data encrypted by Apple</li>
                    <li>User controls in iCloud settings</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Third-Party SDKs
              </h3>
              <ul className="list-none space-y-1 ml-4">
                <li>
                  <span className="text-red-400">❌</span>{" "}
                  <strong>None</strong> - No third-party SDKs are integrated
                </li>
                <li>
                  <span className="text-red-400">❌</span>{" "}
                  <strong>No analytics SDKs</strong> (Firebase, Amplitude,
                  Mixpanel, etc.)
                </li>
                <li>
                  <span className="text-red-400">❌</span>{" "}
                  <strong>No advertising SDKs</strong>
                </li>
                <li>
                  <span className="text-red-400">❌</span>{" "}
                  <strong>No crash reporting SDKs</strong> (Crashlytics, etc.)
                </li>
              </ul>
            </section>

            {/* Privacy Policy & Contact */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Privacy Policy & Contact
              </h2>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                <p className="mb-2">
                  <strong>Privacy Policy URL:</strong>{" "}
                  <a
                    href="https://plenitudo.ai/privacy-policy"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    https://plenitudo.ai/privacy-policy
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Contact Email:</strong>{" "}
                  <a
                    href="mailto:info@plenitudo.ai"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    info@plenitudo.ai
                  </a>
                </p>
                <p>
                  <strong>Support:</strong>{" "}
                  <Link
                    href="/app/plena/support"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Visit Support Page
                  </Link>
                </p>
              </div>
            </section>

            {/* App Store Connect Configuration */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                App Store Connect Configuration
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Step-by-Step Guide
              </h3>

              <div className="space-y-4">
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="font-medium text-emerald-400 mb-2">
                    1. Go to App Store Connect
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Navigate to your app</li>
                    <li>
                      Select &quot;App Privacy&quot; in the left sidebar
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="font-medium text-emerald-400 mb-2">
                    2. Data Collection
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>
                      Click &quot;Get Started&quot; or &quot;Edit&quot;
                    </li>
                    <li>
                      Select &quot;Yes&quot; for &quot;Does your app collect
                      data?&quot;
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="font-medium text-emerald-400 mb-2">
                    3. Add Data Types
                  </p>
                  <div className="ml-4 text-sm space-y-3">
                    <div>
                      <p className="font-medium text-slate-200">
                        For Health Data:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          Select: <strong>Health & Fitness</strong> →{" "}
                          <strong>Health</strong>
                        </li>
                        <li>
                          Purpose:{" "}
                          <span className="text-emerald-400">
                            ✅ App Functionality
                          </span>{" "}
                          (only)
                        </li>
                        <li>
                          Linked to User:{" "}
                          <span className="text-emerald-400">✅ Yes</span>
                        </li>
                        <li>
                          Used for Tracking:{" "}
                          <span className="text-red-400">❌ No</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-slate-200">
                        For Fitness Data:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          Select: <strong>Health & Fitness</strong> →{" "}
                          <strong>Fitness</strong>
                        </li>
                        <li>
                          Purpose:{" "}
                          <span className="text-emerald-400">
                            ✅ App Functionality
                          </span>{" "}
                          (only)
                        </li>
                        <li>
                          Linked to User:{" "}
                          <span className="text-emerald-400">✅ Yes</span>
                        </li>
                        <li>
                          Used for Tracking:{" "}
                          <span className="text-red-400">❌ No</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="font-medium text-emerald-400 mb-2">
                    4. Third-Party Data Collection
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>
                      Select: <strong>No</strong> (unless you add third-party
                      services in the future)
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="font-medium text-emerald-400 mb-2">
                    5. Privacy Policy
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>
                      Enter:{" "}
                      <code className="bg-slate-800 px-1 rounded">
                        https://plenitudo.ai/privacy-policy
                      </code>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="font-medium text-emerald-400 mb-2">
                    6. Review and Save
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Review all entries</li>
                    <li>Save changes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Important Notes */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Important Notes
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Health Data Disclosure Requirements
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Health data collected through HealthKit{" "}
                  <strong>must</strong> be disclosed
                </li>
                <li>
                  Even if data is only used for app functionality, it must be
                  declared
                </li>
                <li>
                  Health data is always considered &quot;linked to user&quot;
                </li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Optional Disclosure Criteria
              </h3>
              <p className="mb-2">
                Health data does <strong>NOT</strong> meet optional disclosure
                criteria because:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  It is part of the app&apos;s primary functionality (not
                  infrequent/optional)
                </li>
                <li>
                  It is collected on an ongoing basis (not just during initial
                  setup)
                </li>
                <li>It is used for core app features</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Data Collection Definition
              </h3>
              <p className="mb-2">
                According to Apple, &quot;collect&quot; means:
              </p>
              <blockquote className="border-l-4 border-emerald-400 pl-4 py-2 my-3 bg-slate-900/30 rounded-r italic">
                &quot;Transmitting data off the device in a way that allows you
                and/or your third-party partners to access it for a period
                longer than what is necessary to service the transmitted request
                in real time.&quot;
              </blockquote>

              <p className="font-medium text-slate-200 mb-2">
                <strong>Plena&apos;s Status:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Health data is read from HealthKit (on-device)</li>
                <li>Session data is stored locally (on-device)</li>
                <li>
                  No data is transmitted off-device to Plena&apos;s servers
                </li>
                <li>
                  iCloud sync (if enabled) is managed by Apple, not Plena
                </li>
              </ul>

              <p className="mt-3 p-3 bg-amber-900/20 border border-amber-700/50 rounded-lg text-amber-200">
                <strong>However:</strong> Since HealthKit data is accessed by
                the app and stored locally in CoreData, it is considered
                &quot;collected&quot; for disclosure purposes, even though
                it&apos;s not transmitted to external servers.
              </p>
            </section>

            {/* Compliance Checklist */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Compliance Checklist
              </h2>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-emerald-800/50">
                <ul className="list-none space-y-2">
                  <li>
                    <span className="text-emerald-400">✅</span> All HealthKit
                    data types are identified
                  </li>
                  <li>
                    <span className="text-emerald-400">✅</span> All data
                    purposes are correctly categorized
                  </li>
                  <li>
                    <span className="text-emerald-400">✅</span> Data linking
                    status is accurate
                  </li>
                  <li>
                    <span className="text-emerald-400">✅</span> Tracking status
                    is correctly set to &quot;No&quot;
                  </li>
                  <li>
                    <span className="text-emerald-400">✅</span> Third-party
                    sharing is correctly set to &quot;No&quot;
                  </li>
                  <li>
                    <span className="text-emerald-400">✅</span> Privacy policy
                    URL is provided
                  </li>
                  <li>
                    <span className="text-emerald-400">✅</span> No optional data
                    types are incorrectly omitted
                  </li>
                  <li>
                    <span className="text-emerald-400">✅</span> All data
                    collection is disclosed
                  </li>
                </ul>
              </div>
            </section>

            {/* Future Considerations */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                Future Considerations
              </h2>
              <p className="mb-3">
                If you plan to add any of the following in the future,
                you&apos;ll need to update your privacy disclosure:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Analytics services (Firebase Analytics, etc.)</li>
                <li>Crash reporting (Crashlytics, etc.)</li>
                <li>User accounts or authentication</li>
                <li>Cloud storage on your own servers</li>
                <li>Advertising or marketing services</li>
                <li>Social media integration</li>
                <li>In-app purchases tracking</li>
              </ul>
              <p className="mt-3 p-3 bg-amber-900/20 border border-amber-700/50 rounded-lg text-amber-200">
                <strong>Remember:</strong> You must update your privacy
                disclosure in App Store Connect whenever your data collection
                practices change, even if you don&apos;t submit an app update.
              </p>
            </section>

            {/* References */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                References
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <a
                    href="https://developer.apple.com/app-store/app-privacy-details/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Apple App Privacy Details Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.apple.com/documentation/healthkit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    HealthKit Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.apple.com/app-store/review/guidelines/#privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    App Store Review Guidelines - Privacy
                  </a>
                </li>
              </ul>
            </section>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400">
              <p>
                <strong>Document Version:</strong> 1.1
                <br />
                <strong>Last Updated:</strong> January 1, 2026
                <br />
                <strong>For App Store Connect Submission</strong>
              </p>
            </div>
          </div>
        </div>

        <PlFooter />
      </div>
    </div>
  );
}
