import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const TRAVELPAYOUTS_API_TOKEN = "68287350c353ebd276802f1d1b550545";

async function fetchFromTravelpayouts(
  origin: string,
  destination: string,
  currency: string,
  departureAt: string | null,
  returnAt: string | null,
): Promise<{ success: boolean; data: V3Ticket[] }> {
  const url = new URL("https://api.travelpayouts.com/aviasales/v3/prices_for_dates");
  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("currency", currency);
  url.searchParams.set("sorting", "price");
  url.searchParams.set("direct", "false");
  url.searchParams.set("limit", "15");
  url.searchParams.set("page", "1");
  url.searchParams.set("market", "us");
  url.searchParams.set("one_way", returnAt ? "false" : "true");
  url.searchParams.set("token", TRAVELPAYOUTS_API_TOKEN);
  if (departureAt) url.searchParams.set("departure_at", departureAt);
  if (returnAt) url.searchParams.set("return_at", returnAt);

  const res = await fetch(url.toString(), {
    headers: {
      "X-Access-Token": TRAVELPAYOUTS_API_TOKEN,
      "Accept": "application/json",
    },
  });

  const body = await res.text();

  if (!res.ok) {
    throw Object.assign(new Error(`Upstream ${res.status}`), { detail: body, status: res.status });
  }

  return JSON.parse(body) as { success: boolean; data: V3Ticket[] };
}

export const Route = createFileRoute("/api/flights")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);

        const origin      = searchParams.get("origin")      ?? "DAC";
        const destination = searchParams.get("destination") ?? "BKK";
        const currency    = searchParams.get("currency")    ?? "usd";
        const rawDepart   = searchParams.get("depart_date");
        const rawReturn   = searchParams.get("return_date");

        // Travelpayouts wants YYYY-MM (month granularity)
        const departureAt = rawDepart ? rawDepart.slice(0, 7) : null;
        const returnAt    = rawReturn ? rawReturn.slice(0, 7) : null;

        try {
          // First attempt — with the user's chosen date (if any)
          let parsed = await fetchFromTravelpayouts(
            origin, destination, currency, departureAt, returnAt,
          );

          // If the date-specific call returned nothing, retry without dates.
          // The cache is sparse — popular routes have data, specific month requests often don't.
          if (departureAt && (!parsed.success || !parsed.data?.length)) {
            parsed = await fetchFromTravelpayouts(
              origin, destination, currency, null, null,
            );
          }

          const deals: NormalisedDeal[] = (parsed.data ?? []).map((t) => ({
            origin:             t.origin,
            destination:        t.destination,
            originAirport:      t.origin_airport,
            destinationAirport: t.destination_airport,
            price:              t.price,
            airline:            t.airline,
            flightNumber:       t.flight_number,
            departureAt:        t.departure_at,
            returnAt:           t.return_at ?? null,
            transfers:          t.transfers,
            returnTransfers:    t.return_transfers ?? 0,
            durationMinutes:    t.duration ?? null,
            link:               t.link ?? null,
          }));

          return new Response(
            JSON.stringify({ success: true, data: deals, currency }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
              },
            },
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          const detail  = (err as { detail?: string }).detail ?? null;
          const status  = (err as { status?: number }).status;
          console.error(`[api/flights] ${message}`, detail ?? "");
          return new Response(
            JSON.stringify({ success: false, error: message, ...(detail ? { detail } : {}) }),
            {
              status: status === 400 ? 400 : 502,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});

// ─── Types ───────────────────────────────────────────────────────────────────
type V3Ticket = {
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;
  return_at?: string;
  transfers: number;
  return_transfers?: number;
  duration?: number;
  link?: string;
};

export type NormalisedDeal = {
  origin: string;
  destination: string;
  originAirport: string;
  destinationAirport: string;
  price: number;
  airline: string;
  flightNumber: string;
  departureAt: string;
  returnAt: string | null;
  transfers: number;
  returnTransfers: number;
  durationMinutes: number | null;
  link: string | null;
};
