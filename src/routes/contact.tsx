import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Breadcrumbs } from "../components/site/breadcrumbs";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "../components/site/brand-icons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Diganta Overseas" },
      { name: "description", content: "Speak to a Diganta Overseas travel designer. Farmgate, Dhaka." },
      { property: "og:title", content: "Contact Diganta Overseas" },
      { property: "og:description", content: "Speak to a Diganta Overseas travel designer." },
    ],
  }),
  component: ContactPage,
});

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/digantaoverseas" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/diganta_overseas" },
  { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@diganta_overseas3" },
];

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
            <ContactRow icon={Phone} label="Phone" value="+8801840-519083" />
            <ContactRow icon={MapPin} label="Studio" value="4/A Indira Road, Mahabub Plaza (4th Floor), Room No-503, Farmgate, Dhaka – 1215" />
            <ContactRow icon={Mail} label="Email" value="hello@digantaoverseas.com" />
          </div>

          <div className="mt-10">
            <p className="text-eyebrow text-teal mb-3">Follow along</p>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-navy hover:border-navy hover:bg-secondary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-sand-deep p-8">
            <p className="text-eyebrow text-teal">Rather have us design it?</p>
            <h2 className="mt-2 font-display text-2xl text-navy">Plan your dream trip</h2>
            <p className="mt-2 text-base text-muted-foreground">Submit your idea and a specialist will come back with a custom itinerary and quote — usually within two business days.</p>
            <Link to="/plan-dream-trip" className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-base font-medium text-primary-foreground hover:bg-navy-soft transition-colors duration-700">
              Start planning <ArrowRight className="h-4 w-4" />
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
                <label htmlFor="message" className="block text-base font-semibold text-navy mb-2">How can we help?</label>
                <textarea id="message" required rows={5} className="form-field-accessible w-full rounded-2xl glow-focus" placeholder="Tell us about what you're imagining…" />
              </div>
              <button className="w-full rounded-full bg-navy px-6 py-4 text-lg font-medium text-primary-foreground hover:bg-navy-soft transition-colors duration-700">
                Send note
              </button>
              <p className="text-sm text-muted-foreground text-center">By sending, you agree to our privacy notice. No marketing without consent.</p>
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
      <label htmlFor={id} className="block text-base font-semibold text-navy mb-2">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="form-field-accessible w-full glow-focus"
      />
    </div>
  );
}
