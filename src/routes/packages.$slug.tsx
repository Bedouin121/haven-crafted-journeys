import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, MapPin, Check, ArrowRight, Plus } from "lucide-react";
import { packages } from "../lib/data";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const pkg = packages.find((p) => p.slug === params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { pkg } = loaderData;
    return {
      meta: [
        { title: `${pkg.title} — Travel Tours` },
        { name: "description", content: pkg.summary },
        { property: "og:title", content: pkg.title },
        { property: "og:description", content: pkg.summary },
        { property: "og:image", content: pkg.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial pt-40 pb-24 text-center">
      <h1 className="font-display text-4xl text-navy">Journey not found</h1>
      <Link to="/packages" className="mt-6 inline-block text-teal">See all journeys</Link>
    </div>
  ),
  component: PackageDetail,
});

function PackageDetail() {
  const { pkg } = Route.useLoaderData();
  const [openDay, setOpenDay] = useState<number | null>(1);

  return (
    <article>
      <section className="relative h-[75svh] min-h-[520px] overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-navy/80" />
        <div className="relative container-editorial flex h-full flex-col justify-end pt-32 pb-14 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1">{pkg.style}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {pkg.destination}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {pkg.nights} nights</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" /> {pkg.rating} ({pkg.reviews})</span>
            </div>
            <h1 className="mt-4 max-w-4xl font-display text-5xl sm:text-7xl leading-[1.02]">
              {pkg.title}
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="container-editorial py-6">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Journeys", to: "/packages" }, { label: pkg.title }]} />
      </div>

      <div className="container-editorial grid gap-16 py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-24">
        <div>
          <p className="font-display text-3xl leading-[1.35] text-navy">{pkg.summary}</p>

          <section className="mt-16">
            <p className="text-eyebrow text-teal">The itinerary</p>
            <h2 className="mt-3 font-display text-4xl text-navy">Day by day</h2>
            <div className="mt-10 space-y-3">
              {pkg.itinerary.map((it: { day: number; title: string; body: string }) => {
                const isOpen = openDay === it.day;
                return (
                  <div key={it.day} className="rounded-2xl border border-border bg-card overflow-hidden">
                    <button
                      onClick={() => setOpenDay(isOpen ? null : it.day)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-5 px-6 py-5 text-left"
                    >
                      <span className="font-display text-xl text-teal shrink-0 w-16">Day {it.day}</span>
                      <span className="flex-1 font-display text-xl text-navy">{it.title}</span>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-transform ${isOpen ? "rotate-45 bg-navy text-primary-foreground border-navy" : ""}`} aria-hidden>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <p className="pl-[104px] pr-12 pb-6 text-muted-foreground leading-relaxed">{it.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-16">
            <p className="text-eyebrow text-teal">What's included</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {pkg.inclusions.map((inc: string) => (
                <li key={inc} className="flex items-start gap-3 text-navy">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-soft text-teal mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl card-elevated p-8">
            <p className="text-eyebrow text-teal">Booking summary</p>
            <p className="mt-4 font-display text-2xl text-navy leading-tight">{pkg.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{pkg.destination} · {pkg.nights} nights</p>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-display text-4xl text-navy">${pkg.price.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">per person, twin share. Adaptable.</p>
            </div>
            <Link
              to="/book"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-base font-medium text-primary-foreground hover:bg-navy-soft transition-colors duration-700"
            >
              Enquire about this trip <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground text-center">No obligation. A specialist replies within one business day.</p>
          </div>
        </aside>
      </div>
    </article>
  );
}
