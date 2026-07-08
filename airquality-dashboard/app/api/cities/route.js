function getAqiColor(aqi) {
  if (aqi <= 50) return "#00E400";
  if (aqi <= 100) return "#FFFF00";
  if (aqi <= 150) return "#FF7E00";
  if (aqi <= 200) return "#FF0000";
  if (aqi <= 300) return "#8F3F97";
  return "#7E0023";
}

const CITIES = [
  {
    name: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    aqi: 312,
    dominantPollutant: "PM2.5",
  },
  {
    name: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    aqi: 156,
    dominantPollutant: "PM10",
  },
  {
    name: "Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    aqi: 178,
    dominantPollutant: "PM2.5",
  },
  {
    name: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    aqi: 94,
    dominantPollutant: "PM2.5",
  },
  {
    name: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    aqi: 112,
    dominantPollutant: "PM10",
  },
  {
    name: "Jaipur",
    lat: 26.9124,
    lng: 75.7873,
    aqi: 245,
    dominantPollutant: "PM2.5",
  },
  {
    name: "Hyderabad",
    lat: 17.385,
    lng: 78.4867,
    aqi: 128,
    dominantPollutant: "PM2.5",
  },
  {
    name: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    aqi: 87,
    dominantPollutant: "O3",
  },
];

export async function GET() {
  const cities = CITIES.map((city) => ({
    ...city,
    color: getAqiColor(city.aqi),
  }));

  return Response.json(cities);
}
