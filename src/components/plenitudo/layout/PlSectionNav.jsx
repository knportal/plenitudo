/**
 * Clean section navigation - simple text links in top right.
 */
"use client";

import Link from "next/link";

export default function PlSectionNav() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="flex justify-end gap-6 mt-8 text-sm" aria-label="Section navigation">
      <button
        onClick={() => scrollToSection("feed-title")}
        className="text-slate-400 hover:text-emerald-300 transition-colors"
      >
        Feed
      </button>
      <button
        onClick={() => scrollToSection("rooms-title")}
        className="text-slate-400 hover:text-emerald-300 transition-colors"
      >
        Rooms
      </button>
      <button
        onClick={() => scrollToSection("prompts-title")}
        className="text-slate-400 hover:text-emerald-300 transition-colors"
      >
        Prompts
      </button>
      <Link
        href="/app"
        className="text-slate-400 hover:text-emerald-300 transition-colors"
      >
        Apps
      </Link>
    </nav>
  );
}

