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
    <div className="flex h-[420px] items-center justify-center rounded-xl bg-zinc-100 text-sm text-zinc-500">
      Loading map…
    </div>
  ),
});

async function fetchAdvisoryForCity(city) {
  const weatherResponse = await fetch(
    `/api/weather?city=${encodeURIComponent(city.name)}`
  );

  if (!weatherResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }

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

  const handleCitySelect = async (cityOrName) => {
    const city =
      typeof cityOrName === "string"
        ? cities.find((entry) => entry.name === cityOrName)
        : cityOrName;

    if (!city) return;

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
    <div className="min-h-screen bg-[#0a0f1e] space-y-6">
      <Selector
        cities={cities}
        selectedCity={selectedCityName}
        onChange={handleCitySelect}
      />

      <CityMap cities={cities} onGetAdvisory={handleCitySelect} />

      {loading && (
        <div className="flex items-center justify-center gap-3 rounded-xl border border-blue-500/30 bg-[#0d1428] px-6 py-8 text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500/30 border-t-blue-400" />
          Generating AI advisory…
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-[#0d1428] px-4 py-3 text-sm text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
          {error}
        </div>
      )}

      {advisory && !loading && (
        <div className="animate-fade-in">
          <AQICard
            cityName={advisory.city.name}
            aqiValue={advisory.city.aqi}
            riskLevel={advisory.riskLevel}
            englishAdvice={advisory.englishAdvice}
            hindiAdvice={advisory.hindiAdvice}
            prediction24h={advisory.prediction24h}
            mainSource={advisory.mainSource}
          />
          <ForecastChart aqiValue={advisory.city.aqi} />
          <SourceChart mainSource={advisory.mainSource} />
        </div>
      )}
    </div>
  );
}
