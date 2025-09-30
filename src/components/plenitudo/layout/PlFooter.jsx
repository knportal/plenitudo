export default function PlFooter() {
  return (
    <footer className="border-t border-white/10 pt-8 pb-10 text-sm text-slate-400">
      <p>
        Built with intention — minimal, accessible, and a touch futuristic. ©{" "}
        {new Date().getFullYear()} Plenitudo.ai
      </p>
    </footer>
  );
}
