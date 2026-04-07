import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MileTrack — Automatic Mileage Tracking for iPhone | Tax Season 2026",
  description:
    "Track business miles automatically. IRS-ready reports at $0.725/mile. Download free before the April 15 deadline.",
  openGraph: {
    title: "MileTrack — Don't Leave Tax Deductions on the Road",
    description:
      "Automatic mileage tracking for iPhone. IRS-ready reports at $0.725/mile. Free download — start tracking before April 15.",
    url: "https://plenitudo.ai/miletrack",
    siteName: "Plenitudo AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MileTrack — Don't Leave Tax Deductions on the Road",
    description:
      "Automatic mileage tracking for iPhone. IRS-ready reports at $0.725/mile. Free download — start tracking before April 15.",
  },
};

export default function MileTrackLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
