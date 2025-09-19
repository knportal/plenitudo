import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Professional Next.js App",
  description: "A professional Next.js application with automated testing and quality checks",
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
