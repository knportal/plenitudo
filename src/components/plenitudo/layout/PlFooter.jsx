import Link from "next/link";
import PlXIcon from "../icons/PlXIcon";

export default function PlFooter() {
  return (
    <footer className="border-t border-white/10 pt-6 sm:pt-8 pb-6 sm:pb-10 text-xs sm:text-sm text-slate-400">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          Built with intention — minimal, accessible, and a touch futuristic. ©{" "}
          {new Date().getFullYear()} Plenitudo.ai
        </p>
        <Link
          href="https://x.com/PlenitudoAI"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1"
          aria-label="Follow Plenitudo AI on X (formerly Twitter)"
        >
          <PlXIcon className="size-4 sm:size-5" />
          <span className="hidden sm:inline">@PlenitudoAI</span>
        </Link>
      </div>
    </footer>
  );
}
