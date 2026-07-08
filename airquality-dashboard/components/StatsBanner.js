const STATS = [
  {
    value: "1.67M",
    label: "premature deaths annually from air pollution in India",
    emoji: "🏥",
    accent: "from-rose-500 to-orange-500",
  },
  {
    value: "24",
    suffix: " / 50",
    label: "most polluted cities are Tier 1 or 2 urban centres",
    emoji: "🏙️",
    accent: "from-amber-400 to-yellow-500",
  },
  {
    value: "900+",
    label: "CAAQMS monitoring stations across India",
    emoji: "📡",
    accent: "from-sky-400 to-blue-500",
  },
];

export default function StatsBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-950 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-zinc-700/60">
        {STATS.map((stat) => (
          <div
            key={stat.value + stat.label}
            className="group relative flex items-start gap-4 rounded-xl px-5 py-4 transition-all duration-300 md:rounded-none md:px-8 md:py-2 md:first:pl-0 md:last:pr-0"
          >
            <div
              className={`absolute inset-x-5 top-0 h-0.5 rounded-full bg-gradient-to-r opacity-80 md:inset-x-8 ${stat.accent}`}
            />

            <span
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-lg ring-1 ring-zinc-700 transition-all duration-300 group-hover:bg-zinc-700 group-hover:ring-zinc-600"
              aria-hidden="true"
            >
              {stat.emoji}
            </span>

            <div className="min-w-0">
              <p className="flex items-baseline gap-1 font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {stat.value}
                {stat.suffix && (
                  <span className="text-lg font-semibold text-zinc-400 sm:text-xl">
                    {stat.suffix}
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm leading-snug text-zinc-400 sm:text-[0.9rem]">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
