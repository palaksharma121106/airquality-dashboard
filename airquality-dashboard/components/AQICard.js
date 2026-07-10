function getAqiStyles(aqiValue) {
  if (aqiValue < 100) {
    return {
      text: "text-emerald-400",
      glow: "from-emerald-950/50 to-teal-950/50",
      ring: "ring-emerald-900/50",
      accent: "bg-emerald-500",
      glowColor: "#34d399",
    };
  }
  if (aqiValue <= 200) {
    return {
      text: "text-amber-400",
      glow: "from-amber-950/50 to-orange-950/50",
      ring: "ring-amber-900/50",
      accent: "bg-amber-500",
      glowColor: "#fbbf24",
    };
  }
  return {
    text: "text-rose-400",
    glow: "from-rose-950/50 to-red-950/50",
    ring: "ring-rose-900/50",
    accent: "bg-rose-500",
    glowColor: "#fb7185",
  };
}

function getRiskBadgeStyles(riskLevel) {
  switch (riskLevel) {
    case "Safe":
      return {
        classes: "bg-emerald-950/50 text-emerald-300 border-emerald-700 text-lg px-6 py-3",
        emoji: "✅",
      };
    case "Moderate":
      return {
        classes: "bg-amber-950/50 text-amber-300 border-amber-700 text-lg px-6 py-3",
        emoji: "⚠️",
      };
    case "Dangerous":
      return {
        classes: "bg-orange-950/50 text-orange-300 border-orange-700 text-lg px-6 py-3",
        emoji: "🔶",
      };
    case "Very Dangerous":
      return {
        classes: "bg-rose-950/50 text-rose-300 border-rose-700 text-lg px-6 py-3",
        emoji: "🚨",
      };
    default:
      return {
        classes: "bg-zinc-900/50 text-zinc-300 border-zinc-700 text-lg px-6 py-3",
        emoji: "ℹ️",
      };
  }
}

function getSourceEmoji(mainSource) {
  switch (mainSource) {
    case "Vehicles":
      return "🚗";
    case "Industries":
      return "🏭";
    case "Construction":
      return "🏗️";
    case "Crop Burning":
      return "🌾";
    default:
      return "💨";
  }
}

export default function AQICard({
  cityName,
  aqiValue,
  riskLevel,
  englishAdvice,
  hindiAdvice,
  prediction24h,
  mainSource,
}) {
  const aqiStyles = getAqiStyles(aqiValue);
  const riskBadge = getRiskBadgeStyles(riskLevel);

  return (
    <div className="group w-full max-w-md overflow-hidden rounded-2xl border border-[#1e3a5f] bg-[#0d1428] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in">
      <div className={`h-1.5 ${aqiStyles.accent} transition-colors duration-300`} />

      <div className="space-y-6 p-8">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
            <span className="text-xl" aria-hidden="true">
              📍
            </span>
            {cityName}
          </h2>
        </div>

        <div
          className={`rounded-2xl bg-gradient-to-br p-6 ring-1 ${aqiStyles.glow} ${aqiStyles.ring} transition-all duration-300`}
        >
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-blue-300">
            <span aria-hidden="true">🌫️</span>
            Air Quality Index
          </p>
          <p
            className={`mt-2 text-7xl font-bold tabular-nums transition-colors duration-300 ${aqiStyles.text} glow-text`}
            style={{ color: aqiStyles.glowColor }}
          >
            {aqiValue}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-lg font-bold shadow-sm transition-all duration-300 ${riskBadge.classes}`}
        >
          <span aria-hidden="true">{riskBadge.emoji}</span>
          {riskLevel}
        </span>

        <div className="space-y-4">
          <div className="rounded-xl border border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-sky-950/30 p-5 shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in animate-fade-in-delay-1">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-300">
              <span aria-hidden="true">🏥</span>
              Health Advisory
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white">
              {englishAdvice}
            </p>
          </div>

          <div className="rounded-xl border border-violet-900/50 bg-gradient-to-br from-violet-950/30 to-purple-950/30 p-5 shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in animate-fade-in-delay-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-violet-300">
              <span aria-hidden="true">🇮🇳</span>
              Hindi Advisory
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white">
              {hindiAdvice}
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-blue-900/30 pt-5">
          <p className="flex items-center gap-2 text-sm text-blue-300 transition-colors duration-300">
            <span className="text-base" aria-hidden="true">
              📈
            </span>
            <span className="font-semibold text-white">
              Predicted AQI in 24 hours:
            </span>
            <span className="font-bold text-blue-300">{prediction24h}</span>
          </p>

          <p className="flex items-center gap-2 text-sm text-blue-300 transition-colors duration-300">
            <span className="text-base" aria-hidden="true">
              {getSourceEmoji(mainSource)}
            </span>
            <span className="font-semibold text-white">
              Main Pollution Source:
            </span>
            <span className="font-bold text-blue-300">{mainSource}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
