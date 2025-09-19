import Header from "./layout/Header";
import Footer from "./layout/Footer";
import BackgroundFX from "./layout/BackgroundFX";
import Hero from "./sections/Hero";
import Feed from "./sections/Feed";
import Rooms from "./sections/Rooms";
import Prompts from "./sections/Prompts";

export default function PlenitudoMVP() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <BackgroundFX />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <Header />
        <Hero />
        <Feed />
        <Rooms />
        <Prompts />
        <Footer />
      </div>
      {/* Local utility styles (keep once globally or inline here) */}
      <style>{`
        .card-glow { position: relative; }
        .card-glow::before { content:""; position:absolute; inset:-1px; border-radius:1rem; background: radial-gradient(60% 60% at 30% 10%, rgba(16,185,129,.35), transparent 60%), radial-gradient(50% 50% at 90% 10%, rgba(59,130,246,.25), transparent 60%); filter: blur(18px); opacity:0; transition: opacity .3s ease; z-index:-1; }
        .card-glow:hover::before, .card-glow:focus-within::before { opacity:1; }
        .btn-ghost { display:inline-flex; align-items:center; gap:.5rem; padding:.375rem .5rem; border-radius:.75rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); }
        .btn-ghost:hover { background: rgba(16,185,129,0.08); border-color: rgba(16,185,129,0.45); }
        .animate-pulse-slow { animation: pulse-slow 2.4s ease-in-out infinite; }
        @keyframes pulse-slow { 0%,100%{ transform: scale(1); opacity:.8 } 50%{ transform: scale(1.15); opacity:1 } }
      `}</style>
    </div>
  );
}
