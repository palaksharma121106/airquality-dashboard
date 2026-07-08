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
      <label htmlFor="city-selector" className="text-sm font-semibold text-zinc-700">
        {label}
      </label>
      <select
        id="city-selector"
        value={selectedCity ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base font-medium text-zinc-900 shadow-sm transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
      >
        <option value="" disabled>
          Choose a city
        </option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} — AQI {city.aqi}
          </option>
        ))}
      </select>
    </div>
  );
}
