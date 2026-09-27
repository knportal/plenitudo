import type { ReactNode } from "react";
import Link from "next/link";
import PlFooter from "@/components/plenitudo/layout/PlFooter";

// Shared layout for QuitWell's legal/support pages — same styling as the MileTrack pages.

export const QUITWELL_CONTACT = "hello@plenitudo.ai";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
            <Link
              href="/app"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to Apps
            </Link>
          </div>
          {lastUpdated && (
            <p className="text-xs sm:text-sm text-slate-400">
              <strong>Last Updated:</strong> {lastUpdated}
            </p>
          )}
        </div>
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">{children}</div>
        </div>
        <PlFooter />
      </div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3">{title}</h2>
      {children}
    </section>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return <h3 className="text-base sm:text-lg font-semibold text-slate-200 mt-4 mb-2">{children}</h3>;
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const className = "text-emerald-400 hover:text-emerald-300 underline underline-offset-2";
  return external ? (
    <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
