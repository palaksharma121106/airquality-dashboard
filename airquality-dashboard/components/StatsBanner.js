export default function StatsBanner() {
  const stats = [
    { number: "1.67M", label: "Premature deaths annually from air pollution in India", icon: "💔" },
    { number: "24/50", label: "Most polluted cities are Tier 1 or 2 urban centres", icon: "🏙️" },
    { number: "900+", label: "CAAQMS monitoring stations across India", icon: "📡" },
  ];

  return (
    <div className="bg-[#0d1428] border-y border-blue-900 px-8 py-4">
      <div className="mx-auto max-w-6xl grid grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-blue-400 text-xl font-black">{stat.number}</p>
              <p className="text-gray-400 text-xs leading-tight">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}