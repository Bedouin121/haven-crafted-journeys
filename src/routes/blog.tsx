import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { articles } from "../lib/data";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Aeris Travel Studio" },
      { name: "description", content: "Field notes, destination guides, and quiet essays from Aeris travel designers." },
      { property: "og:title", content: "The Aeris Journal" },
      { property: "og:description", content: "Field notes, destination guides, and quiet essays from Aeris travel designers." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [feature, ...rest] = articles;
  return (
    <div className="pt-32 pb-24 container-editorial">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Journal" }]} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 max-w-3xl"
      >
        <p className="text-eyebrow text-teal">The Aeris Journal</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
          Notes from the road.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Field guides, restaurant recommendations, and the occasional quiet opinion.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16"
      >
        <Link to="/blog/$slug" params={{ slug: feature.slug }} className="group grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl">
            <img src={feature.image} alt={feature.title} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
          </div>
          <div>
            <p className="text-eyebrow text-teal">Featured · {feature.category}</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy leading-[1.05] group-hover:text-teal transition-colors">{feature.title}</h2>
            <p className="mt-5 text-lg text-muted-foreground">{feature.excerpt}</p>
            <p className="mt-6 text-sm text-muted-foreground">By {feature.author} · {feature.date} · {feature.readTime}</p>
          </div>
        </Link>
      </motion.div>

      <div className="mt-24 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((a, i) => (
          <motion.article
            key={a.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Link to="/blog/$slug" params={{ slug: a.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-teal">{a.category} · {a.readTime}</p>
              <h3 className="mt-3 font-display text-2xl text-navy group-hover:text-teal transition-colors leading-snug">{a.title}</h3>
              <p className="mt-2 text-muted-foreground line-clamp-2">{a.excerpt}</p>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
