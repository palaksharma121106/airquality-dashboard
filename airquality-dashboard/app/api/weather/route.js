const MOCK_WEATHER = {
  temperature: 28,
  humidity: 65,
  windSpeed: 12,
  description: "Partly cloudy",
};

const CITY_ALIASES = {
  delhi: "Delhi,IN",
  mumbai: "Mumbai,IN",
  kolkata: "Kolkata,IN",
  bengaluru: "Bengaluru,IN",
  bangalore: "Bengaluru,IN",
  chennai: "Chennai,IN",
  jaipur: "Jaipur,IN",
  hyderabad: "Hyderabad,IN",
  pune: "Pune,IN",
};

function getMockWeather(city) {
  return {
    city: city || "Unknown",
    ...MOCK_WEATHER,
    mock: true,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json({ error: "Missing required query param: city" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
  if (!apiKey) {
    console.warn("NEXT_PUBLIC_WEATHER_KEY is not configured, returning mock weather");
    return Response.json(getMockWeather(city));
  }

  const query =
    CITY_ALIASES[city.trim().toLowerCase()] || `${city.trim()},IN`;

  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("q", query);
    url.searchParams.set("appid", apiKey);
    url.searchParams.set("units", "metric");

    const response = await fetch(url.toString(), { next: { revalidate: 300 } });

    if (!response.ok) {
      throw new Error(`OpenWeatherMap responded with ${response.status}`);
    }

    const data = await response.json();

    return Response.json({
      city: data.name,
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.round((data.wind?.speed ?? 0) * 3.6),
      description: data.weather?.[0]?.description ?? "Unknown",
      mock: false,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return Response.json(getMockWeather(city));
  }
}
