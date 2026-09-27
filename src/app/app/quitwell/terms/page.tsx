import type { Metadata } from "next";
import { A, Bullets, LegalPage, QUITWELL_CONTACT, Section, Sub } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "QuitWell Terms of Use | Plenitudo AI",
  description: "Terms of Use for QuitWell, including subscription terms and medical disclaimer.",
};

const LAST_UPDATED = "September 27, 2026";
const APPLE_EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

export default function QuitWellTermsPage() {
  return (
    <LegalPage title="QuitWell Terms of Use" lastUpdated={LAST_UPDATED}>
      <Section title="1. Agreement">
        <p>
          These Terms govern your use of the QuitWell app for iPhone and Apple Watch (&quot;the App&quot;), provided by
          Plenitudo AI (&quot;we&quot;). By using the App you agree to these Terms and to Apple&apos;s{" "}
          <A href={APPLE_EULA}>Licensed Application End User License Agreement</A> (the &quot;Apple EULA&quot;). If
          these Terms and the Apple EULA conflict, these Terms apply to the extent permitted.
        </p>
      </Section>

      <Section title="2. Not Medical Advice">
        <p className="mb-2">
          <strong>
            QuitWell is not a medical device and does not diagnose, treat, cure, or prevent any condition.
          </strong>{" "}
          It shows correlations between your habits and data from Apple Health. Insights, including AI-written ones,
          are informational and may be incomplete or wrong.
        </p>
        <Bullets
          items={[
            "Do not use QuitWell to make medical decisions; consult a qualified healthcare professional",
            "Quitting some substances, such as alcohol, can cause dangerous withdrawal — seek medical advice before stopping",
            "If you think you are having a medical emergency, call your local emergency number",
          ]}
        />
      </Section>

      <Section title="3. License and Acceptable Use">
        <p>
          We grant you a personal, non-transferable license to use the App on Apple devices you own or control, as
          set out in the Apple EULA. Do not reverse engineer, resell, or misuse the App or its insights service.
        </p>
      </Section>

      <Section title="4. Subscriptions">
        <Sub>Free and QuitWell Plus</Sub>
        <p className="mb-3">
          Core tracking is free. QuitWell Plus unlocks additional metrics, longer history, AI insights,
          forecasts, and share cards. QuitWell Plus is offered as an auto-renewable subscription, monthly or yearly, with
          the price shown in the App before you buy. Offers such as free trials are shown in the App when you are
          eligible.
        </p>
        <Sub>Subscription terms</Sub>
        <Bullets
          items={[
            "Payment is charged to your Apple ID account when you confirm the purchase (or when a free trial ends)",
            "Subscriptions renew automatically unless canceled at least 24 hours before the end of the current period",
            "Your account is charged for renewal within 24 hours before the end of the current period",
            "You can manage or cancel your subscription in your Apple ID account settings; canceling stops future renewals",
            "Any unused portion of a free trial is forfeited when you purchase a subscription",
            "Refunds are handled by Apple under its policies",
          ]}
        />
      </Section>

      <Section title="5. Your Data">
        <p>
          Your Apple Health data stays on your device. AI insights send summarized changes to Anthropic only if you
          give permission in the App. See the <A href="/app/quitwell/privacy-policy">QuitWell Privacy Policy</A> for
          details.
        </p>
      </Section>

      <Section title="6. Third-Party Services">
        <p>
          The App relies on Apple services (HealthKit, StoreKit, Sign in with Apple) and, if you allow it,
          Anthropic&apos;s Claude API for AI insights. Those services are governed by their own terms, and we are not
          responsible for them.
        </p>
      </Section>

      <Section title="7. Disclaimer of Warranties">
        <p>
          The App is provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any kind, to the
          extent permitted by law. We do not guarantee that readings, comparisons, or insights are accurate or
          complete, or that the App will be uninterrupted.
        </p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>
          To the extent permitted by law, Plenitudo AI is not liable for indirect, incidental, or consequential
          damages, or for decisions you make based on the App. Our total liability is limited to the amount you paid
          for the App in the 12 months before the claim.
        </p>
      </Section>

      <Section title="9. Changes and Termination">
        <p>
          We may update these Terms and will change the &quot;Last Updated&quot; date when we do; continued use means
          you accept the updated Terms. You may stop using the App at any time by deleting it.
        </p>
      </Section>

      <Section title="10. Governing Law">
        <p>
          These Terms are governed by the laws of the State of California, United States, without regard to conflict
          of law principles, except where the law of your country of residence requires otherwise.
        </p>
      </Section>

      <Section title="11. Contact">
        <p>
          Questions about these Terms: <A href={`mailto:${QUITWELL_CONTACT}`}>{QUITWELL_CONTACT}</A>
        </p>
      </Section>
    </LegalPage>
  );
}
