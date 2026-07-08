import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, MapPin, Check, ArrowRight } from "lucide-react";
import { destinations, packages } from "../lib/data";
import { Breadcrumbs } from "../components/site/breadcrumbs";
import { PackageCard } from "../components/site/package-card";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const dest = destinations.find((d) => d.slug === params.slug);
    if (!dest) throw notFound();
    return { dest };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { dest } = loaderData;
    return {
      meta: [
        { title: `${dest.name}, ${dest.country} — Aeris` },
        { name: "description", content: dest.description },
        { property: "og:title", content: `${dest.name}, ${dest.country}` },
        { property: "og:description", content: dest.tagline },
        { property: "og:image", content: dest.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial pt-40 pb-24 text-center">
      <h1 className="font-display text-4xl text-navy">Destination not found</h1>
      <Link to="/destinations" className="mt-6 inline-block text-teal">Browse all destinations</Link>
    </div>
  ),
  component: DestinationDetail,
});

function DestinationDetail() {
  const { dest } = Route.useLoaderData();
  const relatedPackages = packages.filter((p) => p.destinationSlug === dest.slug);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <article>
      <section ref={ref} className="relative h-[85svh] min-h-[560px] overflow-hidden">
        <motion.img
          style={{ y }}
          src={dest.image}
          alt={dest.name}
          className="absolute inset-0 h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/70" />
        <div className="relative container-editorial flex h-full flex-col justify-end pt-32 pb-16 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{dest.country} · {dest.region}</span>
            </div>
            <h1 className="mt-3 font-display text-5xl sm:text-7xl lg:text-8xl leading-[1.02]">
              {dest.name}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-primary-foreground/90 font-display italic">
              {dest.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-editorial py-6">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Destinations", to: "/destinations" }, { label: dest.name }]} />
      </div>

      <div className="container-editorial grid gap-16 py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl leading-[1.3] text-navy"
          >
            {dest.description}
          </motion.p>

          <div className="mt-16">
            <p className="text-eyebrow text-teal">Signature experiences</p>
            <ul className="mt-6 space-y-4">
              {dest.highlights.map((h: string, i: number) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 border-b border-border pb-4"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-lg text-navy">{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4">
            {dest.gallery.map((src: string, i: number) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`overflow-hidden rounded-2xl ${i % 3 === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]"}`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl card-elevated p-8">
            <p className="text-eyebrow text-teal">Trip details</p>
            <dl className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-navy mt-0.5" aria-hidden />
                <div>
                  <dt className="text-xs text-muted-foreground">Best time to go</dt>
                  <dd className="mt-1 text-navy font-medium">{dest.bestTime}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-navy mt-0.5" aria-hidden />
                <div>
                  <dt className="text-xs text-muted-foreground">Ideal duration</dt>
                  <dd className="mt-1 text-navy font-medium">{dest.duration}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">Trips from</p>
              <p className="font-display text-4xl text-navy">${dest.fromPrice.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">per person, based on double occupancy</p>
            </div>
            <Link
              to="/book"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-navy-soft transition-colors"
            >
              Plan this trip <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-4 text-sm font-medium text-navy hover:bg-secondary transition-colors"
            >
              Speak to a specialist
            </Link>
          </div>
        </aside>
      </div>

      {relatedPackages.length > 0 && (
        <section className="bg-secondary py-24">
          <div className="container-editorial">
            <p className="text-eyebrow text-teal">Sample itineraries</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy">Journeys in {dest.name}</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((p, i) => (
                <PackageCard key={p.slug} pkg={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
