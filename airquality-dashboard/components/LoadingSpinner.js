export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-900 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-blue-400 text-sm mt-4 animate-pulse">🤖 AI analyzing air quality data...</p>
      <p className="text-gray-600 text-xs mt-1">Generating health advisory...</p>
    </div>
  );
}