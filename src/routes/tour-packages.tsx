import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Users, Plane, Clock } from "lucide-react";
import { packages } from "../lib/data";
import { Breadcrumbs } from "../components/site/breadcrumbs";
import { PackageCard } from "../components/site/package-card";

// Slugs that are multi-destination combo packages or special group tours
const COMBO_SLUGS = new Set([
  "thailand-malaysia-combo",
  "singapore-malaysia-combo",
  "trio-thai-sin-mys",
  "maldives-sri-lanka",
  "canton-fair-tour",
  "china-guangzhou",
  "nepal-highlands",
  "bhutan-kingdom",
]);

export const Route = createFileRoute("/tour-packages")({
  head: () => ({
    meta: [
      { title: "Tour Packages — Upscale Travels Pvt. Ltd." },
      {
        name: "description",
        content:
          "Multi-destination tour packages and group journeys — Southeast Asia combos, Himalayan escapes, Canton Fair tours, and more.",
      },
      { property: "og:title", content: "Tour Packages — Upscale Travels Pvt. Ltd." },
      {
        property: "og:description",
        content: "Multi-destination combos and group tours across Asia and beyond.",
      },
    ],
  }),
  component: TourPackagesPage,
});

const highlights = [
  {
    icon: Plane,
    title: "All flights included",
    body: "Inter-city and connecting flights are bundled into every combo package — no separate booking needed.",
  },
  {
    icon: Users,
    title: "Group & private options",
    body: "Most packages run as guided group departures. Private arrangements are available on request.",
  },
  {
    icon: Check,
    title: "Visa support",
    body: "We handle tourist visa applications for every country in your itinerary as part of the package.",
  },
  {
    icon: Clock,
    title: "Fixed departures",
    body: "Packages run on set dates year-round. Contact us for the next available departure for your preferred journey.",
  },
];

function TourPackagesPage() {
  const [style, setStyle] = useState<string>("All");

  // All packages that are either combos or the newer single-destination short trips
  const allTourPackages = useMemo(
    () => packages.filter((p) => COMBO_SLUGS.has(p.slug)),
    [],
  );

  const styles = useMemo(() => {
    const unique = [...new Set(allTourPackages.map((p) => p.style))].sort();
    return ["All", ...unique] as string[];
  }, [allTourPackages]);

  const filtered = useMemo(
    () =>
      style === "All"
        ? allTourPackages
        : allTourPackages.filter((p) => p.style === style),
    [style, allTourPackages],
  );

  return (
    <div className="pt-32 pb-24">
      {/* Hero section */}
      <div className="container-editorial">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Tour Packages" },
          ]}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-eyebrow text-teal">Group & combo tours</p>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
            More countries,<br />one trip.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Our tour packages bundle two or more destinations into a single, seamlessly organised journey — with all
            flights, transfers, hotels, and visa support included from the start.
          </p>
        </motion.div>
      </div>

      {/* Highlights strip */}
      <div className="mt-16 bg-navy">
        <div className="container-editorial py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-3"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
                <h.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg text-primary-foreground">{h.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/70">{h.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Packages grid */}
      <section className="bg-secondary mt-0 pb-20 sm:pb-28">
        <div className="container-editorial pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="text-eyebrow text-teal">All packages</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy">
                {filtered.length} {style === "All" ? "available" : style.toLowerCase()} {filtered.length === 1 ? "package" : "packages"}
              </h2>
            </div>
            {/* Style filter */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by style">
              {styles.map((s) => (
                <button
                  key={s}
                  role="tab"
                  aria-selected={style === s}
                  onClick={() => setStyle(s)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    style === s
                      ? "bg-navy text-primary-foreground"
                      : "bg-card text-navy border border-border hover:bg-secondary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <PackageCard key={p.slug} pkg={p} index={i} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-lg text-muted-foreground py-16">
                No packages found for this style filter.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container-editorial py-16">
        <div className="relative overflow-hidden rounded-4xl bg-navy px-8 py-16 sm:px-16 sm:py-24 text-center cta-sweep">
          <p className="text-eyebrow text-gold-soft">Can't find what you're looking for?</p>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl text-primary-foreground leading-[1.05] max-w-2xl mx-auto">
            We'll build your trip from scratch.
          </h2>
          <p className="mt-5 text-xl text-primary-foreground/80 max-w-xl mx-auto">
            Tell us your destinations, dates, and budget — our specialists will put together a custom itinerary within two business days.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-medium text-brand-navy hover:bg-gold-soft transition-colors duration-700"
          >
            Talk to a specialist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
