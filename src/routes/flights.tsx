import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  Plane, Calendar, ArrowRight, Clock, RefreshCw, AlertCircle, ChevronLeft,
  Wifi, WifiOff,
} from "lucide-react";
import { Breadcrumbs } from "../components/site/breadcrumbs";

// ─── Credentials ─────────────────────────────────────────────────────────────
const TRAVELPAYOUTS_MARKER = "756332";

// ─── Search params schema ─────────────────────────────────────────────────────
const flightSearchSchema = z.object({
  origin: z.string().default("DAC"),
  destination: z.string().default("BKK"),
  originCity: z.string().optional(),
  destinationCity: z.string().optional(),
  depart_date: z.string().optional(),
  return_date: z.string().optional(),
  adults: z.number().default(1),
  children: z.number().default(0),
  trip_class: z.number().default(0),
  currency: z.string().default("usd"),
});

export type FlightSearchParams = z.infer<typeof flightSearchSchema>;

// ─── API types (matched to NormalisedDeal from api.flights.ts) ───────────────
type FlightDeal = {
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

// ─── Airline logo helper ──────────────────────────────────────────────────────
function airlineLogo(iata: string) {
  return `https://pics.avs.io/60/30/${iata}.png`;
}

// ─── Aviasales affiliate booking URL ─────────────────────────────────────────
function bookingUrl(deal: FlightDeal, params: FlightSearchParams) {
  // If the API gave us a direct link, use it (with marker appended)
  if (deal.link) {
    return `https://www.aviasales.com${deal.link}&marker=${TRAVELPAYOUTS_MARKER}`;
  }
  // Fallback to search URL
  const url = new URL("https://search.aviasales.com/flights/");
  url.searchParams.set("origin_iata", deal.originAirport || params.origin);
  url.searchParams.set("destination_iata", deal.destinationAirport || deal.destination);
  if (params.depart_date) url.searchParams.set("depart_date", params.depart_date);
  if (params.return_date) url.searchParams.set("return_date", params.return_date);
  url.searchParams.set("adults", String(params.adults));
  url.searchParams.set("children", String(params.children));
  url.searchParams.set("trip_class", String(params.trip_class));
  url.searchParams.set("marker", TRAVELPAYOUTS_MARKER);
  return url.toString();
}

// ─── API fetch (via server-side proxy to avoid CORS) ─────────────────────────
async function fetchCheapFlights(params: FlightSearchParams): Promise<FlightDeal[]> {
  const url = new URL("/api/flights", window.location.origin);
  url.searchParams.set("origin", params.origin);
  url.searchParams.set("destination", params.destination);
  url.searchParams.set("currency", params.currency);
  if (params.depart_date) url.searchParams.set("depart_date", params.depart_date);
  if (params.return_date) url.searchParams.set("return_date", params.return_date);

  const res = await fetch(url.toString());
  const json = await res.json();

  if (!res.ok || !json.success) {
    const msg = json.error ?? `HTTP ${res.status}`;
    const detail = json.detail ? ` — ${json.detail}` : "";
    throw new Error(`${msg}${detail}`);
  }

  return (json.data as FlightDeal[]) ?? [];
}

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/flights")({
  validateSearch: flightSearchSchema,
  head: ({ search }) => ({
    meta: [
      {
        title: `Flights from ${search.originCity ?? search.origin} to ${search.destinationCity ?? search.destination} — Travel Tours`,
      },
    ],
  }),
  component: FlightsPage,
});

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 animate-pulse space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 rounded bg-secondary" />
        <div className="h-8 w-20 rounded bg-secondary" />
      </div>
      <div className="h-3 w-40 rounded bg-secondary" />
      <div className="h-3 w-32 rounded bg-secondary" />
      <div className="h-10 w-full rounded-xl bg-secondary mt-2" />
    </div>
  );
}

// ─── Deal card ────────────────────────────────────────────────────────────────
function DealCard({ deal, params, index }: { deal: FlightDeal; params: FlightSearchParams; index: number }) {
  const departDate = deal.departureAt
    ? new Date(deal.departureAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
    : null;
  const returnDate = deal.returnAt
    ? new Date(deal.returnAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
    : null;
  const stopsLabel = deal.transfers === 0 ? "Non-stop" : deal.transfers === 1 ? "1 stop" : `${deal.transfers} stops`;
  const durationLabel = deal.durationMinutes
    ? `${Math.floor(deal.durationMinutes / 60)}h ${deal.durationMinutes % 60}m`
    : null;
  const href = bookingUrl(deal, params);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl border border-border bg-card hover:shadow-lift transition-shadow duration-500 overflow-hidden"
    >
      <div className="p-5 space-y-4">
        {/* Header: airline logo + price */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={airlineLogo(deal.airline)}
                alt={deal.airline}
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  (e.currentTarget.parentElement as HTMLElement).innerHTML =
                    `<span class="text-xs font-semibold text-navy">${deal.airline}</span>`;
                }}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {deal.airline} {deal.flightNumber}
              </p>
              <span className={`inline-flex items-center gap-1 text-xs font-medium mt-0.5 px-2 py-0.5 rounded-full ${
                deal.transfers === 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}>
                {deal.transfers === 0 ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {stopsLabel}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-display font-semibold text-navy leading-none">
              ${deal.price.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">per person</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 text-sm text-navy">
          <span className="font-semibold font-display">{deal.originAirport || params.origin}</span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <span className="font-semibold font-display">{deal.destinationAirport || deal.destination}</span>
        </div>

        {/* Dates + duration */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {departDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" strokeWidth={1.5} />
              Depart: {departDate}
            </span>
          )}
          {returnDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" strokeWidth={1.5} />
              Return: {returnDate}
            </span>
          )}
          {durationLabel && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={1.5} />
              {durationLabel}
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-navy-soft transition-colors duration-500"
        >
          Book this flight
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </a>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function FlightsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const params: FlightSearchParams = {
    origin: search.origin,
    destination: search.destination,
    originCity: search.originCity,
    destinationCity: search.destinationCity,
    depart_date: search.depart_date,
    return_date: search.return_date,
    adults: search.adults,
    children: search.children,
    trip_class: search.trip_class,
    currency: search.currency,
  };

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["flights", params],
    queryFn: () => fetchCheapFlights(params),
    staleTime: 1000 * 60 * 5, // 5 min
    retry: 1,
  });

  const fromLabel = params.originCity ?? params.origin;
  const toLabel = params.destinationCity ?? params.destination;
  const tripClassLabel = params.trip_class === 0 ? "Economy" : "Business / First";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero strip */}
      <div className="bg-navy text-white">
        <div className="container-editorial py-10 pt-28">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Flight Search" },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gold-soft text-sm font-medium">
                <Plane className="h-4 w-4" strokeWidth={1.5} />
                Flight deals
              </div>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl leading-[1.05]">
                {fromLabel}
                <span className="text-gold mx-3">→</span>
                {toLabel}
              </h1>
              <p className="mt-2 text-white/70 text-sm">
                {tripClassLabel} · {params.adults} adult{params.adults !== 1 ? "s" : ""}
                {params.children > 0 ? `, ${params.children} child${params.children !== 1 ? "ren" : ""}` : ""}
                {params.depart_date ? ` · From ${params.depart_date}` : ""}
              </p>
            </div>
            <button
              onClick={() => navigate({ to: "/" })}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Modify search
            </button>
          </div>
        </div>
      </div>

      <div className="container-editorial py-10">
        {/* Refresh button */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {isLoading || isFetching
              ? "Fetching latest prices…"
              : data
              ? `${data.length} deal${data.length !== 1 ? "s" : ""} found`
              : ""}
          </p>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 text-sm text-navy hover:text-teal transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} strokeWidth={2} />
            Refresh prices
          </button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error state */}
        <AnimatePresence>
          {isError && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center max-w-lg mx-auto"
            >
              <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-3" strokeWidth={1.5} />
              <p className="font-display text-lg text-navy">Couldn't fetch prices</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                {(error as Error)?.message ?? "An unexpected error occurred."}
              </p>
              <button
                onClick={() => refetch()}
                className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-navy-soft transition-colors"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!isLoading && !isError && data?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-10 text-center max-w-lg mx-auto"
          >
            <Plane className="h-8 w-8 text-muted-foreground mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-display text-xl text-navy">No deals cached yet</p>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              The Travelpayouts cache doesn't have results for this route and date yet. Try different dates or browse all options on Aviasales.
            </p>
            <a
              href={`https://search.aviasales.com/flights/?origin_iata=${params.origin}&destination_iata=${params.destination}&adults=${params.adults}&trip_class=${params.trip_class}&marker=${TRAVELPAYOUTS_MARKER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-navy-soft transition-colors"
            >
              Search live on Aviasales
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}

        {/* Results grid */}
        {!isLoading && data && data.length > 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((deal, i) => (
                <DealCard key={`${deal.destination}-${deal.flightNumber}-${i}`} deal={deal} params={params} index={i} />
              ))}
            </div>

            {/* Disclaimer */}
            <p className="mt-10 text-xs text-center text-muted-foreground max-w-2xl mx-auto">
              Prices are sourced from the Travelpayouts cache and reflect fares found in the last 48 hours. Final prices are confirmed at booking. Clicking "Book this flight" takes you to Aviasales, our affiliate partner.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
