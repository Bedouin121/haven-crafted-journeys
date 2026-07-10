import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Destination } from "../../lib/data";
import { SaveButton } from "./save-button";
import { useTilt } from "../../hooks/use-interactions";

export function DestinationCard({ dest, index = 0 }: { dest: Destination; index?: number }) {
  const tilt = useTilt(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      ref={tilt.ref as React.RefObject<HTMLElement>}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      className="tilt-card"
    >
      <div className="group block rounded-3xl overflow-hidden bg-card card-elevated hover-lift relative">
        {/* Save button — top-right, outside the link */}
        <div className="absolute top-4 left-4 z-10">
          <SaveButton
            item={{
              id: `dest-${dest.slug}`,
              type: "destination",
              slug: dest.slug,
              title: dest.name,
              subtitle: dest.country,
              image: dest.image,
              price: dest.fromPrice,
            }}
          />
        </div>

        <Link
          to="/destinations/$slug"
          params={{ slug: dest.slug }}
          className="block focus:outline-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={dest.image}
              alt={`${dest.name}, ${dest.country}`}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0";
              }}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground text-center">
              <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] opacity-90">
                <MapPin className="h-3.5 w-3.5" />
                <span>{dest.country}</span>
              </div>
              <h3 className="mt-2 font-display text-3xl">{dest.name}</h3>
              <p className="mt-1 text-base text-primary-foreground/85 line-clamp-2">{dest.tagline}</p>
            </div>
            <div className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full glass-panel text-navy opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-10 px-6 py-5 text-center">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="font-display text-lg text-navy">${dest.fromPrice.toLocaleString()}</p>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden />
            <div>
              <p className="text-xs text-muted-foreground">Ideal</p>
              <p className="text-sm text-navy">{dest.duration}</p>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
