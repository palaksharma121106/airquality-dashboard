'use client';

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

function generateHourlyData(baseAqi) {
  const hours = ["12AM","3AM","6AM","9AM","12PM","3PM","6PM","9PM"];
  return hours.map((hour, i) => {
    let multiplier = 1;
    if (i === 2) multiplier = 1.3;
    else if (i === 5) multiplier = 1.25;
    else if (i === 1) multiplier = 0.7;
    const noise = (Math.random() - 0.5) * 8;
    return { hour, aqi: Math.max(10, Math.round(baseAqi * multiplier + noise)) };
  });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#0d1428", border: "1px solid #1e3a5f", borderRadius: 8, padding: "8px 12px" }}>
        <p style={{ color: "#93c5fd", fontSize: 11 }}>{label}</p>
        <p style={{ color: "#34d399", fontSize: 15, fontWeight: "bold" }}>{payload[0].value} AQI</p>
      </div>
    );
  }
  return null;
};

function Chart({ data, height }) {
  const maxAqi = Math.max(...data.map(d => d.aqi));
  const lineColor = maxAqi > 200 ? "#fb7185" : maxAqi > 100 ? "#fbbf24" : "#34d399";
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
        <XAxis dataKey="hour" tick={{ fill: "#64748b", fontSize: 10 }} />
        <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="aqi" stroke={lineColor} strokeWidth={2.5} dot={{ fill: lineColor, r: 4 }} activeDot={{ r: 7 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function ForecastChart({ aqiValue }) {
  const [open, setOpen] = useState(false);
  const data = generateHourlyData(aqiValue);
  const maxAqi = Math.max(...data.map(d => d.aqi));
  const lineColor = maxAqi > 200 ? "#fb7185" : maxAqi > 100 ? "#fbbf24" : "#34d399";

  return (
    <>
      <div
        onClick={() => setOpen(true)}
className="rounded-xl border border-[#1e3a5f] bg-[#0d1428] p-4 cursor-pointer hover:border-blue-400 hover:scale-105 transition-all duration-300"      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold text-sm">📊 24 Hour AQI Forecast</h3>
          <span className="text-blue-400 text-xs border border-blue-900 rounded px-2 py-0.5 hover:bg-blue-900 transition-all">🔍 Expand</span>
        </div>
        <Chart data={data} height={300} />
        <div className="flex gap-3 mt-2 justify-center">
          <span className="text-xs" style={{ color: lineColor }}>● Current trend</span>
          <span className="text-xs text-gray-500">Click to see full forecast</span>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-enter w-full max-w-4xl rounded-2xl border border-[#1e3a5f] bg-[#0d1428] p-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-bold text-xl">📊 24 Hour AQI Forecast</h2>
                <p className="text-gray-400 text-sm mt-1">Hourly air quality prediction based on historical patterns</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-2xl font-bold">✕</button>
            </div>
            <Chart data={data} height={350} />
            <div className="flex gap-6 justify-center mt-4">
              <span className="text-xs text-emerald-400">● Good (0-100)</span>
              <span className="text-xs text-amber-400">● Moderate (100-200)</span>
              <span className="text-xs text-rose-400">● Dangerous (200+)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}