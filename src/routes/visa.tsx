import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight, ChevronDown } from "lucide-react";
import { visaPackages, visaFaqs } from "../lib/data";
import { VisaCard } from "../components/site/visa-card";
import { FaqAccordion } from "../components/site/faq-accordion";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/visa")({
  head: () => ({
    meta: [
      { title: "Visa Services — Travel Tours" },
      {
        name: "description",
        content:
          "Travel Tours handles your visa applications end to end — document review, embassy submission, and status tracking for destinations worldwide.",
      },
      { property: "og:title", content: "Visa Services — Travel Tours" },
      { property: "og:description", content: "Expert visa handling for every destination we serve." },
    ],
  }),
  component: VisaPage,
});

const visaSteps = [
  { num: 1, title: "Document collection", body: "We provide a tailored checklist. You upload your documents to our secure portal." },
  { num: 2, title: "Application preparation", body: "Our specialists review everything, prepare the application, and schedule embassy appointments where required." },
  { num: 3, title: "Embassy submission", body: "We submit on your behalf and track progress, keeping you informed at every stage." },
  { num: 4, title: "Approval & delivery", body: "Your visa is delivered digitally or by courier. We confirm everything is correct before your trip." },
];

// Unique country list derived from data
const ALL = "All countries";

function VisaPage() {
  const countries = useMemo(() => {
    const unique = [...new Set(visaPackages.map((v) => v.country))].sort();
    return [ALL, ...unique];
  }, []);

  const [selected, setSelected] = useState(ALL);
  const [dropOpen, setDropOpen] = useState(false);

  const filtered = useMemo(
    () => (selected === ALL ? visaPackages : visaPackages.filter((v) => v.country === selected)),
    [selected],
  );

  return (
    <div className="pt-32 pb-24">
      {/* Hero / intro */}
      <div className="container-editorial">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Visa Services" }]} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-eyebrow text-teal">Visa Services</p>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
            We handle the paperwork.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Visa requirements change, appointments are hard to get, and the wrong document can delay your
            trip. Travel Tours takes it off your plate — from document review to embassy submission and
            approval tracking.
          </p>
        </motion.div>
      </div>


      {/* Country filter + visa cards */}
      {/* 👇 Force section top padding to 0 */}
      {/* 👇 Added mt-16 and sm:mt-20 to push the whole beige panel down */}
      <section className="bg-secondary mt-16 sm:mt-20 pb-20 sm:pb-28">
        {/* 👇 Force inner container top spacing to 0 */}
        <div className="container-editorial pt-0 mt-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="text-eyebrow text-teal">Visa packages</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-navy">
                {selected === ALL ? "All destinations" : selected}
              </h2>
            </div>

            {/* Country dropdown */}
            <div className="relative w-full sm:w-72" aria-label="Filter by country">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={dropOpen}
                onClick={() => setDropOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-3 rounded-2xl border-2 border-border bg-card px-5 py-4 text-base font-semibold text-navy hover:border-navy transition-colors duration-500 glow-focus"
              >
                <span>{selected}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.ul
                    role="listbox"
                    aria-label="Select country"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-30 mt-2 w-full rounded-2xl border border-border bg-card shadow-lift overflow-hidden"
                  >
                    {countries.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected === c}
                          onClick={() => { setSelected(c); setDropOpen(false); }}
                          className={`w-full px-5 py-3.5 text-left text-base transition-colors hover:bg-secondary ${selected === c ? "font-semibold text-teal bg-teal/5" : "text-navy"
                            }`}
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((visa, i) => (
                <VisaCard key={visa.slug} visa={visa} index={i} />
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center text-lg text-muted-foreground py-16">
                  No visa packages found for {selected}.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4-step process */}
      <section className="container-editorial py-20 sm:py-28" aria-labelledby="visa-process-heading">
        <p className="text-eyebrow text-teal">How it works</p>
        <h2 id="visa-process-heading" className="mt-3 font-display text-4xl sm:text-5xl text-navy mb-14">
          Four steps to your visa
        </h2>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="Visa process steps">
          {visaSteps.map((step, i) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              {i < visaSteps.length - 1 && (
                <span className="absolute top-7 left-17 hidden h-0.5 w-[calc(100%-3.5rem)] bg-border lg:block" aria-hidden />
              )}
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-teal bg-teal/10 font-display text-xl text-teal booking-tab-active" aria-hidden>
                {step.num}
              </span>
              <h3 className="mt-5 font-display text-xl text-navy">{step.title}</h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="container-editorial py-20 sm:py-28" aria-labelledby="visa-faq-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <div>
            <p className="text-eyebrow text-teal">Questions</p>
            <h2 id="visa-faq-heading" className="mt-3 font-display text-4xl sm:text-5xl text-navy leading-[1.05]">
              Visa FAQs
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              If your question isn't answered here, our specialists are happy to help directly.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-base font-medium text-primary-foreground hover:bg-navy-soft transition-colors duration-700"
            >
              Ask a specialist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <FaqAccordion items={visaFaqs} />
        </div>
      </section>

      {/* CTA banner */}
      <div className="container-editorial pb-8">
        <div className="relative overflow-hidden rounded-4xl bg-navy px-8 py-16 sm:px-16 sm:py-24 text-center cta-sweep">
          <FileText className="mx-auto h-12 w-12 text-gold mb-6" aria-hidden />
          <p className="text-eyebrow text-gold-soft">Ready to apply?</p>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl text-primary-foreground leading-[1.05] max-w-2xl mx-auto">
            Start your visa application today.
          </h2>
          <p className="mt-5 text-xl text-primary-foreground/80 max-w-xl mx-auto">
            Contact our team with your destination and travel dates — we'll take it from there.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-medium text-navy hover:bg-gold-soft transition-colors duration-700"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
