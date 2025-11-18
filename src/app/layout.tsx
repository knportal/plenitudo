import type { Metadata, Viewport } from "next";
import "./globals.css";
import PlHeader from "@/components/plenitudo/layout/PlHeader";
import PlBackgroundFX from "@/components/plenitudo/layout/PlBackgroundFX";

export const metadata: Metadata = {
  title: "Plenitudo AI",
  description: "AI-powered platform for intelligent solutions and automation",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0f172a", // slate-950
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-slate-950">
        <PlBackgroundFX />
        <div className="relative z-10">
          <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-sm border-b border-white/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2 sm:py-4">
              <PlHeader />
            </div>
          </div>
          <div className="pt-16 sm:pt-20">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
