"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
  if (aqiValue > 200) return "#dc2626";
  if (aqiValue > 100) return "#f97316";
  return "#16a34a";
}

export default function ForecastChart({ aqiValue }) {
  const data = useMemo(() => generateHourlyAqi(aqiValue), [aqiValue]);
  const lineColor = getLineColor(aqiValue);

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold tracking-tight text-zinc-900">
        24 Hour AQI Forecast
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="hour"
            ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
            tickFormatter={formatHourLabel}
            stroke="#71717a"
            tick={{ fill: "#71717a", fontSize: 12 }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={{ stroke: "#d4d4d8" }}
          />
          <YAxis
            stroke="#71717a"
            tick={{ fill: "#71717a", fontSize: 12 }}
            axisLine={{ stroke: "#d4d4d8" }}
            tickLine={{ stroke: "#d4d4d8" }}
            label={{
              value: "AQI",
              angle: -90,
              position: "insideLeft",
              fill: "#71717a",
              fontSize: 12,
            }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e4e4e7",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
            labelFormatter={(hour) => formatHourLabel(hour)}
            formatter={(value) => [value, "AQI"]}
          />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke={lineColor}
            strokeWidth={2.5}
            dot={{ fill: lineColor, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: lineColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
