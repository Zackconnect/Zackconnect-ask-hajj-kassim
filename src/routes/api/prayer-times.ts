import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/prayer-times")({
  methods: ["POST"],
  preload: false,
  component: async () => null,
});

export const handler = async (request: Request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { latitude, longitude } = await request.json();

    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: "Latitude and longitude are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.UMMAH_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Ummah API endpoint for prayer times
    const ummahUrl = `https://api.ummahapi.com/api/prayer-times?lat=${latitude}&lng=${longitude}&apiKey=${apiKey}`;

    const response = await fetch(ummahUrl);

    if (!response.ok) {
      throw new Error(`Ummah API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform Ummah API response
    const times = {
      Fajr: data.data.timings?.Fajr || "N/A",
      Sunrise: data.data.timings?.Sunrise || "N/A",
      Dhuhr: data.data.timings?.Dhuhr || "N/A",
      Asr: data.data.timings?.Asr || "N/A",
      Sunset: data.data.timings?.Sunset || "N/A",
      Maghrib: data.data.timings?.Maghrib || "N/A",
      Isha: data.data.timings?.Isha || "N/A",
    };

    return new Response(
      JSON.stringify({
        times,
        city: data.data.city || "Unknown",
        country: data.data.country || "Unknown",
        date: data.data.date?.gregorian || new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Prayer times API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch prayer times",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
