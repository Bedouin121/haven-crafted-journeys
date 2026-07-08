import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { packages } from "../lib/data";
import { PackageCard } from "../components/site/package-card";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Journeys — Aeris Travel Studio" },
      { name: "description", content: "Signature itineraries designed by Aeris specialists — cultural, adventure, romantic, and family journeys across six continents." },
      { property: "og:title", content: "Journeys — Aeris" },
      { property: "og:description", content: "Signature itineraries designed by Aeris specialists." },
    ],
  }),
  component: PackagesPage,
});

const styles = ["All", "Cultural", "Adventure", "Romantic", "Family", "Luxury"] as const;

function PackagesPage() {
  const [style, setStyle] = useState<(typeof styles)[number]>("All");
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc" | "duration">("popular");

  const filtered = useMemo(() => {
    let list = style === "All" ? [...packages] : packages.filter((p) => p.style === style);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "duration": list.sort((a, b) => b.nights - a.nights); break;
      default: list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [style, sort]);

  return (
    <div className="pt-32 pb-24 container-editorial">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Journeys" }]} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 max-w-3xl"
      >
        <p className="text-eyebrow text-teal">Signature journeys</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
          Itineraries, honestly considered.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Each is a starting point, not a package. Use them for inspiration, then let us shape them into something
          entirely yours.
        </p>
      </motion.div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by style">
          {styles.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={style === s}
              onClick={() => setStyle(s)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                style === s ? "bg-navy text-primary-foreground" : "bg-secondary text-navy hover:bg-sand-deep"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="popular">Most loved</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="duration">Duration</option>
          </select>
        </label>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <PackageCard key={p.slug} pkg={p} index={i} />
        ))}
      </div>
    </div>
  );
}
