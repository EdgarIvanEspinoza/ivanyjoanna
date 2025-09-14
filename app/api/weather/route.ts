import { NextResponse } from "next/server";

// Aranjuez approximate coordinates
const LAT = 40.0348;
const LON = -3.6131;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date"); // YYYY-MM-DD
  if (!date) {
    return NextResponse.json({ error: "Missing date param" }, { status: 400 });
  }

  try {
    // Using Open-Meteo free API (no key needed) — we request daily temp for target date.
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean&timezone=Europe/Madrid&start_date=${date}&end_date=${date}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Weather fetch failed");
    const data = await res.json();
    const daily = data?.daily;
    if (!daily || !daily.time || !daily.time.length) {
      return NextResponse.json({ fallback: true });
    }
    let precip = daily.precipitation_probability_mean?.[0];
    let estimated = false;
    if (precip == null || Number.isNaN(precip)) {
      // Simple heuristic fallback: set moderate 25% for planning
      precip = 25;
      estimated = true;
    }
    const result = {
      date: daily.time[0],
      tMax: daily.temperature_2m_max[0],
      tMin: daily.temperature_2m_min[0],
      precipProb: precip,
      precipEstimated: estimated,
      source: "open-meteo",
      generatedAt: new Date().toISOString(),
    };
    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    // Provide a default estimation on error so UI can still show icon
    return NextResponse.json(
      {
        error: e.message,
        fallback: true,
        date,
        tMax: 22,
        tMin: 13,
        precipProb: 25,
        precipEstimated: true,
        source: "open-meteo-fallback",
      },
      { status: 200 }
    );
  }
}
