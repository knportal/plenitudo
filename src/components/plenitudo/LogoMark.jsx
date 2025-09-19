export default function LogoMark() {
  return (
    <div className="relative w-8 h-8" aria-hidden>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/80 to-sky-400/80 blur-[6px]" />
      <div className="relative rounded-xl w-full h-full grid place-items-center bg-slate-900/80 ring-1 ring-white/10">
        <div className="w-4 h-4 border border-emerald-300/70 rotate-45" />
      </div>
    </div>
  );
}
