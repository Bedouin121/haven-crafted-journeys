import { useEffect, useState } from "react";
import { geoNaturalEarth1, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { Link } from "@tanstack/react-router";
import { destinations } from "../../lib/data";

/**
 * HOW THIS WORKS
 *
 * Every destination needs a `lat` and `lng` field in lib/data.ts, e.g.
 *   { slug: "kyoto", name: "Kyoto", lat: 35.0116, lng: 135.7681, ... }
 *
 * The `projection` below converts any [lng, lat] pair into an [x, y] pixel
 * position on this specific SVG canvas. Add, remove, or edit destinations
 * in your data file only. Markers are generated from that list every time,
 * so nothing here ever needs manual recalibration.
 *
 * Requires: npm install d3-geo topojson-client world-atlas
 * (topojson-specification is types only, install as a dev dependency if you want it)
 */

const WIDTH = 960;
const HEIGHT = 500;

const projection = geoNaturalEarth1()
  .scale(155)
  .translate([WIDTH / 2, HEIGHT / 2 + 20]);

const pathGenerator = geoPath(projection);

export function WorldMap() {
  const [land, setLand] = useState<GeoPermissibleObjects | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

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

  const mapped = destinations.filter(
    (d): d is typeof d & { lat: number; lng: number } =>
      typeof d.lat === "number" && typeof d.lng === "number"
  );

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

          return (
            <g
              key={d.slug}
              transform={`translate(${x} ${y})`}
              onMouseEnter={() => setHovered(d.slug)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                r={isHovered ? 13 : 0}
                fill="var(--gold, #d4af6a)"
                opacity={0.22}
                style={{ transition: "r 300ms ease" }}
              />
              <circle
                r={isHovered ? 5.5 : 3.5}
                fill="var(--gold, #d4af6a)"
                stroke="var(--navy, #0b1a2e)"
                strokeWidth={1}
                style={{ transition: "r 300ms ease" }}
              />
              {isHovered && (
                <g transform="translate(9 -8)">
                  <text
                    className="font-display"
                    fontSize={13}
                    fill="var(--primary-foreground, #f7f3ec)"
                  >
                    {d.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {hovered && (
        <div className="pointer-events-none absolute bottom-4 left-4 text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
          {mapped.find((d) => d.slug === hovered)?.name}
        </div>
      )}
    </div>
  );
}
