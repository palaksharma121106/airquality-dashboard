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
  Vehicles: "#3b82f6",
  Industries: "#8b5cf6",
  Construction: "#f59e0b",
  Others: "#64748b",
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
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold tracking-tight text-zinc-900">
        Pollution Sources
      </h3>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={SOURCE_COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e4e4e7",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
            formatter={(value) => [`${value}%`, "Share"]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-zinc-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
