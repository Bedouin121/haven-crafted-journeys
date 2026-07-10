import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Clock, ArrowRight, Plane, UtensilsCrossed, Car, Users, Wifi } from "lucide-react";
import type { Package } from "../../lib/data";
import { SaveButton } from "./save-button";
import { useTilt } from "../../hooks/use-interactions";

// Map each style to a fixed set of "included perks" bubbles
const STYLE_PERKS: Record<Package["style"], { icon: React.ComponentType<{ className?: string }>; label: string }[]> = {
  Cultural: [
    { icon: Car, label: "Airport pickup" },
    { icon: UtensilsCrossed, label: "Meals included" },
    { icon: Users, label: "Private guide" },
  ],
  Adventure: [
    { icon: Car, label: "Transfers" },
    { icon: UtensilsCrossed, label: "All meals" },
    { icon: Plane, label: "Internal flights" },
  ],
  Romantic: [
    { icon: Car, label: "Airport pickup" },
    { icon: UtensilsCrossed, label: "Breakfast daily" },
    { icon: Wifi, label: "Villa Wi-Fi" },
  ],
  Family: [
    { icon: Plane, label: "Internal flights" },
    { icon: UtensilsCrossed, label: "All meals" },
    { icon: Car, label: "Private vehicle" },
  ],
  Luxury: [
    { icon: Car, label: "Chauffeur" },
    { icon: UtensilsCrossed, label: "Fine dining" },
    { icon: Plane, label: "Private transfers" },
  ],
};

export function PackageCard({
  pkg,
  index = 0,
  onCompare,
  inTray,
  canAdd,
}: {
  pkg: Package;
  index?: number;
  onCompare?: (pkg: Package) => void;
  inTray?: boolean;
  canAdd?: boolean;
}) {
  const tilt = useTilt(3);
  const perks = STYLE_PERKS[pkg.style] ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      ref={tilt.ref as React.RefObject<HTMLElement>}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      className="tilt-card group flex flex-col rounded-3xl bg-card overflow-hidden card-elevated hover-lift"
    >
      <Link
        to="/packages/$slug"
        params={{ slug: pkg.slug }}
        className="flex flex-col h-full focus:outline-none"
      >
        {/* Image */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
          {/* Top-left: style badge */}
          <span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-navy">
            {pkg.style}
          </span>
          {/* Top-right: star rating */}
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-navy">
            <Star className="h-3 w-3 fill-gold text-gold" aria-hidden /> {pkg.rating}
            <span className="text-muted-foreground ml-0.5">({pkg.reviews})</span>
          </div>
          {/* Bottom overlay: nights + price in large readable callouts */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent px-5 pb-4 pt-10 flex items-end justify-between">
            <div className="flex items-center gap-1.5 text-primary-foreground">
              <Clock className="h-4 w-4 opacity-80" aria-hidden />
              <span className="text-sm font-semibold">{pkg.nights} nights</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-primary-foreground/70">From</p>
              <p className="font-display text-2xl text-primary-foreground leading-none">
                ${pkg.price.toLocaleString()}
              </p>
              <p className="text-xs text-primary-foreground/70">/ person</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{pkg.destination}</p>
            <h3 className="mt-1 font-display text-xl text-navy leading-snug">{pkg.title}</h3>
          </div>

          {/* Info bubbles */}
          <div className="flex flex-wrap gap-2 mt-1">
            {/* Days bubble */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/8 border border-navy/12 px-3 py-1.5 text-xs font-semibold text-navy">
              <Clock className="h-3.5 w-3.5 text-teal" aria-hidden />
              {pkg.nights} nights / {pkg.nights + 1} days
            </span>
            {/* Perks */}
            {perks.map((perk) => (
              <span
                key={perk.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-teal/8 border border-teal/15 px-3 py-1.5 text-xs font-semibold text-teal"
              >
                <perk.icon className="h-3.5 w-3.5" aria-hidden />
                {perk.label}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mt-1">{pkg.summary}</p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-end pt-3 border-t border-border">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-teal transition-colors duration-500">
              View journey
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-navy transition-all group-hover:bg-navy group-hover:text-primary-foreground">
                <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </div>
        </div>
      </Link>

      {/* Save + Compare row */}
      <div className="flex items-center justify-between gap-2 px-5 pb-4 -mt-2">
        <SaveButton
          item={{
            id: `pkg-${pkg.slug}`,
            type: "package",
            slug: pkg.slug,
            title: pkg.title,
            subtitle: `${pkg.destination} · ${pkg.nights} nights`,
            image: pkg.image,
            price: pkg.price,
          }}
        />
        {onCompare && (
          <button
            type="button"
            onClick={() => onCompare(pkg)}
            disabled={!inTray && !canAdd}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 glow-focus ${
              inTray
                ? "bg-teal/10 text-teal border-2 border-teal booking-tab-active"
                : canAdd
                  ? "bg-secondary text-navy hover:bg-sand-deep border-2 border-transparent"
                  : "opacity-40 cursor-not-allowed bg-secondary text-muted-foreground border-2 border-transparent"
            }`}
            aria-pressed={inTray}
            aria-label={inTray ? `Remove ${pkg.title} from comparison` : `Add ${pkg.title} to comparison`}
          >
            {inTray ? "✓ Comparing" : "Compare"}
          </button>
        )}
      </div>
    </motion.article>
  );
}
