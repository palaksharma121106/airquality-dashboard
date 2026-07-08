function getAqiColor(aqiValue) {
  if (aqiValue < 100) return "text-green-600";
  if (aqiValue <= 200) return "text-orange-500";
  return "text-red-600";
}

function getRiskBadgeStyles(riskLevel) {
  switch (riskLevel) {
    case "Safe":
      return "bg-green-100 text-green-800 border-green-200";
    case "Moderate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Dangerous":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Very Dangerous":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-zinc-100 text-zinc-800 border-zinc-200";
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
  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
        {cityName}
      </h2>

      <p className={`mt-2 text-6xl font-bold tabular-nums ${getAqiColor(aqiValue)}`}>
        {aqiValue}
      </p>
      <p className="mt-1 text-sm font-medium uppercase tracking-wide text-zinc-500">
        Air Quality Index
      </p>

      <span
        className={`mt-4 inline-block rounded-full border px-4 py-1.5 text-sm font-semibold ${getRiskBadgeStyles(riskLevel)}`}
      >
        {riskLevel}
      </span>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Health Advisory
        </h3>
        <p className="mt-2 text-base leading-relaxed text-zinc-800">
          {englishAdvice}
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-base leading-relaxed text-zinc-800">{hindiAdvice}</p>
      </div>

      <p className="mt-6 text-sm text-zinc-600">
        <span className="font-medium text-zinc-900">
          Predicted AQI in 24 hours:
        </span>{" "}
        {prediction24h}
      </p>

      <p className="mt-2 text-sm text-zinc-600">
        <span className="font-medium text-zinc-900">Main Pollution Source:</span>{" "}
        {mainSource}
      </p>
    </div>
  );
}
