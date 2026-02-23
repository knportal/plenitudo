import type { Metadata } from "next";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

export const metadata: Metadata = {
  title: "MileTrack Privacy Policy | Plenitudo AI",
  description:
    "Privacy Policy for MileTrack — how we collect, use, disclose, and safeguard your information when you use our mobile application and related services.",
};

export default function MileTrackPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Page Header */}
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <Link
              href="/app"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to Apps
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            <strong>Last Updated:</strong> February 23, 2026
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
            {/* Intro */}
            <section>
              <p>
                MileTrack (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Company&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services (the &quot;Service&quot;).
              </p>
            </section>

            {/* 1. Information We Collect */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                1. Information We Collect
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Trip and Mileage Data
              </h3>
              <p className="mb-2">
                The primary purpose of MileTrack is to track your vehicle trips and mileage. When you use our Service, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Trip details (date, time, distance, starting location, ending location)</li>
                <li>Mileage information</li>
                <li>Trip purpose or category (if you choose to add this)</li>
                <li>GPS coordinates and route information</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Account Information
              </h3>
              <p className="mb-2">
                To create and maintain your MileTrack account, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email address</li>
                <li>Name</li>
                <li>Account credentials (password)</li>
                <li>Profile information you voluntarily provide</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Device Information
              </h3>
              <p className="mb-2">
                We automatically collect certain information about your device when you use our Service:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Device type and model</li>
                <li>Operating system version</li>
                <li>App version</li>
                <li>Unique device identifiers</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Usage Information
              </h3>
              <p className="mb-2">
                We collect analytics data about how you interact with our Service to improve functionality:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Features you use</li>
                <li>Actions you take</li>
                <li>Error logs and crash reports</li>
              </ul>
            </section>

            {/* 2. How We Use Your Information */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-2">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Service Delivery:</strong> To provide, maintain, and improve MileTrack and its features</li>
                <li><strong>Account Management:</strong> To create and manage your account, authenticate users, and provide customer support</li>
                <li><strong>Analytics:</strong> To understand how users interact with our Service and optimize performance</li>
                <li><strong>Communication:</strong> To send you technical updates, security alerts, and customer support messages</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                <li><strong>Safety and Security:</strong> To detect and prevent fraud, security incidents, and other harmful activities</li>
                <li><strong>Marketing (with consent):</strong> To send promotional materials (only if you opt-in)</li>
              </ul>
            </section>

            {/* 3. Sharing Your Information */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                3. Sharing Your Information
              </h2>
              <p className="mb-3">
                We do not sell, trade, or rent your personal information to third parties. However, we may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Service Providers:</strong> We may share information with vendors who assist us in operating our Service (cloud hosting, analytics, payment processing)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or if we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others</li>
                <li><strong>Business Transfers:</strong> If MileTrack is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
                <li><strong>User Consent:</strong> We may share information when you explicitly consent to such sharing</li>
              </ul>
            </section>

            {/* 4. Data Retention */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                4. Data Retention
              </h2>
              <p className="mb-2">
                We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy. Specifically:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>Trip and mileage data are retained for your account lifetime, unless you request deletion</li>
                <li>Account information is retained while your account is active</li>
                <li>Deleted trips and closed accounts are purged from our active systems within 30 days</li>
                <li>Backup copies may be retained for up to 90 days for disaster recovery purposes</li>
              </ul>
              <p>
                You may request deletion of your data at any time by contacting us (see Section 10).
              </p>
            </section>

            {/* 5. Data Security */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                5. Data Security
              </h2>
              <p className="mb-2">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These include:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>End-to-end encryption for sensitive data in transit</li>
                <li>Secure authentication mechanisms</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Employee access controls and confidentiality agreements</li>
                <li>Secure data storage and backup systems</li>
              </ul>
              <p>
                While we implement safeguards, no system is completely secure. Please protect your account credentials and notify us immediately if you suspect unauthorized access.
              </p>
            </section>

            {/* 6. Your Privacy Rights */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                6. Your Privacy Rights
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                GDPR Rights (European Users)
              </h3>
              <p className="mb-2">
                If you are located in the European Union or European Economic Area, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li><strong>Right of Access:</strong> You can request a copy of your personal data</li>
                <li><strong>Right to Correction:</strong> You can request correction of inaccurate information</li>
                <li><strong>Right to Deletion:</strong> You can request deletion of your data (&quot;Right to be Forgotten&quot;)</li>
                <li><strong>Right to Data Portability:</strong> You can request your data in a portable format</li>
                <li><strong>Right to Restrict Processing:</strong> You can limit how we use your data</li>
                <li><strong>Right to Object:</strong> You can object to certain processing activities</li>
                <li><strong>Right to Lodge a Complaint:</strong> You can file a complaint with your local data protection authority</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                CCPA Rights (California Residents)
              </h3>
              <p className="mb-2">
                If you are a California resident, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li><strong>Know What Data We Collect:</strong> Request information about the categories and specific personal information we collect</li>
                <li><strong>Delete Your Data:</strong> Request deletion of personal information we collected from you</li>
                <li><strong>Opt-Out of Data Sales:</strong> Instruct us not to sell or share your personal information (MileTrack does not currently sell personal data)</li>
                <li><strong>Non-Discrimination:</strong> You will not receive discriminatory treatment for exercising your CCPA rights</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                General Rights
              </h3>
              <p className="mb-2">You may also:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Update or correct your account information at any time through the app</li>
                <li>Download your data in a standard format</li>
                <li>Opt out of marketing communications</li>
                <li>Delete your account, which will remove your data from our active systems</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the information in Section 10.
              </p>
            </section>

            {/* 7. Cookies and Tracking Technologies */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="mb-2">
                MileTrack may use cookies and similar tracking technologies to enhance your experience. Specifically:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>We use analytics cookies to understand how users interact with our Service</li>
                <li>We use session cookies to maintain your login state</li>
                <li>You can disable cookies through your device settings, though this may impact functionality</li>
              </ul>
              <p>
                We do not use tracking technologies to track your location outside the app (only within the app for trip tracking purposes you authorize).
              </p>
            </section>

            {/* 8. Third-Party Links */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                8. Third-Party Links
              </h2>
              <p>
                Our Service may contain links to third-party websites and services that are not operated by MileTrack. This Privacy Policy does not apply to third-party services, and we are not responsible for their privacy practices. We encourage you to review their privacy policies before providing personal information.
              </p>
            </section>

            {/* 9. Children's Privacy */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                9. Children&apos;s Privacy
              </h2>
              <p className="mb-2">
                MileTrack is not intended for users under the age of 13 (or the applicable minimum age in your jurisdiction). We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information and terminate the child&apos;s account.
              </p>
              <p>
                Parents or guardians who believe their child has provided information to MileTrack should contact us immediately.
              </p>
            </section>

            {/* 10. Contact Us */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                10. Contact Us
              </h2>
              <p className="mb-3">
                If you have questions about this Privacy Policy, wish to exercise your privacy rights, or have concerns about our privacy practices, please contact us:
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
                  <strong className="text-slate-200">Company Name:</strong> MileTrack
                </p>
                <p>
                  We will respond to your inquiry within 30 days or as required by applicable law.
                </p>
              </div>
            </section>

            {/* 11. Changes to This Privacy Policy */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                11. Changes to This Privacy Policy
              </h2>
              <p className="mb-2">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by updating the &quot;Last Updated&quot; date at the top of this policy. Your continued use of MileTrack following the posting of revised Privacy Policy means that you accept and agree to the changes.
              </p>
              <p>
                <strong>Note:</strong> We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
            </section>

            {/* 12. Additional Information by Jurisdiction */}
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">
                12. Additional Information by Jurisdiction
              </h2>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                European Union (GDPR)
              </h3>
              <p className="mb-2">
                Our legal basis for processing your personal information is primarily:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Performance of our contract with you (providing the Service)</li>
                <li>Your consent</li>
                <li>Compliance with legal obligations</li>
                <li>Our legitimate interests</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">
                Data Processing Addendum
              </h3>
              <p>
                For business users or those requiring a Data Processing Addendum (DPA) for GDPR compliance, please contact us.
              </p>
            </section>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400">
              <p>
                © 2026 MileTrack. All rights reserved. This Privacy Policy is effective as of February 23, 2026.
              </p>
              <p className="mt-1">
                <strong>Last Updated:</strong> February 23, 2026
              </p>
            </div>
          </div>
        </div>

        <PlFooter />
      </div>
    </div>
  );
}
