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
        className={`flex items-center justify-center rounded-xl bg-zinc-100 text-sm text-zinc-500 ${className}`}
        style={{ minHeight: 420 }}
      >
        Loading map…
      </div>
    );
  }

  return (
    <div
      className={`h-[420px] overflow-hidden rounded-xl border border-zinc-200 shadow-sm ${className}`}
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
              <div className="min-w-[180px] space-y-2 p-1">
                <p className="text-base font-bold text-zinc-900">{city.name}</p>
                <p className="text-sm text-zinc-600">
                  AQI:{" "}
                  <span className="font-semibold" style={{ color: city.color }}>
                    {city.aqi}
                  </span>
                </p>
                <p className="text-xs text-zinc-500">
                  Dominant pollutant: {city.dominantPollutant}
                </p>
                <button
                  type="button"
                  onClick={() => onGetAdvisory?.(city)}
                  className="mt-2 w-full rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
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
