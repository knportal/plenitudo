import Link from "next/link";
import PlLogoMark from "@/components/plenitudo/PlLogoMark";

export default function SubstackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <PlLogoMark size="lg" />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Join Our Newsletter
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto">
              Get weekly AI insights, curated news, and exclusive access to our
              community discussions.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-800/50 ring-1 ring-white/10">
              <div className="text-emerald-400 text-2xl mb-2">📰</div>
              <h3 className="font-semibold mb-1">Weekly AI Digest</h3>
              <p className="text-sm text-slate-300">
                Curated top AI breakthroughs from our AI Daily feed
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 ring-1 ring-white/10">
              <div className="text-emerald-400 text-2xl mb-2">💬</div>
              <h3 className="font-semibold mb-1">Community Access</h3>
              <p className="text-sm text-slate-300">
                Join discussions in our AI Rooms and chat with the community
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 ring-1 ring-white/10">
              <div className="text-emerald-400 text-2xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Exclusive Content</h3>
              <p className="text-sm text-slate-300">
                Paid subscribers get early access and exclusive rooms
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 ring-1 ring-white/10">
              <div className="text-emerald-400 text-2xl mb-2">🚀</div>
              <h3 className="font-semibold mb-1">Stay Updated</h3>
              <p className="text-sm text-slate-300">
                Be first to know about new features and product updates
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={process.env["NEXT_PUBLIC_SUBSTACK_URL"] || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:from-emerald-400 hover:to-blue-400 transition-all min-h-[44px] text-base"
            >
              Subscribe on Substack →
            </a>
            <Link
              href="/rooms/ai"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-slate-800/60 ring-1 ring-white/10 text-white font-medium hover:bg-slate-800 transition-all min-h-[44px] text-base"
            >
              Explore AI Rooms
            </Link>
          </div>

          {/* Info */}
          <p className="text-sm text-slate-400">
            Free newsletter available. Paid tiers unlock exclusive content and
            early access.
          </p>
        </div>
      </div>
    </div>
  );
}
