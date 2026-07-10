export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 px-6">
      <div className="relative flex h-36 w-36 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-200/30 via-sky-200/20 to-violet-200/30 blur-xl animate-spinner-pulse-ring" />

        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-emerald-500 border-r-sky-400 animate-spinner-orbit shadow-[0_0_20px_rgba(16,185,129,0.25)]" />

        <div className="absolute inset-3 rounded-full border-[3px] border-transparent border-b-amber-400 border-l-violet-500 animate-spinner-orbit-reverse shadow-[0_0_16px_rgba(139,92,246,0.2)]" />

        <div className="absolute inset-6 rounded-full border-2 border-dashed border-zinc-200/80 animate-spinner-orbit" style={{ animationDuration: "4s" }} />

        <div className="absolute inset-0 animate-spinner-dot-orbit">
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </div>

        <div
          className="absolute inset-0 animate-spinner-dot-orbit"
          style={{ animationDuration: "2.2s", animationDirection: "reverse" }}
        >
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
        </div>

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-zinc-100 animate-spinner-float">
          <span className="text-3xl" aria-hidden="true">
            🌫️
          </span>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="animate-spinner-text-shimmer text-lg font-semibold tracking-wide text-zinc-700">
          Analyzing air quality data...
        </p>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-sky-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-violet-500 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
