import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { faqs } from "../lib/data";
import { FaqAccordion } from "../components/site/faq-accordion";
import { Breadcrumbs } from "../components/site/breadcrumbs";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Aeris Travel Studio" },
      { name: "description", content: "Answers to common questions about planning, pricing, on-the-ground support, and responsible travel with Aeris." },
      { property: "og:title", content: "Aeris FAQ" },
      { property: "og:description", content: "Common questions about planning and traveling with Aeris." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const categories = useMemo(() => ["All", ...new Set(faqs.map((f) => f.category))], []);
  const [cat, setCat] = useState<string>("All");
  const filtered = cat === "All" ? faqs : faqs.filter((f) => f.category === cat);

  return (
    <div className="pt-32 pb-24 container-editorial">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-8 max-w-3xl">
        <p className="text-eyebrow text-teal">Common questions</p>
        <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">Answers, honestly.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          If your question isn't here, our specialists are happy to answer it directly — always by a person, never a form response.
        </p>
      </motion.div>

      <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter FAQ by category">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              cat === c ? "bg-navy text-primary-foreground" : "bg-secondary text-navy hover:bg-sand-deep"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <FaqAccordion items={filtered} />
      </div>

      <div className="mt-16 rounded-3xl bg-sand-deep p-10 text-center">
        <p className="text-eyebrow text-teal">Still curious</p>
        <h2 className="mt-2 font-display text-3xl text-navy">Speak to a specialist</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">A short conversation is often the fastest way to answer the question you didn't quite know how to ask.</p>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-navy-soft transition-colors">
          Get in touch <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
