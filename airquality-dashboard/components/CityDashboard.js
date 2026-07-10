"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import CitySelector from "@/components/CitySelector";
import AQICard from "@/components/AQICard";
import ForecastChart from "@/components/ForecastChart";
import SourceChart from "@/components/SourceChart";

const CityMap = dynamic(() => import("@/components/CityMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center rounded-xl bg-[#0d1428] border border-[#1e3a5f] text-sm text-blue-300">
      Loading map…
    </div>
  ),
});

async function fetchAdvisoryForCity(city) {
  const weatherResponse = await fetch(
    `/api/weather?city=${encodeURIComponent(city.name)}`
  );
  if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");
  const weather = await weatherResponse.json();

  const advisoryResponse = await fetch("/api/advisory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cityName: city.name,
      aqiValue: city.aqi,
      dominantPollutant: city.dominantPollutant,
      temperature: weather.temperature,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
    }),
  });

  if (!advisoryResponse.ok) {
    const payload = await advisoryResponse.json().catch(() => ({}));
    throw new Error(payload.error ?? "Failed to generate advisory");
  }
  return advisoryResponse.json();
}

export default function CityDashboard({ cities, CitySelector: Selector = CitySelector }) {
  const [selectedCityName, setSelectedCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [advisory, setAdvisory] = useState(null);
  const [error, setError] = useState(null);
  const [hasSelected, setHasSelected] = useState(false);

  const handleCitySelect = async (cityOrName) => {
    const city =
      typeof cityOrName === "string"
        ? cities.find((entry) => entry.name === cityOrName)
        : cityOrName;
    if (!city) return;
    setHasSelected(true);
    setSelectedCityName(city.name);
    setLoading(true);
    setError(null);
    setAdvisory(null);
    try {
      const result = await fetchAdvisoryForCity(city);
      setAdvisory({ city, ...result });
    } catch (err) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-8">

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .advisory-enter {
          animation: slideInRight 0.5s ease forwards;
        }
        .charts-enter {
          animation: slideInUp 0.6s ease 0.3s forwards;
          opacity: 0;
        }
        .map-full {
          transition: width 0.5s ease;
        }
      `}</style>

      {/* Dropdown */}
      <Selector
        cities={cities}
        selectedCity={selectedCityName}
        onChange={handleCitySelect}
      />

     {/* ROW 1 — Map + Advisory side by side */}
<div className="flex gap-4" style={{ height: "500px" }}>

  {/* LEFT — Map only */}
  <div
    className="map-full h-full"
    style={{ 
      width: hasSelected ? "55%" : "100%",
      minWidth: hasSelected ? "55%" : "100%",
    }}
  >
    <div className="rounded-xl overflow-hidden border border-[#1e3a5f] w-full h-full">
  <CityMap 
    cities={cities} 
    onGetAdvisory={handleCitySelect}
    zoom={hasSelected ? 4 : 5}
    center={hasSelected ? [22, 83] : [20.5937, 78.9629]}
  />
</div>
  </div>

        {/* RIGHT — Advisory slides in */}
        {hasSelected && (
          <div className="h-full advisory-enter" style={{ width: "45%" }}>
            {loading && (
              <div className="flex flex-col items-center justify-center h-full rounded-xl border border-[#1e3a5f] bg-[#0d1428]">
                <span className="h-10 w-10 animate-spin rounded-full border-4 border-blue-900 border-t-blue-400 mb-4" />
                <p className="text-blue-300 text-sm animate-pulse">🤖 AI analyzing air quality...</p>
                <p className="text-gray-600 text-xs mt-1">Generating health advisory...</p>
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center h-full rounded-xl border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
            {advisory && !loading && (
              <div className="h-full overflow-y-auto rounded-xl">
                <AQICard
                  cityName={advisory.city.name}
                  aqiValue={advisory.city.aqi}
                  riskLevel={advisory.riskLevel}
                  englishAdvice={advisory.englishAdvice}
                  hindiAdvice={advisory.hindiAdvice}
                  prediction24h={advisory.prediction24h}
                  mainSource={advisory.mainSource}
                />
              </div>
            )}
          </div>
        )}

        
      </div>

      {/* ROW 2 — City cards, clearly separated */}
      <div className="grid grid-cols-4 gap-2" style={{ marginTop: "8px" }}>
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => handleCitySelect(city)}
            className={`rounded-lg p-3 border text-left transition-all hover:scale-105 ${
              selectedCityName === city.name
                ? "border-blue-400 bg-[#1e3a5f]"
                : "border-[#1e3a5f] bg-[#0d1428] hover:border-blue-600"
            }`}
          >
            <p className="text-white text-xs font-bold truncate">{city.name}</p>
            <p className={`text-xl font-black ${
              city.aqi < 100 ? "text-emerald-400" :
              city.aqi < 200 ? "text-amber-400" : "text-rose-400"
            }`}>{city.aqi}</p>
            <p className="text-gray-500 text-xs">AQI</p>
          </button>
        ))}
      </div>

      {/* ROW 3 — Charts clearly below city cards */}
      {advisory && !loading && (
        <div className="grid grid-cols-2 gap-4 charts-enter" style={{ marginTop: "8px" }}>
          <div style={{ height: "380px" }}>
            <ForecastChart aqiValue={advisory.city.aqi} />
          </div>
          <div style={{ height: "380px" }}>
            <SourceChart mainSource={advisory.mainSource} />
          </div>
        </div>
      )}

    </div>
  );
}