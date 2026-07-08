import Groq from "groq-sdk";

const REQUIRED_FIELDS = ["cityName", "aqiValue", "dominantPollutant", "temperature", "humidity", "windSpeed"];

export async function POST(request) {
  try {
    const body = await request.json();

    const missingFields = REQUIRED_FIELDS.filter(
      (field) => body[field] === undefined || body[field] === null || body[field] === ""
    );

    if (missingFields.length > 0) {
      return Response.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 });
    }

    const { cityName, aqiValue, dominantPollutant, temperature, humidity, windSpeed } = body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    const prompt = `You are an air quality health advisor for India. Based on these conditions:
- City: ${cityName}
- AQI Value: ${aqiValue}
- Dominant Pollutant: ${dominantPollutant}
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Wind Speed: ${windSpeed} km/h

Respond with ONLY a valid JSON object with these exact fields:
{
  "prediction24h": number (predicted AQI in 24 hours),
  "riskLevel": "Safe" or "Moderate" or "Dangerous" or "Very Dangerous",
  "englishAdvice": "exactly 2 sentences health advisory in English",
  "hindiAdvice": "same advisory in Hindi",
  "mainSource": "Vehicles" or "Industries" or "Construction" or "Crop Burning"
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    });

    const text = completion.choices[0]?.message?.content || "";
    const trimmed = text.trim();
    const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
    const jsonText = fencedMatch ? fencedMatch[1].trim() : trimmed;
    const advisory = JSON.parse(jsonText);

    return Response.json(advisory);
  } catch (error) {
    console.error("Advisory API error:", error);
    return Response.json({ error: "Failed to generate air quality advisory" }, { status: 500 });
  }
}