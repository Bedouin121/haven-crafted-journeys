import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aeris Travel Studio" },
      { name: "description", content: "Speak to an Aeris travel designer. Offices in London and Singapore, specialists on six continents." },
      { property: "og:title", content: "Contact Aeris" },
      { property: "og:description", content: "Speak to an Aeris travel designer." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-32 pb-24 container-editorial">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <div className="mt-8 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-eyebrow text-teal">Say hello</p>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
            Start a conversation.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Tell us as much or as little as you'd like. A specialist will read your note carefully and reply within
            one business day.
          </p>

          <div className="mt-12 space-y-6">
            <ContactRow icon={Mail} label="Email" value="hello@aeris.travel" />
            <ContactRow icon={Phone} label="London" value="+44 20 7946 0900" />
            <ContactRow icon={Phone} label="Singapore" value="+65 6812 4400" />
            <ContactRow icon={MapPin} label="Studio" value="14 Redchurch Street, London E2" />
          </div>

          <div className="mt-16 rounded-3xl bg-sand-deep p-8">
            <p className="text-eyebrow text-teal">Rather have us design it?</p>
            <h2 className="mt-2 font-display text-2xl text-navy">Start with our planning form</h2>
            <p className="mt-2 text-sm text-muted-foreground">The five-minute version — dates, style, and where you're leaning.</p>
            <Link to="/book" className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-navy-soft transition-colors">
              Plan a trip <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl card-elevated p-8 sm:p-10 space-y-5"
        >
          {sent ? (
            <div className="text-center py-16">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-soft text-teal">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-3xl text-navy">Thank you.</h2>
              <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
                Your note is with us. A specialist will be in touch within one business day.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Your name" required />
                <Field id="email" label="Email" type="email" required />
              </div>
              <Field id="destination" label="Destination(s) in mind" placeholder="Kyoto, Patagonia, undecided…" />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy">How can we help?</label>
                <textarea id="message" required rows={5} className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal" placeholder="Tell us about what you're imagining…" />
              </div>
              <button className="w-full rounded-full bg-navy px-6 py-4 text-base font-medium text-primary-foreground hover:bg-navy-soft transition-colors">
                Send note
              </button>
              <p className="text-xs text-muted-foreground text-center">By sending, you agree to our privacy notice. No marketing without consent.</p>
            </>
          )}
        </motion.form>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-navy">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-navy font-medium">{value}</p>
      </div>
    </div>
  );
}

function Field({ id, label, type = "text", required, placeholder }: { id: string; label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
      />
    </div>
  );
}
