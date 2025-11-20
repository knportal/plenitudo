import PlFooter from "./layout/PlFooter";
import PlHero from "./sections/PlHero";
import PlFeed from "./sections/PlFeed";
import PlRooms from "./sections/PlRooms";
import PlPrompts from "./sections/PlPrompts";

export default function PlenitudoMVP() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        <PlHero />
        <PlFeed />
        <PlRooms />
        <PlPrompts />
        <PlFooter />
      </div>
      {/* Local utility styles (keep once globally or inline here) */}
      <style>{`
        .card-glow { position: relative; }
        .card-glow::before { content:""; position:absolute; inset:-1px; border-radius:1rem; background: radial-gradient(60% 60% at 30% 10%, rgba(16,185,129,.35), transparent 60%), radial-gradient(50% 50% at 90% 10%, rgba(59,130,246,.25), transparent 60%); filter: blur(18px); opacity:0; transition: opacity .3s ease; z-index:-1; }
        .card-glow:hover::before, .card-glow:focus-within::before { opacity:1; }
        .btn-ghost { display:inline-flex; align-items:center; justify-content:center; gap:.5rem; padding:.5rem .625rem; border-radius:.75rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); min-height: 44px; font-size: .875rem; cursor:pointer; text-decoration:none; }
        @media (min-width: 640px) { .btn-ghost { padding:.375rem .5rem; } }
        .btn-ghost:hover { background: rgba(16,185,129,0.08); border-color: rgba(16,185,129,0.45); }
        .animate-pulse-slow { animation: pulse-slow 2.4s ease-in-out infinite; }
        @keyframes pulse-slow { 0%,100%{ transform: scale(1); opacity:.8 } 50%{ transform: scale(1.15); opacity:1 } }
      `}</style>
    </div>
  );
}
