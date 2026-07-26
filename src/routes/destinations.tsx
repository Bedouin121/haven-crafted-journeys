import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { z } from "zod";
import {
  destinations,
  getDestinationCategories,
  destinationCategorySlugs,
  type DestinationCategorySlug,
} from "../lib/data";
import { DestinationCard } from "../components/site/destination-card";
import { Breadcrumbs } from "../components/site/breadcrumbs";

const searchSchema = z.object({
  category: z
    .enum(["international", "domestic", "honeymoon", "group"])
    .optional()
    .catch(undefined),
});

export const Route = createFileRoute("/destinations")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Destinations — Travel Tours" },
      { name: "description", content: "From Kyoto's temple gardens to Patagonia's granite spires — explore the destinations Travel Tours travel designers know best." },
      { property: "og:title", content: "Destinations — Travel Tours" },
      { property: "og:description", content: "Explore the destinations Travel Tours travel designers know best." },
    ],
  }),
  component: DestinationsPage,
});

const regions = ["All", "Asia", "Americas", "Africa"] as const;

const categoryLabels: Record<DestinationCategorySlug, string> = {
  international: "International Tours",
  domestic: "Domestic Tours",
  honeymoon: "Honeymoon Packages",
  group: "Group Tours",
};

function DestinationsPage() {
  const { category } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<(typeof regions)[number]>("All");

  const activeCategory = category ? destinationCategorySlugs[category] : null;

  const filtered = useMemo(
    () =>
      destinations.filter((d) => {
        const okRegion = region === "All" || d.region === region;
        const q = query.trim().toLowerCase();
        const okQ = !q || d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q);
        const okCat = !activeCategory || getDestinationCategories(d.slug).includes(activeCategory);
        return okRegion && okQ && okCat;
      }),
    [query, region, activeCategory],
  );

  const heading = activeCategory
    ? categoryLabels[category as DestinationCategorySlug]
    : "The places we know best.";

  return (
    <div className="pt-32 pb-24 container-editorial">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Destinations", to: "/destinations" },
          ...(activeCategory ? [{ label: categoryLabels[category as DestinationCategorySlug] }] : []),
        ]}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 max-w-3xl"
      >
        <p className="text-eyebrow text-teal">
          {activeCategory ? "Destinations" : "Destinations"}
        </p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
          {heading}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {activeCategory
            ? `Showing our ${categoryLabels[category as DestinationCategorySlug].toLowerCase()}. Each has been designed and delivered by a specialist on our team.`
            : "Six regions, six specialists. Each of these destinations has been designed and delivered by a member of our team who has spent years — sometimes decades — walking their streets."}
        </p>
      </motion.div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations…"
            aria-label="Search destinations"
            className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by region">
          {regions.map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={region === r}
              onClick={() => setRegion(r)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                region === r
                  ? "bg-navy text-primary-foreground"
                  : "bg-secondary text-navy hover:bg-sand-deep"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, i) => (
          <DestinationCard key={d.slug} dest={d} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          Nothing found. Try a different search or region.
        </div>
      )}
    </div>
  );
}
