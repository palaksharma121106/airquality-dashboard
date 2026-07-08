import { GoogleGenerativeAI } from "@google/generative-ai";

const REQUIRED_FIELDS = [
  "cityName",
  "aqiValue",
  "dominantPollutant",
  "temperature",
  "humidity",
  "windSpeed",
];

function parseJsonResponse(text) {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  const jsonText = fencedMatch ? fencedMatch[1].trim() : trimmed;
  return JSON.parse(jsonText);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const missingFields = REQUIRED_FIELDS.filter(
      (field) => body[field] === undefined || body[field] === null || body[field] === ""
    );

    if (missingFields.length > 0) {
      return Response.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const {
      cityName,
      aqiValue,
      dominantPollutant,
      temperature,
      humidity,
      windSpeed,
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an air quality health advisor for India. Based on the following current conditions, provide an air quality advisory.

Current conditions:
- City: ${cityName}
- AQI Value: ${aqiValue}
- Dominant Pollutant: ${dominantPollutant}
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Wind Speed: ${windSpeed} km/h

Respond with ONLY a valid JSON object (no markdown, no extra text) with these exact fields:
- "prediction24h": number (predicted AQI in 24 hours)
- "riskLevel": one of "Safe", "Moderate", "Dangerous", "Very Dangerous"
- "englishAdvice": string (exactly 2 sentences health advisory in English)
- "hindiAdvice": string (same advisory translated in Hindi, exactly 2 sentences)
- "mainSource": one of "Vehicles", "Industries", "Construction", "Crop Burning"`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (!text) {
      return Response.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const advisory = parseJsonResponse(text);
    return Response.json(advisory);
  } catch (error) {
    console.error("Advisory API error:", error);
    return Response.json(
      { error: "Failed to generate air quality advisory" },
      { status: 500 }
    );
  }
}
