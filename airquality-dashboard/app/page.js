import { headers } from "next/headers";
import CitySelector from "@/components/CitySelector";
import CityDashboard from "@/components/CityDashboard";

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
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          AirSense India
        </h1>
        <p className="mt-2 text-zinc-600">
          Real-time air quality across 8 major Indian cities
        </p>
      </header>

      <main className="mx-auto w-full max-w-6xl p-6">
        <CityDashboard cities={cities} CitySelector={CitySelector} />
      </main>
    </div>
  );
}
