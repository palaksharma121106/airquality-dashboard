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
        className="w-full rounded-xl border border-[#1e3a5f] bg-[#0d1428] px-4 py-3 text-base font-medium text-white shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="" disabled className="bg-[#0d1428] text-blue-300">
          Choose a city
        </option>
        {cities.map((city) => (
          <option key={city.name} value={city.name} className="bg-[#0d1428] text-white">
            {city.name} — AQI {city.aqi}
          </option>
        ))}
      </select>
    </div>
  );
}
