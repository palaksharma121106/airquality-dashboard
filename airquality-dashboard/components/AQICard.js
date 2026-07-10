'use client';

export default function AQICard({ cityName, aqiValue, riskLevel, englishAdvice, hindiAdvice, prediction24h, mainSource }) {
  const getColors = () => {
    if (aqiValue < 100) return { glow: 'glow-green', badge: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' };
    if (aqiValue < 200) return { glow: 'glow-orange', badge: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' };
    return { glow: 'glow-red', badge: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' };
  };

  const colors = getColors();

  const getRiskEmoji = () => {
    if (riskLevel === 'Safe') return '✅';
    if (riskLevel === 'Moderate') return '⚠️';
    if (riskLevel === 'Dangerous') return '🚨';
    return '☠️';
  };

  return (
    <div className={`card-dark p-6 animate-fade-in ${colors.glow}`}>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-blue-400 text-xs uppercase tracking-widest mb-1">📍 Selected City</p>
          <h2 className="text-white text-2xl font-bold">{cityName}</h2>
        </div>
        <span className={`${colors.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
          {getRiskEmoji()} {riskLevel}
        </span>
      </div>

      <div className={`border-l-4 ${colors.border} pl-4 mb-6`}>
        <p className="text-blue-300 text-xs uppercase tracking-widest mb-1">Air Quality Index</p>
        <p className={`text-6xl font-black ${colors.text}`}>{aqiValue}</p>
        <p className="text-gray-400 text-sm mt-1">Dominant Pollutant: PM2.5</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#0a0f1e] rounded-lg p-3 border border-blue-900">
          <p className="text-blue-400 text-xs mb-1">🔮 24hr Prediction</p>
          <p className={`text-2xl font-bold ${colors.text}`}>{prediction24h}</p>
          <p className="text-gray-500 text-xs">Predicted AQI</p>
        </div>
        <div className="bg-[#0a0f1e] rounded-lg p-3 border border-blue-900">
          <p className="text-blue-400 text-xs mb-1">🏭 Main Source</p>
          <p className="text-white text-sm font-bold mt-1">{mainSource}</p>
          <p className="text-gray-500 text-xs">Primary polluter</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-[#0a0f1e] rounded-lg p-4 border border-blue-900">
          <p className="text-blue-400 text-xs uppercase tracking-widest mb-2">🇬🇧 Health Advisory</p>
          <p className="text-gray-300 text-sm leading-relaxed">{englishAdvice}</p>
        </div>
        <div className="bg-[#0a0f1e] rounded-lg p-4 border border-blue-900">
          <p className="text-blue-400 text-xs uppercase tracking-widest mb-2">🇮🇳 स्वास्थ्य सलाह</p>
          <p className="text-gray-300 text-sm leading-relaxed">{hindiAdvice}</p>
        </div>
      </div>

    </div>
  );
}