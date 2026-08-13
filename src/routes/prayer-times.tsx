import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Spinner } from "@/components/ui/spinner";
import { Alert } from "@/components/ui/alert";

export const Route = createFileRoute("/prayer-times")({
  head: () => ({
    meta: [
      { title: "Prayer Times — Ask Hajj Kassim" },
      {
        name: "description",
        content: "Get accurate prayer times for your location",
      },
      { property: "og:title", content: "Prayer Times — Ask Hajj Kassim" },
      {
        property: "og:description",
        content: "View prayer times for any location",
      },
    ],
  }),
  component: PrayerTimesPage,
});

interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

function PrayerTimesPage() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });

              // Fetch prayer times from API
              const response = await fetch("/api/prayer-times", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ latitude, longitude }),
              });

              if (!response.ok) {
                throw new Error("Failed to fetch prayer times");
              }

              const data = await response.json();
              setPrayerTimes(data.times);
              setLocation((prev) => ({
                ...prev!,
                city: data.city,
                country: data.country,
              }));
            },
            (err) => {
              setError(
                "Unable to access your location. Please enable location permissions."
              );
              console.error(err);
            }
          );
        } else {
          setError("Geolocation is not supported by your browser");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Prayer Times</h1>

        {loading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}

        {error && <Alert variant="destructive">{error}</Alert>}

        {prayerTimes && location && (
          <div className="space-y-6">
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <p className="text-lg font-semibold text-slate-700">
                {location.city && `${location.city}, `}
                {location.country}
              </p>
              <p className="text-sm text-slate-600">
                {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(prayerTimes).map(([prayer, time]) => (
                <div
                  key={prayer}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <p className="text-sm font-medium text-slate-600">{prayer}</p>
                  <p className="text-2xl font-bold text-slate-900">{time}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-slate-500">
              Prayer times are calculated based on your current location. Last
              updated: {new Date().toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
