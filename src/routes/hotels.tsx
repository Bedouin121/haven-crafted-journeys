import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Hotel, ChevronLeft, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "../components/site/breadcrumbs";

// ─── Credentials ─────────────────────────────────────────────────────────────
const TRAVELPAYOUTS_MARKER = "756332";

// ─── Search params schema ─────────────────────────────────────────────────────
const hotelSearchSchema = z.object({
  destination: z.string().default(""),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  adults: z.number().default(2),
  children: z.number().default(0),
});

export type HotelSearchParams = z.infer<typeof hotelSearchSchema>;

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/hotels")({
  validateSearch: hotelSearchSchema,
  head: ({ match }) => {
    const search = match.search as z.infer<typeof hotelSearchSchema>;
    return {
      meta: [
        {
          title: `Hotels in ${search.destination || "your destination"} — Travel Tours`,
        },
      ],
    };
  },
  component: HotelsPage,
});

// ─── Hotellook iframe widget ─────────────────────────────────────────────────
/**
 * Travelpayouts provides an official "Hotel Search" embeddable widget at
 * https://tp.media/r which renders a full hotel search UI inside an iframe.
 * This is the approved method for showing hotel results on-site without
 * the Hotels Search API (which requires server-side MD5 auth).
 */
function HotellookWidget({ params }: { params: HotelSearchParams }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Build the Travelpayouts hotel search widget URL
  const widgetUrl = buildWidgetUrl(params);

  useEffect(() => {
    setLoaded(false);
  }, [widgetUrl]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-card shadow-lift">
      {/* Loading overlay */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card">
          <div className="h-10 w-10 rounded-full border-2 border-navy border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading hotel results…</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={widgetUrl}
        title="Hotel search results"
        className="w-full"
        style={{ minHeight: "700px", border: "none" }}
        onLoad={() => setLoaded(true)}
        allow="payment"
      />
    </div>
  );
}

function buildWidgetUrl(params: HotelSearchParams): string {
  // Travelpayouts hotel search widget — renders full hotel results inside iframe
  const base = "https://tp.media/r";
  const url = new URL(base);
  url.searchParams.set("marker", TRAVELPAYOUTS_MARKER);
  url.searchParams.set("trs", "288020"); // Hotel widget template ID
  url.searchParams.set("shmarker", TRAVELPAYOUTS_MARKER);
  url.searchParams.set("lang", "en");
  url.searchParams.set("currency", "usd");

  if (params.destination) url.searchParams.set("destination", params.destination);
  if (params.checkIn) url.searchParams.set("checkIn", params.checkIn);
  if (params.checkOut) url.searchParams.set("checkOut", params.checkOut);
  url.searchParams.set("adults", String(params.adults));
  if (params.children > 0) url.searchParams.set("children", String(params.children));

  return url.toString();
}

// Direct Hotellook search link (fallback / "open in new tab")
function hotellookLink(params: HotelSearchParams): string {
  const url = new URL("https://search.hotellook.com/");
  if (params.destination) url.searchParams.set("destination", params.destination);
  if (params.checkIn) url.searchParams.set("checkIn", params.checkIn);
  if (params.checkOut) url.searchParams.set("checkOut", params.checkOut);
  url.searchParams.set("adults", String(params.adults));
  url.searchParams.set("marker", TRAVELPAYOUTS_MARKER);
  return url.toString();
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function HotelsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const params: HotelSearchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    adults: search.adults,
    children: search.children,
  };

  const nights =
    params.checkIn && params.checkOut
      ? Math.max(
          1,
          Math.round(
            (new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero strip */}
      <div className="bg-navy text-white">
        <div className="container-editorial py-10 pt-28">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Hotel Search" },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gold-soft text-sm font-medium">
                <Hotel className="h-4 w-4" strokeWidth={1.5} />
                Hotel results
              </div>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl leading-[1.05]">
                {params.destination || "All destinations"}
              </h1>
              <p className="mt-2 text-white/70 text-sm">
                {params.adults} guest{params.adults !== 1 ? "s" : ""}
                {params.children > 0 ? `, ${params.children} child${params.children !== 1 ? "ren" : ""}` : ""}
                {params.checkIn ? ` · Check-in ${params.checkIn}` : ""}
                {nights ? ` · ${nights} night${nights !== 1 ? "s" : ""}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={hotellookLink(params)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open in Hotellook
              </a>
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
      </div>

      {/* Widget */}
      <div className="container-editorial py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <HotellookWidget params={params} />
        </motion.div>

        <p className="mt-6 text-xs text-center text-muted-foreground max-w-2xl mx-auto">
          Hotel results are powered by Hotellook via Travelpayouts. Booking is processed securely by our affiliate partner. Prices shown are per night unless otherwise stated.
        </p>
      </div>
    </div>
  );
}
