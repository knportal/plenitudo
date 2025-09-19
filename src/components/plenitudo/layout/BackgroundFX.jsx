export default function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      <div className="absolute -top-32 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-500 to-sky-500" />
      <div className="absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-fuchsia-500 to-amber-400" />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
