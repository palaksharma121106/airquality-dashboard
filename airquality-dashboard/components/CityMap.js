"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";

const INDIA_CENTER = [20.5937, 78.9629];

function getMarkerRadius(aqi) {
  if (aqi <= 100) return 14;
  if (aqi <= 200) return 18;
  return 22;
}

function ZoomController({ zoom }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    map.setView(INDIA_CENTER, zoom, { animate: true, duration: 0.5 });
  }, [zoom, map]);
  return null;
}

export default function CityMap({ cities = [], onGetAdvisory, zoom = 5, className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-[#0d1428] border border-[#1e3a5f] text-sm text-blue-300 ${className}`}
        style={{ minHeight: 420 }}
      >
        Loading map…
      </div>
    );
  }

  return (
    <div className={`h-full w-full overflow-hidden rounded-xl border border-[#1e3a5f] shadow-lg ${className}`}>
      <MapContainer
        center={INDIA_CENTER}
        zoom={zoom}
        scrollWheelZoom
        className="h-full w-full"
      >
        <ZoomController zoom={zoom} />
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
                <p className="text-base font-bold text-white">{city.name}</p>
                <p className="text-sm text-blue-300">
                  AQI:{" "}
                  <span className="font-semibold" style={{ color: city.color }}>
                    {city.aqi}
                  </span>
                </p>
                <p className="text-xs text-blue-400">
                  Dominant pollutant: {city.dominantPollutant}
                </p>
                <button
                  type="button"
                  onClick={() => onGetAdvisory?.(city)}
                  className="mt-2 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
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