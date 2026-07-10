'use client';

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function getSourceData(mainSource) {
  switch (mainSource) {
    case "Vehicles": return [{ name: "Vehicles", value: 45, icon: "🚗" }, { name: "Industries", value: 25, icon: "🏭" }, { name: "Construction", value: 20, icon: "🏗️" }, { name: "Others", value: 10, icon: "💨" }];
    case "Industries": return [{ name: "Industries", value: 50, icon: "🏭" }, { name: "Vehicles", value: 25, icon: "🚗" }, { name: "Construction", value: 15, icon: "🏗️" }, { name: "Others", value: 10, icon: "💨" }];
    case "Construction": return [{ name: "Construction", value: 40, icon: "🏗️" }, { name: "Vehicles", value: 30, icon: "🚗" }, { name: "Industries", value: 20, icon: "🏭" }, { name: "Others", value: 10, icon: "💨" }];
    case "Crop Burning": return [{ name: "Crop Burning", value: 55, icon: "🌾" }, { name: "Vehicles", value: 20, icon: "🚗" }, { name: "Industries", value: 15, icon: "🏭" }, { name: "Others", value: 10, icon: "💨" }];
    default: return [{ name: "Vehicles", value: 35, icon: "🚗" }, { name: "Industries", value: 30, icon: "🏭" }, { name: "Construction", value: 25, icon: "🏗️" }, { name: "Others", value: 10, icon: "💨" }];
  }
}

const COLORS = ["#6366f1", "#34d399", "#fbbf24", "#94a3b8"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#0d1428", border: "1px solid #1e3a5f", borderRadius: 8, padding: "8px 12px" }}>
        <p style={{ color: "#93c5fd", fontSize: 12 }}>{payload[0].name}</p>
        <p style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

function Chart({ data, outerRadius }) {
  return (
    <ResponsiveContainer width="100%" height={outerRadius * 2 + 60}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={outerRadius * 0.55} outerRadius={outerRadius} paddingAngle={3} dataKey="value">
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function SourceChart({ mainSource }) {
  const [open, setOpen] = useState(false);
  const data = getSourceData(mainSource);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="rounded-xl border border-[#1e3a5f] bg-[#0d1428] p-4 cursor-pointer hover:border-blue-400 hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold text-sm">🌍 Pollution Sources</h3>
          <span className="text-blue-400 text-xs border border-blue-900 rounded px-2 py-0.5">🔍 Expand</span>
        </div>

        {/* Compact view — chart left, legend right */}
        <div className="flex items-center gap-2">
          <div style={{ width: "50%" }}>
            <Chart data={data} outerRadius={120} />
          </div>
          <div className="flex flex-col gap-2" style={{ width: "50%" }}>
            {data.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLORS[i] }}></div>
                <div>
                  <p className="text-white text-xs font-bold">{item.icon} {item.name}</p>
                  <p className="text-gray-400 text-xs">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="modal-enter w-full max-w-2xl rounded-2xl border border-[#1e3a5f] bg-[#0d1428] p-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-bold text-xl">🌍 Pollution Sources Breakdown</h2>
                <p className="text-gray-400 text-sm mt-1">Primary contributors to air pollution today</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-2xl font-bold">✕</button>
            </div>

            <Chart data={data} outerRadius={130} />

            <div className="grid grid-cols-2 gap-3 mt-4">
              {data.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-[#1e3a5f] bg-[#0a0f1e] p-3">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: COLORS[i] }}></div>
                  <div>
                    <p className="text-white text-sm font-bold">{item.icon} {item.name}</p>
                    <p className="text-gray-400 text-xs">{item.value}% contribution</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}