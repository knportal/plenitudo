import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "Plena Support | Help & Documentation",
  description:
    "Get help with Plena mindfulness tracking app. Find answers to common questions, troubleshooting guides, and contact support.",
};

export default function PlenaSupportPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Plena Support
              </h1>
              <p className="text-lg sm:text-xl text-slate-300">
                Help, documentation, and resources for the Plena app
              </p>
            </div>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
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
              href="/app/plena/beta"
              className="rounded-xl p-4 ring-1 ring-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-colors focus:outline-none focus-visible:ring ring-emerald-400"
            >
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Learn About Plena
              </h3>
              <p className="text-sm text-slate-300">
                Discover features, requirements, and what we're testing in beta
              </p>
            </Link>
            <Link
              href="/privacy-policy"
              className="rounded-xl p-4 ring-1 ring-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-colors focus:outline-none focus-visible:ring ring-emerald-400"
            >
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Privacy Policy
              </h3>
              <p className="text-sm text-slate-300">
                Learn how we protect your health data and privacy
              </p>
            </Link>
          </div>
        </section>

        {/* Common Issues */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Getting Help
          </h2>

          <div className="space-y-6">
            {/* Common Issue 1 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">
                Can't start a mindfulness session?
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    Check HealthKit permissions: Settings → Privacy & Security →
                    Health → Plena
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    Ensure you're using a physical device (not simulator)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    See the troubleshooting section below for detailed solutions
                  </span>
                </li>
              </ul>
            </div>

            {/* Common Issue 2 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">
                Missing sensor data?
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Verify your Apple Watch is connected and paired</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    Check that your Watch model supports the sensor (HRV requires
                    Series 4+, Respiratory Rate requires Series 6+)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    See Apple Watch compatibility information below
                  </span>
                </li>
              </ul>
            </div>

            {/* Common Issue 3 */}
            <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">
                Data not syncing between iPhone and Watch?
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Ensure iCloud is enabled on both devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Check that CloudKit is enabled in app settings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Restart both devices and try again</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-6">
            Frequently Asked Questions
          </h2>

          {/* General Questions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              General Questions
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What devices does Plena support?
                </h4>
                <p className="text-slate-300">
                  A: Plena requires iOS 17.0+ on iPhone and watchOS 10.0+ on
                  Apple Watch (Series 4 or newer recommended for full sensor
                  support).
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Do I need an Apple Watch to use Plena?
                </h4>
                <p className="text-slate-300">
                  A: While an Apple Watch provides the best experience with
                  real-time sensor data, you can use Plena on iPhone alone.
                  However, sensor data collection requires an Apple Watch.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Does Plena work in the simulator?
                </h4>
                <p className="text-slate-300">
                  A: No, HealthKit requires a physical device. The app will not
                  function properly in the iOS simulator.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Is my health data secure?
                </h4>
                <p className="text-slate-300">
                  A: Yes. All health data is stored locally on your device or in
                  your personal iCloud account. We do not transmit your health
                  data to our servers. See our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </div>
          </div>

          {/* HealthKit & Permissions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              HealthKit & Permissions
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Why does Plena need HealthKit permissions?
                </h4>
                <p className="text-slate-300">
                  A: Plena uses HealthKit to read biometric data (heart rate,
                  HRV, respiratory rate) and write mindfulness session data.
                  HealthKit is Apple's secure framework for health data.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can I revoke permissions later?
                </h4>
                <p className="text-slate-300">
                  A: Yes, you can manage permissions anytime in Settings →
                  Privacy & Security → Health → Plena. You can turn individual
                  data types on or off.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What happens if I deny permissions?
                </h4>
                <p className="text-slate-300">
                  A: The app will have limited functionality. You won't be able
                  to start mindfulness sessions or view sensor data. You can
                  grant permissions later in Settings.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Does Plena share my health data?
                </h4>
                <p className="text-slate-300">
                  A: No. We do not share, sell, or transmit your health data to
                  third parties. Your data stays on your device or in your
                  iCloud account.
                </p>
              </div>
            </div>
          </div>

          {/* Apple Watch */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Apple Watch
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Which Apple Watch models are supported?
                </h4>
                <p className="text-slate-300">
                  A: Plena works with Apple Watch Series 4 or newer running
                  watchOS 10.0+. Different models support different sensors:
                </p>
                <ul className="mt-2 space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Heart Rate: All models (Series 1+)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>HRV: Series 4+</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Respiratory Rate: Series 6+</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Temperature: Series 8/Ultra+</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Why don't I see HRV data?
                </h4>
                <p className="text-slate-300">
                  A: HRV requires Apple Watch Series 4 or later and sufficient
                  session duration (typically 10+ minutes with at least 3 HRV
                  samples).
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can I start sessions from my Watch?
                </h4>
                <p className="text-slate-300">
                  A: Yes! The Watch app allows you to start and stop mindfulness
                  sessions directly from your wrist. Data automatically syncs to
                  your iPhone.
                </p>
              </div>
            </div>
          </div>

          {/* Data & Sync */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Data & Sync
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How does data sync between iPhone and Watch?
                </h4>
                <p className="text-slate-300">
                  A: Data syncs automatically using CloudKit/iCloud when both
                  devices are connected and signed into the same iCloud account.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can I export my data?
                </h4>
                <p className="text-slate-300">
                  A: Your health data is accessible in the Health app on
                  iPhone. You can view and export data from there. Session
                  summaries are stored locally in the app.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What happens if I delete the app?
                </h4>
                <p className="text-slate-300">
                  A: Deleting the app removes local app data. Your HealthKit
                  data remains in the Health app. iCloud data may remain
                  depending on your iCloud settings.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: How long is my data stored?
                </h4>
                <p className="text-slate-300">
                  A: Local app data is stored until you delete the app.
                  HealthKit data follows your Health app settings. iCloud data
                  follows your iCloud storage settings.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Features
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What sensors does Plena track?
                </h4>
                <p className="text-slate-300 mb-2">A: Plena tracks:</p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>
                      <strong>Heart Rate (BPM)</strong> - Real-time heart rate
                      monitoring
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>
                      <strong>Heart Rate Variability / SDNN (ms)</strong> -
                      Variation between heartbeats
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>
                      <strong>Respiratory Rate (breaths/min)</strong> -
                      Breathing rate tracking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>
                      <strong>Body Temperature</strong> - Temperature monitoring
                      during sessions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>
                      <strong>VO₂ Max</strong> - Maximum oxygen consumption
                      (periodic readings)
                    </span>
                  </li>
                </ul>
                <p className="mt-2 text-slate-300 text-sm">
                  All sensors are tracked in real-time during mindfulness
                  sessions and stored for historical analysis.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What are stress zones?
                </h4>
                <p className="text-slate-300 mb-2">
                  A: Stress zones classify your physiological state:
                </p>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">🔵</span>
                    <span>
                      <strong>Calm:</strong> Relaxed, low stress
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">🟢</span>
                    <span>
                      <strong>Optimal:</strong> Balanced state
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">🟠</span>
                    <span>
                      <strong>Elevated Stress:</strong> Higher stress response
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: Can I view historical data?
                </h4>
                <p className="text-slate-300">
                  A: Yes! The Data tab shows historical visualizations with time
                  range options (Day, Week, Month, Year). You can switch between
                  Consistency view (zone distribution) and Trend view (value over
                  time) for each sensor. The view also provides trend statistics
                  and insights.
                </p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h4 className="font-semibold text-slate-100 mb-2">
                  Q: What is the Readiness Score?
                </h4>
                <p className="text-slate-300">
                  A: The Readiness Score is a daily score (0-100) that provides
                  a holistic view of your recovery and readiness. It's calculated
                  from multiple contributors including Resting Heart Rate, HRV
                  Balance, Body Temperature, Recovery Index, and Sleep metrics
                  (duration, balance, regularity). The score helps you understand
                  when you're ready for optimal performance and when to focus on
                  recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            System Requirements
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">iPhone</h3>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>iOS 17.0 or later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Physical device (not simulator)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>HealthKit support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">
                  Apple Watch (Optional)
                </h3>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>watchOS 10.0 or later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Apple Watch Series 4 or newer (recommended)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Paired with iPhone</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">
                  Required Permissions
                </h3>
                <ul className="space-y-1 text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>
                      HealthKit: Read (Heart Rate, HRV, Respiratory Rate,
                      Temperature, VO₂ Max)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>HealthKit: Write (Mindfulness sessions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Optional: CloudKit/iCloud for device sync</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-4">
            Contact & Support
          </h2>
          <div className="rounded-xl p-6 ring-1 ring-white/10 bg-slate-900/40">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-200 mb-2">
                  Email Support
                </h3>
                <p className="text-slate-300 mb-2">
                  <strong>General Support:</strong>{" "}
                  <a
                    href="mailto:hello@plenitudo.ai"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    hello@plenitudo.ai
                  </a>
                </p>
                <p className="text-slate-300">
                  <strong>Privacy Inquiries:</strong>{" "}
                  <a
                    href="mailto:info@plenitudo.ai"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    info@plenitudo.ai
                  </a>
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-2">
                  <strong>Response Times:</strong> We aim to respond to support
                  inquiries within 48 hours during business days.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <h3 className="font-semibold text-slate-200 mb-2">
                  Bug Reports
                </h3>
                <p className="text-sm text-slate-300 mb-2">
                  If you've found a bug, please include:
                </p>
                <ul className="space-y-1 text-sm text-slate-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Device model and iOS/watchOS version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>App version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Steps to reproduce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Expected vs. actual behavior</span>
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

        {/* Medical Disclaimer */}
        <section className="mb-12">
          <div className="rounded-xl p-6 ring-1 ring-amber-500/20 bg-amber-500/5">
            <h3 className="text-lg font-semibold text-amber-300 mb-3">
              Important Medical Disclaimer
            </h3>
            <p className="text-sm text-slate-300 mb-3">
              Plena is not a medical device and does not provide medical
              advice, diagnosis, or treatment. The information provided by Plena
              is for wellness and self-improvement purposes only.
            </p>
            <ul className="space-y-1 text-sm text-slate-300 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>
                  Do not use Plena data to diagnose, treat, or prevent any
                  disease
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>Consult healthcare professionals for medical advice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>
                  Do not rely on Plena data for medical decisions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>
                  Plena data is not a substitute for professional medical care
                </span>
              </li>
            </ul>
          </div>
        </section>

        <PlFooter />
      </div>
    </div>
  );
}

