import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../lib/data";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Stories — Travel Tours" },
      { name: "description", content: "What our clients say about traveling with Travel Tours — a collection of first-person stories from journeys we've designed." },
      { property: "og:title", content: "Client Stories — Travel Tours" },
      { property: "og:description", content: "First-person stories from journeys designed by Travel Tours." },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <div className="pt-32 pb-24 container-editorial">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Client stories" }]} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 max-w-3xl"
      >
        <p className="text-eyebrow text-teal">Client stories</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
          In their own words.
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Unedited notes from clients — a few weeks after they've returned home, when the trip has properly settled.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="rounded-3xl bg-card card-elevated p-8 sm:p-10 flex flex-col"
          >
            <Quote className="h-8 w-8 text-gold" aria-hidden />
            <div className="flex gap-1 text-gold mt-4" aria-label={`${t.rating} out of 5`}>
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-6 font-display text-xl sm:text-2xl leading-[1.4] text-navy flex-1">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
              <img src={t.avatar} alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="font-medium text-navy">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.location} · {t.trip}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
