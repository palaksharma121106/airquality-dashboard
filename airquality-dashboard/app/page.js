import { headers } from "next/headers";
import CitySelector from "@/components/CitySelector";
import CityDashboard from "@/components/CityDashboard";
import StatsBanner from "@/components/StatsBanner";

async function getCities() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/cities`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  return response.json();
}

export default async function Home() {
  const cities = await getCities();

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <header className="bg-[#0d1428] border-b border-blue-900 px-8 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            AirSense India 🌬️
          </h1>
          <p className="mt-2 text-blue-300 text-lg">
            AI-powered real-time air quality intelligence across major Indian cities
          </p>
        </div>
      </header>

      <StatsBanner />

      <main className="mx-auto w-full max-w-6xl p-6">
        <CityDashboard cities={cities} CitySelector={CitySelector} />
      </main>
    </div>
  );
}