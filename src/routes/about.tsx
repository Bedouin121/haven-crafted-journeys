import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { stats } from "../lib/data";
import { AnimatedNumber } from "../components/site/animated-number";
import { Breadcrumbs } from "../components/site/breadcrumbs";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aeris — A travel studio, not a booking engine" },
      { name: "description", content: "How Aeris designs journeys — a small studio of specialists, a network of trusted local partners, and eighteen years of considered travel." },
      { property: "og:title", content: "About Aeris" },
      { property: "og:description", content: "A small studio of travel specialists designing unhurried, meticulously planned journeys." },
    ],
  }),
  component: About,
});

const team = [
  { name: "Naomi Fujita", role: "Japan Specialist", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" },
  { name: "Tomás Fernández", role: "Latin America", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { name: "Clara Whitmore", role: "Europe & Mediterranean", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" },
  { name: "Kári Jónsson", role: "Nordic & Iceland", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" },
  { name: "Amara Okoye", role: "Africa & Safari", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
  { name: "James Whitfield", role: "Founder & Design Lead", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" },
];

function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-editorial">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 max-w-4xl"
        >
          <p className="text-eyebrow text-teal">Our studio</p>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl lg:text-8xl leading-[1.02] text-navy">
            A small studio, thoughtfully run.
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground max-w-3xl">
            Aeris was founded in 2008 on a simple premise: the best trips are quiet, considered, and shaped by
            people who have actually been there. Eighteen years later, we still work that way.
          </p>
        </motion.div>
      </div>

      <div className="container-editorial mt-20">
        <div className="grid gap-6 md:grid-cols-6">
          <div className="md:col-span-4 aspect-[16/10] rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1600&q=80" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="md:col-span-2 aspect-[4/5] rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80" alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <section className="container-editorial py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-eyebrow text-teal">Our belief</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy leading-[1.05]">
              Slower is almost always better.
            </h2>
          </div>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              The travel industry is built around fitting more in. More cities, more sights, more photographs. We think
              this is largely a mistake. The trips that stay with people are usually the ones with fewer things in them
              — and more room for the unexpected.
            </p>
            <p>
              We spend an unusual amount of time on the phone with clients before we design anything. We ask about the
              trips that mattered. We ask about the ones that didn't. Then we design something that isn't quite like
              anyone else's.
            </p>
            <p>
              We are a studio of thirteen. We take on around 240 trips a year. Beyond that, we start saying no.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy text-primary-foreground py-24">
        <div className="container-editorial">
          <p className="text-eyebrow text-gold-soft">By the numbers</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.05]">Eighteen years, quietly.</h2>
          <div className="mt-16 grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-white/15 pl-6">
                <p className="font-display text-6xl leading-none">
                  <AnimatedNumber value={s.value} /><span className="text-gold text-4xl">{s.suffix}</span>
                </p>
                <p className="mt-4 text-sm text-primary-foreground/70 max-w-[16ch]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-24">
        <p className="text-eyebrow text-teal">The team</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy leading-[1.05]">Specialists, not agents.</h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-navy">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-8">
        <div className="rounded-4xl bg-sand-deep px-8 py-16 sm:px-16 sm:py-24 text-center">
          <p className="text-eyebrow text-teal">Ready when you are</p>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl text-navy leading-[1.05] max-w-3xl mx-auto">
            Let's plan something extraordinary.
          </h2>
          <Link to="/book" className="mt-10 inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-base font-medium text-primary-foreground hover:bg-navy-soft transition-colors">
            Start a conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
