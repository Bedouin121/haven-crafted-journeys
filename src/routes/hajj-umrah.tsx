import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Clock, ArrowRight, MapPin, Check } from "lucide-react";
import { z } from "zod";
import { hajjUmrahPackages } from "../lib/data";
import { Breadcrumbs } from "../components/site/breadcrumbs";
import { SaveButton } from "../components/site/save-button";

const searchSchema = z.object({
  type: z.enum(["hajj", "umrah"]).optional().catch(undefined),
});

export const Route = createFileRoute("/hajj-umrah")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Hajj & Umrah Packages — Diganta Overseas" },
      {
        name: "description",
        content:
          "Government-approved Hajj and Umrah packages — 3, 4 and 5-star hotels near the Haram, with experienced scholars, private transfers, and full ritual guidance.",
      },
      { property: "og:title", content: "Hajj & Umrah Packages — Diganta Overseas" },
      {
        property: "og:description",
        content: "Government-approved Hajj and Umrah packages with experienced scholars and full ritual guidance.",
      },
    ],
  }),
  component: HajjUmrahPage,
});

const typeLabels = {
  hajj: "Hajj Packages",
  umrah: "Umrah Packages",
} as const;

function HajjUmrahPage() {
  const { type } = Route.useSearch();

  const filtered = useMemo(() => {
    const list = type ? hajjUmrahPackages.filter((p) => p.type === type) : [...hajjUmrahPackages];
    return list.sort((a, b) => a.price - b.price);
  }, [type]);

  const heading = type
    ? typeLabels[type]
    : "Hajj & Umrah, thoughtfully arranged.";

  const subtitle = type
    ? `Our current ${typeLabels[type].toLowerCase()} — each with experienced scholars, comfortable accommodation near the Haram, and full ritual guidance.`
    : "Government-approved Hajj and Umrah journeys designed around comfort, scholarship, and ihsan. From express 7-night Umrahs to premium Hajj packages — pick a pace, we'll take care of the rest.";

  return (
    <div className="pt-32 pb-24 container-editorial">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Hajj & Umrah", to: "/hajj-umrah" },
          ...(type ? [{ label: typeLabels[type] }] : []),
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 max-w-3xl"
      >
        <p className="text-eyebrow text-teal">Sacred journeys</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
          {heading}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{subtitle}</p>
      </motion.div>

      {/* Filter tabs */}
      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter by type">
        <Link
          to="/hajj-umrah"
          role="tab"
          aria-selected={!type}
          className={`rounded-full px-5 py-2.5 text-base font-medium transition-colors ${
            !type ? "bg-navy text-primary-foreground" : "bg-secondary text-navy hover:bg-sand-deep"
          }`}
        >
          All Packages
        </Link>
        <Link
          to="/hajj-umrah"
          search={{ type: "hajj" }}
          role="tab"
          aria-selected={type === "hajj"}
          className={`rounded-full px-5 py-2.5 text-base font-medium transition-colors ${
            type === "hajj" ? "bg-navy text-primary-foreground" : "bg-secondary text-navy hover:bg-sand-deep"
          }`}
        >
          Hajj Packages
        </Link>
        <Link
          to="/hajj-umrah"
          search={{ type: "umrah" }}
          role="tab"
          aria-selected={type === "umrah"}
          className={`rounded-full px-5 py-2.5 text-base font-medium transition-colors ${
            type === "umrah" ? "bg-navy text-primary-foreground" : "bg-secondary text-navy hover:bg-sand-deep"
          }`}
        >
          Umrah Packages
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col rounded-3xl bg-card overflow-hidden card-elevated hover-lift"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-navy uppercase tracking-wide">
                {p.type}
              </span>
              <div className="absolute top-4 right-4 flex items-center gap-0.5 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-navy">
                {Array.from({ length: p.hotelRating }).map((_, idx) => (
                  <Star key={idx} className="h-3 w-3 fill-gold text-gold" aria-hidden />
                ))}
                <span className="ml-1">{p.hotelRating}★</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent px-5 pb-4 pt-10 flex items-end justify-between">
                <div className="flex items-center gap-1.5 text-primary-foreground">
                  <Clock className="h-4 w-4 opacity-80" aria-hidden />
                  <span className="text-sm font-semibold">
                    {p.nights} nights / {p.days} days
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-primary-foreground/70">From</p>
                  <p className="font-display text-2xl text-primary-foreground leading-none">
                    ${p.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-primary-foreground/70">/ person</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5 flex-1">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {p.departure}
                </p>
                <h3 className="mt-1 font-display text-xl text-navy leading-snug">{p.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-start gap-1.5 rounded-2xl bg-teal/8 border border-teal/15 px-3 py-2 text-xs text-teal">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <p className="font-semibold uppercase tracking-wide opacity-80">Makkah</p>
                    <p className="text-navy leading-tight mt-0.5">{p.makkahHotel}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 rounded-2xl bg-teal/8 border border-teal/15 px-3 py-2 text-xs text-teal">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <p className="font-semibold uppercase tracking-wide opacity-80">Madinah</p>
                    <p className="text-navy leading-tight mt-0.5">{p.madinahHotel}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.summary}</p>

              <ul className="mt-1 space-y-1.5">
                {p.inclusions.slice(0, 3).map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-xs text-navy">
                    <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-teal" aria-hidden />
                    <span>{inc}</span>
                  </li>
                ))}
                {p.inclusions.length > 3 && (
                  <li className="text-xs text-muted-foreground pl-5">
                    + {p.inclusions.length - 3} more inclusions
                  </li>
                )}
              </ul>

              <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
                <SaveButton
                  item={{
                    id: `hu-${p.slug}`,
                    type: "package",
                    slug: p.slug,
                    title: p.title,
                    subtitle: `${p.nights} nights · ${p.hotelRating}★`,
                    image: p.image,
                    price: p.price,
                  }}
                />
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-teal transition-colors duration-500"
                >
                  Enquire
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-navy transition-all group-hover:bg-navy group-hover:text-primary-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          No packages available in this category right now.
        </div>
      )}
    </div>
  );
}
