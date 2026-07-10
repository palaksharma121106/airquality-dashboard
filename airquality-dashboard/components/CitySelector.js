"use client";

export default function CitySelector({
  cities = [],
  selectedCity,
  onChange,
  className = "",
  label = "Select a city",
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor="city-selector" className="text-sm font-semibold text-blue-300">
        {label}
      </label>
      <select
        id="city-selector"
        value={selectedCity ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        className="w-full rounded-xl border border-blue-500/30 bg-[#0d1428] px-4 py-3 text-base font-medium text-white shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="" disabled className="text-zinc-500">
          Choose a city
        </option>
        {cities.map((city) => (
          <option key={city.name} value={city.name} className="text-zinc-900">
            {city.name} — AQI {city.aqi}
          </option>
        ))}
      </select>
    </div>
  );
}
