import type { Metadata } from "next";
import { A, Bullets, LegalPage, QUITWELL_CONTACT, Section, Sub } from "../_components/LegalPage";

export const metadata: Metadata = {
  title: "QuitWell Privacy Policy | Plenitudo AI",
  description:
    "QuitWell privacy policy — your Apple Health data stays on your device. Optional AI insights share only summarized changes, and only with your permission.",
};

const LAST_UPDATED = "September 27, 2026";

export default function QuitWellPrivacyPolicyPage() {
  return (
    <LegalPage title="QuitWell Privacy Policy" lastUpdated={LAST_UPDATED}>
      <Section title="Overview">
        <p>
          QuitWell helps you see how your body responds when you quit or cut back on a habit such as smoking,
          alcohol, or cannabis. It is built by Plenitudo AI (&quot;we&quot;) around one principle: your health data
          belongs to you and stays on your device. This policy explains exactly what QuitWell reads, what it stores,
          and the one optional feature that sends anything off your device.
        </p>
      </Section>

      <Section title="Apple Health Data">
        <p className="mb-2">
          With your permission, QuitWell reads (and never writes) the following from Apple Health:
        </p>
        <Bullets
          items={[
            "Heart rate variability (SDNN)",
            "Resting heart rate",
            "Sleep analysis",
            "Respiratory rate",
            "VO₂ max",
            "Wrist temperature",
            "Blood oxygen",
          ]}
        />
        <p className="mb-2">
          These readings are used only to compare your health before and after your quit date. They are stored on
          your device and are never uploaded in raw form. In line with Apple&apos;s HealthKit rules, we never use
          Health data for advertising, marketing, or data mining, never sell it, and never store it in iCloud.
        </p>
        <p>You can change which data QuitWell can read at any time in the Health app or iOS Settings.</p>
      </Section>

      <Section title="What QuitWell Stores on Your Device">
        <Bullets
          items={[
            "The habits you track, your quit dates, and any slips or consumption you log",
            "Health readings imported from Apple Health, and the baselines and comparisons computed from them",
            "Insights generated for you",
            "Your preferences, and your AI sharing choice",
            "If you use Sign in with Apple: the anonymous Apple user identifier, and the name and email Apple provides (if you choose to share them). This stays on your device; we do not run an account server.",
          ]}
        />
        <p>
          A small summary (for example, days since your quit date) is shared with your Apple Watch and home-screen
          widget on the same device through an App Group, so they can display your progress.
        </p>
      </Section>

      <Section title="Optional AI Insights (Shared Only With Your Permission)">
        <p className="mb-2">
          QuitWell Plus can write personalized insights using Claude, an AI model made by{" "}
          <strong>Anthropic</strong>, a third-party company. Before anything is sent, QuitWell asks for your explicit
          permission. If you choose <em>Don&apos;t Allow</em>, insights are written on your device instead and nothing
          is sent.
        </p>
        <Sub>What is sent if you allow it</Sub>
        <Bullets
          items={[
            "The type of habit you're tracking (for example, \"alcohol\")",
            "Summarized changes compared with your baseline, per metric (for example, \"resting heart rate −4% over 14 days\"), and whether each change is significant",
          ]}
        />
        <Sub>What is never sent</Sub>
        <Bullets
          items={[
            "Raw Apple Health samples or exact timestamps",
            "Your name, email, Apple ID, or Sign in with Apple identifier",
            "Device identifiers, location, or contacts",
          ]}
        />
        <Sub>How it is handled</Sub>
        <Bullets
          items={[
            "The summary travels over an encrypted (HTTPS) connection to our insights server, hosted on Vercel, which forwards it to Anthropic's API and returns the written insight",
            "Our server rejects any request that contains raw samples, timestamps, or identifiers, and does not store the summaries it receives",
            <>
              Anthropic processes the summary under its commercial terms, which do not permit using API data to train
              its models. See{" "}
              <A href="https://www.anthropic.com/legal/privacy">Anthropic&apos;s Privacy Policy</A>.
            </>,
            "The summary is used only to write your insight — never for advertising or tracking",
          ]}
        />
        <p>
          You can withdraw permission at any time in QuitWell under <strong>Settings → Your Data → AI Insights</strong>.
          New insights are then written on your device.
        </p>
      </Section>

      <Section title="What We Do NOT Collect">
        <Bullets
          items={[
            "No advertising or analytics SDKs, and no tracking across apps or websites",
            "No sale or rental of any data",
            "No raw health data on our servers",
            "No location data",
          ]}
        />
      </Section>

      <Section title="Subscriptions">
        <p>
          QuitWell Plus is sold through the App Store. Apple processes all payments; we receive only the
          subscription status (active or expired) through StoreKit and never see your payment details. See{" "}
          <A href="https://www.apple.com/legal/privacy/">Apple&apos;s Privacy Policy</A>.
        </p>
      </Section>

      <Section title="Your Choices and Rights">
        <Bullets
          items={[
            <><strong>Access and export:</strong> export all your QuitWell data as a JSON file from Settings</>,
            <><strong>Deletion:</strong> &quot;Delete All My Data&quot; in Settings permanently removes everything QuitWell has stored and signs you out; deleting the app removes it too</>,
            <><strong>AI sharing:</strong> turn it on or off at any time in Settings → Your Data</>,
            <><strong>Health access:</strong> revoke it at any time in the Health app</>,
          ]}
        />
        <p>
          Because we do not keep your data on our servers, there is nothing for us to delete remotely. Depending on
          where you live (for example, under the GDPR or CCPA), you may have additional rights; contact us and we
          will help.
        </p>
      </Section>

      <Section title="Data Security">
        <Bullets
          items={[
            "Data on your device is protected by iOS data protection and device encryption",
            "AI requests use encrypted connections, and the AI service key is kept on our server, never in the app",
          ]}
        />
      </Section>

      <Section title="Medical Disclaimer">
        <p>
          QuitWell shows correlations between your habits and your biometrics. It is not a medical device and does
          not provide diagnoses or medical advice. Talk to a healthcare professional about your health.
        </p>
      </Section>

      <Section title="Children">
        <p>QuitWell is not directed to children under 13, and we do not knowingly collect data from them.</p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          If we change this policy, we will update the &quot;Last Updated&quot; date. If a change affects what is
          shared with AI providers, QuitWell will ask for your permission again before sending anything.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>
          Questions about privacy: <A href={`mailto:${QUITWELL_CONTACT}`}>{QUITWELL_CONTACT}</A> ·{" "}
          <A href="/app/quitwell/support">QuitWell Support</A>
        </p>
      </Section>
    </LegalPage>
  );
}
