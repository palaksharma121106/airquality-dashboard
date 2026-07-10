"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const INDIA_CENTER = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;

function getMarkerRadius(aqi) {
  if (aqi <= 100) return 14;
  if (aqi <= 200) return 18;
  return 22;
}

export default function CityMap({ cities = [], onGetAdvisory, className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-blue-500/30 bg-[#0d1428] text-sm text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.15)] ${className}`}
        style={{ minHeight: 420 }}
      >
        Loading map…
      </div>
    );
  }

  return (
    <div
      className={`h-[420px] overflow-hidden rounded-xl border border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.25)] ${className}`}
    >
      <MapContainer
        center={INDIA_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <CircleMarker
            key={city.name}
            center={[city.lat, city.lng]}
            radius={getMarkerRadius(city.aqi)}
            pathOptions={{
              color: city.color,
              fillColor: city.color,
              fillOpacity: 0.75,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[180px] space-y-2 rounded-xl border border-blue-500/30 bg-[#0d1428] p-3 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <p className="text-base font-bold text-white">{city.name}</p>
                <p className="text-sm text-blue-300">
                  AQI:{" "}
                  <span className="font-semibold" style={{ color: city.color }}>
                    {city.aqi}
                  </span>
                </p>
                <p className="text-xs text-blue-300">
                  Dominant pollutant: {city.dominantPollutant}
                </p>
                <button
                  type="button"
                  onClick={() => onGetAdvisory?.(city)}
                  className="mt-2 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  Get AI Advisory
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
