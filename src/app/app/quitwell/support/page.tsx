import type { Metadata } from "next";
import { A, Bullets, LegalPage, QUITWELL_CONTACT, Section } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "QuitWell Support | Plenitudo AI",
  description: "Get help with QuitWell: Apple Health access, Apple Watch, subscriptions, AI insights, and your data.",
};

export default function QuitWellSupportPage() {
  return (
    <LegalPage title="QuitWell Support">
      <Section title="Contact">
        <p>
          Email <A href={`mailto:${QUITWELL_CONTACT}`}>{QUITWELL_CONTACT}</A>. We respond within 48 hours.
        </p>
      </Section>

      <Section title="My metrics are empty">
        <Bullets
          items={[
            "QuitWell needs data in Apple Health. Most metrics come from an Apple Watch worn during the day and overnight",
            "Check access in the Health app → your profile → Apps → QuitWell, and turn on all categories",
            "Comparisons need a few days of readings from before and after your quit date",
          ]}
        />
      </Section>

      <Section title="Apple Watch">
        <p>
          The Watch app installs with the iPhone app (Watch app → Available Apps if it doesn&apos;t appear). It shows
          progress sent from your iPhone and lets you log a slip from your wrist.
        </p>
      </Section>

      <Section title="Subscriptions">
        <Bullets
          items={[
            "Restore a purchase: Settings → Restore Purchases in QuitWell",
            "Manage or cancel: iOS Settings → your name → Subscriptions",
            "Refunds are handled by Apple at reportaproblem.apple.com",
          ]}
        />
      </Section>

      <Section title="AI insights and your data">
        <Bullets
          items={[
            "AI insights are shared with Anthropic only if you allow it; change this in Settings → Your Data",
            "Export or delete all your data from Settings in QuitWell",
            <>
              Details: <A href="/app/quitwell/privacy-policy">Privacy Policy</A> ·{" "}
              <A href="/app/quitwell/terms">Terms of Use</A>
            </>,
          ]}
        />
      </Section>

      <Section title="Medical disclaimer">
        <p>QuitWell is not a medical device and does not provide medical advice.</p>
      </Section>
    </LegalPage>
  );
}
