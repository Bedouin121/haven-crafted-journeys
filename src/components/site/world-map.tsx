import { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { destinations, packages, visaPackages } from "../../lib/data";

const WIDTH = 960;
const HEIGHT = 500;

const projection = geoNaturalEarth1()
  .scale(155)
  .translate([WIDTH / 2, HEIGHT / 2 + 20]);

const pathGenerator = geoPath(projection);

type MappedDestination = (typeof destinations)[number] & { lat: number; lng: number };

export function WorldMap() {
  const [land, setLand] = useState<GeoPermissibleObjects | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("world-atlas/land-110m.json").then((topology) => {
      if (cancelled) return;
      const topo = topology as unknown as Topology;
      const geo = feature(topo, topo.objects.land as any) as unknown as GeoPermissibleObjects;
      setLand(geo);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const mapped = useMemo(
    () =>
      destinations.filter(
        (d): d is MappedDestination => typeof d.lat === "number" && typeof d.lng === "number"
      ),
    []
  );

  const selectedDest = mapped.find((d) => d.slug === selected) || null;
  const selectedPoint = selectedDest ? projection([selectedDest.lng, selectedDest.lat]) : null;

  // Related counts pulled from your own data so the popup always stays in sync.
  const counts = (dest: MappedDestination) => {
    const journeys = packages.filter((p) => p.destinationSlug === dest.slug).length;
    const visas = visaPackages.filter(
      (v) => v.country.toLowerCase() === dest.country.toLowerCase()
    );
    return { journeys, visas };
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-navy">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="var(--navy-soft, #16324f)" />
            <stop offset="100%" stopColor="var(--navy, #0b1a2e)" />
          </radialGradient>
        </defs>

        <rect width={WIDTH} height={HEIGHT} fill="url(#mapGlow)" />

        {land && (
          <path
            d={pathGenerator(land) ?? undefined}
            fill="none"
            stroke="var(--gold-soft, #c9a769)"
            strokeWidth={0.6}
            strokeOpacity={0.85}
            vectorEffect="non-scaling-stroke"
          />
        )}

        {mapped.map((d) => {
          const point = projection([d.lng, d.lat]);
          if (!point) return null;
          const [x, y] = point;
          const isHovered = hovered === d.slug;
          const isSelected = selected === d.slug;

          return (
            <g
              key={d.slug}
              transform={`translate(${x} ${y})`}
              onMouseEnter={() => setHovered(d.slug)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(d.slug)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(d.slug);
                }
              }}
              aria-label={`${d.name} — open details`}
            >
              <circle
                r={isHovered || isSelected ? 14 : 0}
                fill="var(--gold, #d4af6a)"
                opacity={0.22}
                style={{ transition: "r 300ms ease" }}
              />
              <circle
                r={isHovered || isSelected ? 6 : 3.5}
                fill={isSelected ? "var(--teal, #6a9fa5)" : "var(--gold, #d4af6a)"}
                stroke="var(--navy, #0b1a2e)"
                strokeWidth={1}
                style={{ transition: "r 300ms ease, fill 300ms ease" }}
              />
              {isHovered && !isSelected && (
                <g transform="translate(10 -8)">
                  <text className="font-display" fontSize={13} fill="var(--primary-foreground, #f7f3ec)">
                    {d.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {selectedDest && selectedPoint && (
          <MapPopup
            key={selectedDest.slug}
            dest={selectedDest}
            counts={counts(selectedDest)}
            svgPoint={selectedPoint}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {hovered && !selected && (
        <div className="pointer-events-none absolute bottom-4 left-4 text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
          {mapped.find((d) => d.slug === hovered)?.name}
        </div>
      )}
    </div>
  );
}

function MapPopup({
  dest,
  counts,
  svgPoint,
  onClose,
}: {
  dest: MappedDestination;
  counts: { journeys: number; visas: { visaType: string }[] };
  svgPoint: [number, number];
  onClose: () => void;
}) {
  // Convert SVG point (in 960x500 space) to percentages so the popup
  // stays anchored even as the map scales responsively.
  const leftPct = (svgPoint[0] / WIDTH) * 100;
  const topPct = (svgPoint[1] / HEIGHT) * 100;
  const flipY = topPct > 60; // popup above pin when near bottom
  const flipX = leftPct > 70;

  const visaTypes = Array.from(new Set(counts.visas.map((v) => v.visaType)));
  const visaLabel =
    counts.visas.length === 0
      ? "No visas offered"
      : `${visaTypes.join(" & ")} visa${counts.visas.length > 1 ? "s" : ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="absolute z-10 w-64 -translate-x-1/2 rounded-2xl border border-border/60 bg-card p-4 shadow-lift"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(${flipX ? "-90%" : "-50%"}, ${flipY ? "calc(-100% - 16px)" : "16px"})`,
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{dest.region}</p>
      <h3 className="mt-1 font-display text-xl text-foreground">{dest.name}</h3>
      <p className="mt-1.5 text-xs text-muted-foreground">{dest.tagline}</p>

      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-secondary/60 px-2.5 py-1.5">
          <dt className="text-muted-foreground">Journeys</dt>
          <dd className="font-medium text-foreground">{counts.journeys} available</dd>
        </div>
        <div className="rounded-lg bg-secondary/60 px-2.5 py-1.5">
          <dt className="text-muted-foreground">Visas</dt>
          <dd className="font-medium text-foreground">{visaLabel}</dd>
        </div>
      </dl>

      <Link
        to="/destinations/$slug"
        params={{ slug: dest.slug }}
        className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-navy px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-navy-soft"
      >
        Know more
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </motion.div>
  );
}
