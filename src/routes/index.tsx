import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Search, MapPin, Compass, Award, HeartHandshake, Sparkles, ArrowRight, Calendar, Users,
} from "lucide-react";
import { destinations, packages, articles, stats } from "../lib/data";
import { DestinationCard } from "../components/site/destination-card";
import { PackageCard } from "../components/site/package-card";
import { SectionHeading } from "../components/site/section-heading";
import { TestimonialCarousel } from "../components/site/testimonial-carousel";
import { WorldMap } from "../components/site/world-map";
import { AnimatedNumber } from "../components/site/animated-number";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aeris — Bespoke Travel, Beautifully Considered" },
      { name: "description", content: "Aeris designs unhurried, meticulously planned journeys — from Kyoto teahouses to Patagonian glaciers." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1533165850316-2f28e485115a?auto=format&fit=crop&w=1600&q=80" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="pt-0">
      <Hero />
      <Stats />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyUs />
      <MapSection />
      <Testimonials />
      <Journal />
      <Newsletter />
    </div>
  );
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1533165850316-2f28e485115a?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=85",
];

function HeroSlideshow() {
  const [idx, setIdx] = useState(0);

  // Preload all hero images as soon as this component mounts
  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {HERO_IMAGES.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          aria-hidden
          initial={false}
          animate={{
            opacity: i === idx ? 1 : 0,
            scale: i === idx ? 1.08 : 1,
          }}
          transition={{
            opacity: { duration: 1.4, ease: "easeInOut" },
            scale: { duration: 8, ease: "linear" },
          }}
          // Eagerly load the first image; lazily load the rest
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          decoding={i === 0 ? "sync" : "async"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-navy">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <HeroSlideshow />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,26,46,0.35)_60%,rgba(11,26,46,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/70" />
      </motion.div>

      <div className="relative container-editorial flex min-h-[100svh] flex-col justify-end pt-32 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-eyebrow text-gold-soft"
        >
          Est. 2008 · Bespoke Travel Studio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-5xl font-display text-5xl leading-[1.02] text-primary-foreground sm:text-7xl lg:text-8xl"
        >
          The world, slowly and beautifully.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-primary-foreground/90"
        >
          We design unhurried, meticulously planned journeys for travelers who value the quiet things — a
          garden at sunrise, a chef who cooks only for you, a guide who knows exactly where to stand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12"
        >
          <SearchWidget />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/70"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-primary-foreground/40"
        />
      </motion.div>
    </section>
  );
}

function SearchWidget() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="glass-panel rounded-3xl p-2 sm:p-3 max-w-3xl shadow-lift"
    >
      <div className="grid gap-1 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
        <label className="group rounded-2xl px-5 py-3 hover:bg-white/50 transition-colors cursor-text">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-navy/70">Destination</span>
          <div className="mt-1 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-navy/60" aria-hidden />
            <input
              type="text"
              placeholder="Where to?"
              className="w-full bg-transparent text-sm text-navy placeholder:text-navy/40 focus:outline-none"
              aria-label="Destination"
            />
          </div>
        </label>
        <label className="group rounded-2xl px-5 py-3 hover:bg-white/50 transition-colors cursor-text">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-navy/70">Dates</span>
          <div className="mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-navy/60" aria-hidden />
            <input
              type="date"
              className="w-full bg-transparent text-sm text-navy placeholder:text-navy/40 focus:outline-none"
              aria-label="Travel dates"
            />
          </div>
        </label>
        <label className="group rounded-2xl px-5 py-3 hover:bg-white/50 transition-colors cursor-text">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-navy/70">Travelers</span>
          <div className="mt-1 flex items-center gap-2">
            <Users className="h-4 w-4 text-navy/60" aria-hidden />
            <input
              type="text"
              placeholder="2 adults"
              className="w-full bg-transparent text-sm text-navy placeholder:text-navy/40 focus:outline-none"
              aria-label="Number of travelers"
            />
          </div>
        </label>
        <button
          type="submit"
          className="grid place-items-center rounded-2xl bg-navy px-6 py-4 text-primary-foreground hover:bg-navy-soft transition-colors"
          aria-label="Search journeys"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

function Stats() {
  return (
    <section className="container-editorial py-24 sm:py-32">
      <div className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="border-l border-border pl-6"
          >
            <p className="font-display text-6xl text-navy leading-none">
              <AnimatedNumber value={s.value} />
              <span className="text-gold text-4xl">{s.suffix}</span>
            </p>
            <p className="mt-4 text-sm text-muted-foreground max-w-[14ch]">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PopularDestinations() {
  return (
    <section className="container-editorial py-24 sm:py-32">
      <SectionHeading
        eyebrow="Where to next"
        title="Destinations we adore."
        intro="Six places we return to again and again. Each hand-designed by a specialist who has lived, walked, and eaten their way through it."
        action={
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-teal transition-colors group"
          >
            View all destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.slice(0, 6).map((d, i) => (
          <DestinationCard key={d.slug} dest={d} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeaturedPackages() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Signature journeys"
          title="Ready-to-adapt itineraries."
          intro="Four of our most-loved itineraries. Every one is a starting point — we'll shape it around you."
          action={
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-teal transition-colors group"
            >
              All journeys
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.slice(0, 4).map((p, i) => (
            <PackageCard key={p.slug} pkg={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const pillars = [
    { icon: Compass, title: "Genuinely bespoke", body: "Every itinerary is designed from a blank page. No templates, no packaged tours." },
    { icon: HeartHandshake, title: "Human, always", body: "One specialist from first call to safe return. On the road, a local partner in every destination." },
    { icon: Award, title: "The right partners", body: "Small, locally-owned lodges. Guides who are the best in their region, not the loudest." },
    { icon: Sparkles, title: "Quietly considered", body: "The little things — a folder of maps in your hotel room, dinner on a night we know is special." },
  ];
  return (
    <section className="container-editorial py-24 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <SectionHeading
          eyebrow="Why Aeris"
          title="A travel studio, not a booking engine."
        />
        <div className="grid gap-8 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl p-6 hover:bg-secondary transition-colors"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-primary-foreground">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl text-navy">{p.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="container-editorial py-24 sm:py-32">
      <SectionHeading
        eyebrow="Our map"
        title="Six continents, one studio."
        intro="Hover a marker for a snapshot. Click through for the full destination story."
        align="center"
      />
      <div className="mt-16">
        <WorldMap />
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="container-editorial py-24 sm:py-32">
      <TestimonialCarousel />
    </section>
  );
}

function Journal() {
  return (
    <section className="container-editorial py-24 sm:py-32">
      <SectionHeading
        eyebrow="Journal"
        title="Notes from the road."
        action={
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-teal group"
          >
            Read all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {articles.slice(0, 3).map((a, i) => (
          <motion.article
            key={a.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Link to="/blog/$slug" params={{ slug: a.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-teal">
                {a.category} · {a.readTime}
              </p>
              <h3 className="mt-3 font-display text-2xl text-navy group-hover:text-teal transition-colors leading-tight">
                {a.title}
              </h3>
              <p className="mt-3 text-muted-foreground line-clamp-2">{a.excerpt}</p>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="container-editorial pb-4">
      <div className="relative overflow-hidden rounded-4xl bg-sand-deep px-8 py-16 sm:px-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-eyebrow text-teal">Postcards</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy leading-[1.05]">
            A quiet letter, once a month.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Small-print destinations, honest advice, and the occasional restaurant we probably shouldn't share.
          </p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="nl-email" className="sr-only">Email</label>
            <input
              id="nl-email"
              type="email"
              required
              placeholder="you@somewhere.com"
              className="flex-1 rounded-full bg-background px-6 py-4 text-base text-navy placeholder:text-navy/40 border border-border focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <button className="rounded-full bg-navy px-8 py-4 text-base font-medium text-primary-foreground hover:bg-navy-soft transition-colors">
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">No spam. Unsubscribe anytime. We hate inbox clutter too.</p>
        </div>
      </div>
    </section>
  );
}
