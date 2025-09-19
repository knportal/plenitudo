import LogoMark from "../LogoMark";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <a
        href="#"
        className="flex items-center gap-2 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-1 -mx-1"
      >
        <LogoMark />
        <span className="sr-only">Plenitudo.ai Home</span>
      </a>
      <nav aria-label="Primary" className="flex items-center gap-2">
        <a className="navlink" href="#feed-title">
          Feed
        </a>
        <a className="navlink" href="#rooms-title">
          Rooms
        </a>
        <a className="navlink" href="#prompts-title">
          Prompts
        </a>
        <a className="cta" href="#">
          Join beta
        </a>
      </nav>
      <style>{`
        .navlink { padding:.5rem .75rem; border-radius:.75rem; font-size:.875rem; color: rgba(255,255,255,0.8); }
        .navlink:hover, .navlink:focus { outline:none; background:rgba(255,255,255,0.06); color:white }
        .cta { padding:.5rem .9rem; border-radius:.9rem; font-weight:600; font-size:.875rem; background:linear-gradient(90deg, #34d39933, #60a5fa33); border:1px solid rgba(255,255,255,0.1); }
        .cta:hover, .cta:focus{ outline:none; border-color: rgba(16,185,129,0.6) }
      `}</style>
    </header>
  );
}
