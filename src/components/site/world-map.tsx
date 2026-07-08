import { destinations } from "../../lib/data";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function WorldMap() {
  return (
    <div className="relative aspect-[16/9] w-full rounded-3xl bg-navy overflow-hidden">
      <div className="absolute inset-0 opacity-[0.35]" aria-hidden>
        {/* Dotted world map — decorative SVG grid */}
        <svg viewBox="0 0 1600 900" className="h-full w-full">
          <defs>
            <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="oklch(0.72 0.11 78 / 0.55)" />
            </pattern>
            <mask id="continents">
              <rect width="100%" height="100%" fill="black" />
              <g fill="white">
                {/* Rough continental shapes for a dotted-world-map feel */}
                <path d="M180 250 Q260 200 380 240 T580 280 Q620 330 560 380 T460 420 Q380 460 300 430 T200 380 Q140 320 180 250Z" />
                <path d="M700 260 Q820 220 940 260 T1160 300 Q1220 360 1140 400 T980 420 Q880 440 800 400 T700 340Z" />
                <path d="M760 500 Q840 480 900 530 T1000 620 Q980 700 900 720 T780 700 Q740 640 760 500Z" />
                <path d="M420 500 Q500 470 560 520 T600 620 Q580 720 500 740 T400 720 Q360 640 420 500Z" />
                <path d="M1200 600 Q1280 580 1340 620 T1360 700 Q1300 740 1240 720 T1200 660Z" />
              </g>
            </mask>
          </defs>
          <rect width="1600" height="900" fill="url(#dots)" mask="url(#continents)" />
        </svg>
      </div>

      {destinations.map((d, i) => (
        <motion.div
          key={d.slug}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
          className="absolute"
          style={{ left: `${d.coordinates.x}%`, top: `${d.coordinates.y}%` }}
        >
          <Link
            to="/destinations/$slug"
            params={{ slug: d.slug }}
            className="group relative block -translate-x-1/2 -translate-y-1/2"
            aria-label={`Explore ${d.name}`}
          >
            <span className="absolute inset-0 -m-2 rounded-full bg-gold/40 animate-ping" aria-hidden />
            <span className="relative grid h-4 w-4 place-items-center rounded-full bg-gold ring-4 ring-navy transition-transform group-hover:scale-125" />
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-3 py-1 text-xs font-medium text-navy opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {d.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
