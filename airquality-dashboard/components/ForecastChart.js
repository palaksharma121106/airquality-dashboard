"use client";

import { useMemo } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

function formatHourLabel(hour) {
  if (hour === 0 || hour === 24) return "12AM";
  if (hour === 12) return "12PM";
  if (hour < 12) return `${hour}AM`;
  return `${hour - 12}PM`;
}

function getRushHourMultiplier(hour) {
  if (hour >= 7 && hour <= 9) return 1.28;
  if (hour >= 17 && hour <= 20) return 1.32;
  if (hour >= 0 && hour <= 5) return 0.72;
  if (hour >= 22) return 0.82;
  if (hour >= 10 && hour <= 16) return 1.05;
  return 0.95;
}

function generateHourlyAqi(baseAqi) {
  return Array.from({ length: 24 }, (_, hour) => {
    const wave = 1 + Math.sin((hour / 24) * Math.PI * 2) * 0.04;
    const aqi = Math.round(baseAqi * getRushHourMultiplier(hour) * wave);

    return {
      hour,
      label: formatHourLabel(hour),
      aqi: Math.max(20, aqi),
    };
  });
}

function getLineColor(aqiValue) {
  if (aqiValue > 200) return "#e11d48";
  if (aqiValue > 100) return "#f59e0b";
  return "#10b981";
}

function getFillColor(aqiValue) {
  if (aqiValue > 200) return "#ffe4e6";
  if (aqiValue > 100) return "#fef3c7";
  return "#d1fae5";
}

export default function ForecastChart({ aqiValue }) {
  const data = useMemo(() => generateHourlyAqi(aqiValue), [aqiValue]);
  const lineColor = getLineColor(aqiValue);
  const fillColor = getFillColor(aqiValue);

  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="h-1.5 transition-colors duration-300"
        style={{ backgroundColor: lineColor }}
      />

      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900">
            <span className="text-xl" aria-hidden="true">
              📊
            </span>
            24 Hour AQI Forecast
          </h3>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500 transition-colors duration-300 group-hover:bg-zinc-200">
            ⏰ Hourly
          </span>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-zinc-50 to-slate-50 p-4 ring-1 ring-zinc-100 transition-all duration-300">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            >
              <defs>
                <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lineColor} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={fillColor} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
              <XAxis
                dataKey="hour"
                ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
                tickFormatter={formatHourLabel}
                stroke="#94a3b8"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={{ stroke: "#cbd5e1" }}
                label={{
                  value: "AQI",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#64748b",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  padding: "10px 14px",
                }}
                labelFormatter={(hour) => `🕐 ${formatHourLabel(hour)}`}
                formatter={(value) => [`${value} AQI`, ""]}
              />
              <Area
                type="monotone"
                dataKey="aqi"
                fill="url(#aqiGradient)"
                stroke="none"
                animationDuration={800}
              />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke={lineColor}
                strokeWidth={3}
                dot={{ fill: lineColor, r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{
                  r: 7,
                  fill: lineColor,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                animationDuration={800}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
