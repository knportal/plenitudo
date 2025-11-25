"use client";

import Link from "next/link";

interface SubstackCTAProps {
  variant?: "button" | "link" | "banner";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
}

/**
 * Reusable Substack CTA component with UTM tracking
 * Usage:
 * - <SubstackCTA variant="button" /> - Button style
 * - <SubstackCTA variant="link" /> - Link style
 * - <SubstackCTA variant="banner" /> - Banner style
 */
export default function SubstackCTA({
  variant = "button",
  size = "md",
  className = "",
  showIcon = true,
}: SubstackCTAProps) {
  const substackUrl = process.env.NEXT_PUBLIC_SUBSTACK_URL || "#";

  // Add UTM parameters for tracking
  const getSubstackUrl = (campaign: string) => {
    if (!substackUrl || substackUrl === "#") return "#";
    const url = new URL(substackUrl);
    url.searchParams.set("utm_source", "plenitudo_app");
    url.searchParams.set("utm_medium", "web");
    url.searchParams.set("utm_campaign", campaign);
    return url.toString();
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  if (variant === "banner") {
    return (
      <div
        className={`bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-xl p-4 sm:p-6 ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">
              Get Weekly AI Insights
            </h3>
            <p className="text-sm text-slate-300">
              Join our Substack newsletter for curated AI news and exclusive
              community discussions.
            </p>
          </div>
          <a
            href={getSubstackUrl("banner_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:from-emerald-400 hover:to-blue-400 transition-all min-h-[44px] whitespace-nowrap"
          >
            {showIcon && "📰 "}
            Subscribe →
          </a>
        </div>
      </div>
    );
  }

  if (variant === "link") {
    return (
      <a
        href={getSubstackUrl("link_cta")}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors ${sizeClasses[size]} ${className}`}
      >
        {showIcon && "📰 "}
        Subscribe to Newsletter
      </a>
    );
  }

  // Default: button variant
  return (
    <a
      href={getSubstackUrl("button_cta")}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:from-emerald-400 hover:to-blue-400 transition-all min-h-[44px] ${sizeClasses[size]} ${className}`}
    >
      {showIcon && "📰 "}
      Subscribe
    </a>
  );
}


