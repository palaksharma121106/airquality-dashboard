"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SOURCE_COLORS = {
  Vehicles: "#2563eb",
  Industries: "#7c3aed",
  Construction: "#ea580c",
  Others: "#475569",
};

const SOURCE_EMOJIS = {
  Vehicles: "🚗",
  Industries: "🏭",
  Construction: "🏗️",
  Others: "🌫️",
};

const SOURCE_SPLITS = {
  Vehicles: [
    { name: "Vehicles", value: 45 },
    { name: "Industries", value: 25 },
    { name: "Construction", value: 20 },
    { name: "Others", value: 10 },
  ],
  Industries: [
    { name: "Industries", value: 50 },
    { name: "Vehicles", value: 25 },
    { name: "Construction", value: 15 },
    { name: "Others", value: 10 },
  ],
  Construction: [
    { name: "Construction", value: 40 },
    { name: "Vehicles", value: 30 },
    { name: "Industries", value: 20 },
    { name: "Others", value: 10 },
  ],
};

const DEFAULT_SPLIT = [
  { name: "Vehicles", value: 30 },
  { name: "Industries", value: 25 },
  { name: "Construction", value: 25 },
  { name: "Others", value: 20 },
];

function getSourceData(mainSource) {
  return SOURCE_SPLITS[mainSource] ?? DEFAULT_SPLIT;
}

export default function SourceChart({ mainSource }) {
  const data = useMemo(() => getSourceData(mainSource), [mainSource]);

  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-blue-500/30 bg-[#0d1428] shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(59,130,246,0.25)]">
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-orange-500 transition-all duration-300" />

      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
            <span className="text-xl" aria-hidden="true">
              🌍
            </span>
            Pollution Sources
          </h3>
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 transition-colors duration-300 group-hover:bg-blue-500/30">
            {SOURCE_EMOJIS[mainSource] ?? "💨"} {mainSource}
          </span>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-blue-500/5 to-sky-500/5 p-4 ring-1 ring-blue-500/20 transition-all duration-300">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={58}
                outerRadius={92}
                paddingAngle={3}
                animationDuration={800}
                animationBegin={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={SOURCE_COLORS[entry.name]}
                    stroke="#0d1428"
                    strokeWidth={2}
                    className="transition-opacity duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #3b82f6",
                  backgroundColor: "#0d1428",
                  boxShadow: "0 8px 24px rgba(59,130,246,0.3)",
                  padding: "10px 14px",
                }}
                labelStyle={{ color: "#93c5fd" }}
                itemStyle={{ color: "#fff" }}
                formatter={(value, name) => [
                  `${value}%`,
                  `${SOURCE_EMOJIS[name] ?? ""} ${name}`,
                ]}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="ml-1 text-sm font-medium text-blue-300">
                    {SOURCE_EMOJIS[value]} {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
