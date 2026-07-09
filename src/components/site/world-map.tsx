import { destinations } from "../../lib/data";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function WorldMap() {
  return (
    <div className="relative aspect-[16/9] w-full rounded-3xl bg-navy overflow-hidden">
      {/* Dotted continent map */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg
          viewBox="0 0 1600 900"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <pattern id="map-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.6" fill="rgba(200,170,100,0.45)" />
            </pattern>
            <mask id="land-mask">
              <rect width="1600" height="900" fill="black" />
              <g fill="white">
                {/* North America */}
                <path d="M 155 80 L 200 65 L 260 70 L 310 85 L 330 110 L 345 140 L 320 170 L 340 195 L 360 225 L 370 260 L 355 290 L 330 310 L 295 330 L 260 340 L 240 320 L 210 310 L 185 285 L 170 255 L 160 220 L 155 190 L 140 170 L 135 145 L 140 115 Z" />
                {/* Greenland */}
                <path d="M 370 30 L 410 25 L 445 40 L 450 65 L 430 85 L 400 90 L 375 75 L 365 52 Z" />
                {/* Central America / Caribbean bridge */}
                <path d="M 220 335 L 255 345 L 270 370 L 260 395 L 240 400 L 220 380 L 215 355 Z" />
                {/* South America */}
                <path d="M 250 415 L 295 405 L 340 420 L 370 460 L 385 510 L 380 560 L 360 610 L 330 660 L 300 700 L 270 720 L 245 700 L 230 660 L 225 610 L 235 555 L 240 500 L 235 455 Z" />
                {/* Europe */}
                <path d="M 730 80 L 770 70 L 810 75 L 840 95 L 830 120 L 800 135 L 775 145 L 750 140 L 730 125 L 720 105 Z" />
                {/* Scandinavia */}
                <path d="M 770 38 L 795 30 L 820 38 L 830 60 L 815 80 L 790 85 L 768 70 Z" />
                {/* Africa */}
                <path d="M 730 185 L 790 175 L 840 185 L 870 215 L 880 265 L 875 330 L 855 395 L 835 455 L 810 510 L 785 555 L 760 575 L 735 560 L 715 510 L 700 450 L 690 385 L 690 320 L 700 260 L 710 215 Z" />
                {/* Asia — main body */}
                <path d="M 840 75 L 940 60 L 1050 65 L 1140 80 L 1210 100 L 1270 125 L 1300 160 L 1290 200 L 1250 225 L 1200 240 L 1150 255 L 1100 265 L 1050 275 L 1000 270 L 950 260 L 900 245 L 860 225 L 840 200 L 830 165 L 835 125 Z" />
                {/* Indian subcontinent */}
                <path d="M 1020 265 L 1055 270 L 1075 305 L 1070 350 L 1050 380 L 1025 370 L 1005 340 L 1005 300 Z" />
                {/* Southeast Asia */}
                <path d="M 1180 240 L 1230 250 L 1270 280 L 1275 320 L 1255 345 L 1220 345 L 1190 320 L 1175 285 Z" />
                {/* Japan */}
                <path d="M 1310 160 L 1340 150 L 1360 165 L 1355 190 L 1330 200 L 1310 190 Z" />
                {/* Australia */}
                <path d="M 1260 480 L 1330 460 L 1400 465 L 1450 490 L 1470 535 L 1460 580 L 1425 615 L 1380 625 L 1330 615 L 1290 590 L 1265 550 L 1255 510 Z" />
                {/* New Zealand */}
                <path d="M 1470 595 L 1490 580 L 1505 595 L 1500 620 L 1480 630 Z" />
                {/* Middle East */}
                <path d="M 870 185 L 920 180 L 950 200 L 960 230 L 940 255 L 905 258 L 875 240 L 862 210 Z" />
              </g>
            </mask>
          </defs>

          {/* Ocean background */}
          <rect width="1600" height="900" fill="oklch(0.22 0.04 250)" />
          {/* Land dots */}
          <rect width="1600" height="900" fill="url(#map-dots)" mask="url(#land-mask)" />
        </svg>
      </div>

      {/* Destination markers */}
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
