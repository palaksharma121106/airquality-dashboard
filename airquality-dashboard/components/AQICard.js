function getAqiStyles(aqiValue) {
  if (aqiValue < 100) {
    return {
      text: "text-emerald-600",
      glow: "from-emerald-50 to-teal-50",
      ring: "ring-emerald-100",
      accent: "bg-emerald-500",
    };
  }
  if (aqiValue <= 200) {
    return {
      text: "text-amber-500",
      glow: "from-amber-50 to-orange-50",
      ring: "ring-amber-100",
      accent: "bg-amber-500",
    };
  }
  return {
    text: "text-rose-600",
    glow: "from-rose-50 to-red-50",
    ring: "ring-rose-100",
    accent: "bg-rose-500",
  };
}

function getRiskBadgeStyles(riskLevel) {
  switch (riskLevel) {
    case "Safe":
      return {
        classes: "bg-emerald-100 text-emerald-800 border-emerald-200",
        emoji: "✅",
      };
    case "Moderate":
      return {
        classes: "bg-amber-100 text-amber-800 border-amber-200",
        emoji: "⚠️",
      };
    case "Dangerous":
      return {
        classes: "bg-orange-100 text-orange-800 border-orange-200",
        emoji: "🔶",
      };
    case "Very Dangerous":
      return {
        classes: "bg-rose-100 text-rose-800 border-rose-200",
        emoji: "🚨",
      };
    default:
      return {
        classes: "bg-zinc-100 text-zinc-800 border-zinc-200",
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
    <div className="group w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`h-1.5 ${aqiStyles.accent} transition-colors duration-300`} />

      <div className="space-y-6 p-8">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900">
            <span className="text-xl" aria-hidden="true">
              📍
            </span>
            {cityName}
          </h2>
        </div>

        <div
          className={`rounded-2xl bg-gradient-to-br p-6 ring-1 ${aqiStyles.glow} ${aqiStyles.ring} transition-all duration-300`}
        >
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            <span aria-hidden="true">🌫️</span>
            Air Quality Index
          </p>
          <p
            className={`mt-2 text-7xl font-bold tabular-nums transition-colors duration-300 ${aqiStyles.text}`}
          >
            {aqiValue}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-300 ${riskBadge.classes}`}
        >
          <span aria-hidden="true">{riskBadge.emoji}</span>
          {riskLevel}
        </span>

        <div className="space-y-4">
          <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50 p-5 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-700">
              <span aria-hidden="true">🏥</span>
              Health Advisory
            </h3>
            <p className="mt-3 text-base leading-relaxed text-zinc-800">
              {englishAdvice}
            </p>
          </div>

          <div className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-purple-50 p-5 shadow-sm transition-all duration-300 hover:shadow-md">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-violet-700">
              <span aria-hidden="true">🇮🇳</span>
              Hindi Advisory
            </h3>
            <p className="mt-3 text-base leading-relaxed text-zinc-800">
              {hindiAdvice}
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-zinc-100 pt-5">
          <p className="flex items-center gap-2 text-sm text-zinc-600 transition-colors duration-300">
            <span className="text-base" aria-hidden="true">
              📈
            </span>
            <span className="font-semibold text-zinc-900">
              Predicted AQI in 24 hours:
            </span>
            <span className="font-bold text-zinc-800">{prediction24h}</span>
          </p>

          <p className="flex items-center gap-2 text-sm text-zinc-600 transition-colors duration-300">
            <span className="text-base" aria-hidden="true">
              {getSourceEmoji(mainSource)}
            </span>
            <span className="font-semibold text-zinc-900">
              Main Pollution Source:
            </span>
            <span className="font-bold text-zinc-800">{mainSource}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
