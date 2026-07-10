export async function GET() {
  const token = process.env.WAQI_TOKEN;

  const cities = [
    { name: "Delhi", lat: 28.6139, lng: 77.209 },
    { name: "Mumbai", lat: 19.076, lng: 72.8777 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
  ];

  const fallback = {
    Delhi: 218,
    Mumbai: 145,
    Kolkata: 178,
    Bengaluru: 95,
    Chennai: 112,
    Jaipur: 167,
    Hyderabad: 134,
    Pune: 108,
  };

  const results = await Promise.all(
    cities.map(async (city) => {
      try {
        const res = await fetch(
          `https://api.waqi.info/feed/${city.name}/?token=${token}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (data.status === "ok") {
          const aqi = data.data.aqi;
          const dominant = data.data.dominantpol || "PM2.5";
          return {
            name: city.name,
            lat: city.lat,
            lng: city.lng,
            aqi,
            dominantPollutant: dominant.toUpperCase(),
            color: aqi < 100 ? "green" : aqi < 200 ? "orange" : "red",
          };
        } else {
          throw new Error("bad status");
        }
      } catch {
        const aqi = fallback[city.name] || 150;
        return {
          name: city.name,
          lat: city.lat,
          lng: city.lng,
          aqi,
          dominantPollutant: "PM2.5",
          color: aqi < 100 ? "green" : aqi < 200 ? "orange" : "red",
        };
      }
    })
  );

  return Response.json(results);
}