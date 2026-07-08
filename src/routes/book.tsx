import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Calendar, Users, MapPin, DollarSign, MessageSquare } from "lucide-react";
import { destinations } from "../lib/data";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Plan a trip — Aeris" },
      { name: "description", content: "Start planning a bespoke journey with Aeris. Tell us where you're going, when, and who with — a specialist responds within one business day." },
      { property: "og:title", content: "Plan a trip with Aeris" },
      { property: "og:description", content: "Start planning a bespoke journey with Aeris." },
    ],
  }),
  component: BookPage,
});

const steps = ["Destination", "Dates", "Travelers", "Budget", "Details"] as const;

function BookPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    destination: "",
    dates: "",
    flexibility: "flexible",
    adults: 2,
    children: 0,
    budget: "6000",
    style: "Cultural",
    notes: "",
    name: "",
    email: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (done) return <ConfirmationScreen name={form.name || "Traveler"} />;

  return (
    <div className="pt-32 pb-24 container-editorial">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Plan a trip" }]} />

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-eyebrow text-teal">Plan a trip</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02] text-navy">
            Tell us the shape of it.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Five short questions. A specialist responds within one business day with a first-draft direction — always
            by a person, never automated.
          </p>

          <div className="mt-10">
            <div className="flex items-center gap-2 mb-3">
              {steps.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-navy" : "bg-border"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Step {step + 1} of {steps.length} · {steps[step]}</p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); if (step === steps.length - 1) setDone(true); else next(); }}
            className="mt-10 rounded-3xl card-elevated p-8 sm:p-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                {step === 0 && (
                  <div>
                    <h2 className="font-display text-3xl text-navy">Where do you dream of going?</h2>
                    <p className="mt-2 text-muted-foreground">Pick one — or write your own.</p>
                    <div className="mt-6 grid gap-2 sm:grid-cols-2">
                      {destinations.map((d) => (
                        <button
                          type="button"
                          key={d.slug}
                          onClick={() => update("destination", d.name)}
                          className={`rounded-2xl border p-4 text-left transition-colors ${
                            form.destination === d.name ? "border-navy bg-navy text-primary-foreground" : "border-border bg-background hover:border-navy"
                          }`}
                        >
                          <p className="font-display text-lg">{d.name}</p>
                          <p className={`text-xs mt-1 ${form.destination === d.name ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{d.country}</p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6">
                      <label htmlFor="dest-other" className="block text-sm font-medium text-navy">Or somewhere else</label>
                      <input id="dest-other" type="text" value={form.destination} onChange={(e) => update("destination", e.target.value)} placeholder="Write it here…" className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="font-display text-3xl text-navy">When were you thinking?</h2>
                    <p className="mt-2 text-muted-foreground">Rough dates are fine.</p>
                    <div className="mt-6">
                      <label htmlFor="dates" className="block text-sm font-medium text-navy">Preferred dates</label>
                      <input id="dates" type="text" value={form.dates} onChange={(e) => update("dates", e.target.value)} placeholder="e.g. mid-October, 10 nights" className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                    </div>
                    <fieldset className="mt-6">
                      <legend className="text-sm font-medium text-navy">How flexible?</legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {[{ v: "fixed", l: "Fixed dates" }, { v: "flexible", l: "Somewhat flexible" }, { v: "very", l: "Very flexible" }].map((o) => (
                          <label key={o.v} className={`cursor-pointer rounded-2xl border p-4 text-center text-sm transition-colors ${form.flexibility === o.v ? "border-navy bg-navy text-primary-foreground" : "border-border bg-background hover:border-navy"}`}>
                            <input type="radio" name="flex" value={o.v} checked={form.flexibility === o.v} onChange={() => update("flexibility", o.v)} className="sr-only" />
                            {o.l}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-display text-3xl text-navy">Who's coming?</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <Counter label="Adults" value={form.adults} onChange={(v) => update("adults", v)} min={1} max={12} />
                      <Counter label="Children" value={form.children} onChange={(v) => update("children", v)} min={0} max={8} />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="font-display text-3xl text-navy">A comfortable budget?</h2>
                    <p className="mt-2 text-muted-foreground">Per person, excluding long-haul flights.</p>
                    <div className="mt-8">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-muted-foreground">Estimated budget</span>
                        <span className="font-display text-3xl text-navy">${Number(form.budget).toLocaleString()}</span>
                      </div>
                      <input type="range" min="3000" max="25000" step="500" value={form.budget} onChange={(e) => update("budget", e.target.value)} className="mt-3 w-full accent-navy" aria-label="Budget per person" />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>$3,000</span><span>$25,000+</span>
                      </div>
                    </div>
                    <fieldset className="mt-8">
                      <legend className="text-sm font-medium text-navy">Style</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Cultural", "Adventure", "Romantic", "Family", "Luxury"].map((s) => (
                          <label key={s} className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${form.style === s ? "border-navy bg-navy text-primary-foreground" : "border-border bg-background hover:border-navy"}`}>
                            <input type="radio" name="style" value={s} checked={form.style === s} onChange={() => update("style", s)} className="sr-only" />
                            {s}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="font-display text-3xl text-navy">Last bits.</h2>
                    <div className="mt-6 grid gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-navy">Your name</label>
                        <input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-navy">Email</label>
                        <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                      </div>
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-navy">Anything else</label>
                        <textarea id="notes" rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Dietary needs, occasions, dreams…" className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-sm text-navy disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-medium text-primary-foreground hover:bg-navy-soft transition-colors">
                {step === steps.length - 1 ? "Send enquiry" : "Continue"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl card-elevated p-8">
            <p className="text-eyebrow text-teal">Your journey so far</p>
            <dl className="mt-6 space-y-5">
              <SummaryRow icon={MapPin} label="Destination" value={form.destination || "—"} />
              <SummaryRow icon={Calendar} label="Dates" value={form.dates || "—"} />
              <SummaryRow icon={Users} label="Travelers" value={`${form.adults} adult${form.adults !== 1 ? "s" : ""}${form.children ? `, ${form.children} children` : ""}`} />
              <SummaryRow icon={DollarSign} label="Budget" value={`$${Number(form.budget).toLocaleString()} pp · ${form.style}`} />
              <SummaryRow icon={MessageSquare} label="Notes" value={form.notes ? `${form.notes.slice(0, 40)}${form.notes.length > 40 ? "…" : ""}` : "—"} />
            </dl>
            <p className="mt-8 text-xs text-muted-foreground">This is a fictional booking flow for a design showcase. No data is sent.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Counter({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-3 flex items-center justify-between">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary" aria-label={`Decrease ${label}`}>−</button>
        <span className="font-display text-3xl text-navy">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary" aria-label={`Increase ${label}`}>+</button>
      </div>
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-teal mt-1" aria-hidden />
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 text-sm text-navy truncate">{value}</dd>
      </div>
    </div>
  );
}

function ConfirmationScreen({ name }: { name: string }) {
  return (
    <div className="pt-32 pb-24 container-editorial">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal-soft text-teal">
          <Check className="h-8 w-8" />
        </div>
        <p className="mt-8 text-eyebrow text-teal">Received</p>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl text-navy leading-[1.05]">
          Thank you, {name}.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Your enquiry is with our team. A specialist will read it carefully and reply within one business day with a
          first direction — always by a person.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-navy-soft transition-colors">
            Return home
          </Link>
          <Link to="/blog" className="rounded-full border border-border px-6 py-3 text-sm font-medium text-navy hover:bg-secondary transition-colors">
            Read the journal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
