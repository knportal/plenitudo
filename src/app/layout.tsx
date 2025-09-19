import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plenitudo AI",
  description: "AI-powered platform for intelligent solutions and automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
