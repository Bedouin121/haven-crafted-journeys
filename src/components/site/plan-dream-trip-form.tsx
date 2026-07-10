import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { MagneticButton } from "./magnetic-button";

export type DreamTripFormData = {
  name: string;
  email: string;
  phone: string;
  destinations: string;
  dates: string;
  travelers: string;
  budget: string;
  description: string;
};

const emptyForm: DreamTripFormData = {
  name: "",
  email: "",
  phone: "",
  destinations: "",
  dates: "",
  travelers: "",
  budget: "",
  description: "",
};

const budgetOptions = [
  "Under $3,000 per person",
  "$3,000 – $5,000 per person",
  "$5,000 – $8,000 per person",
  "$8,000 – $12,000 per person",
  "$12,000+ per person",
];

function FormField({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-base font-semibold text-navy">
        {label}
        {required && <span className="text-teal ml-1" aria-hidden>*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
    </div>
  );
}

export function PlanDreamTripForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<DreamTripFormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof DreamTripFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Structured for future backend — payload ready to POST
    const payload = { ...form, submittedAt: new Date().toISOString(), source: compact ? "homepage" : "dedicated-page" };
    console.info("[Travel Tours] Dream trip enquiry:", payload);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border-2 border-teal/30 bg-teal/5 p-10 text-center glow-focus"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-teal" aria-hidden />
        <h3 className="mt-5 font-display text-3xl text-navy">Thank you — we've received your idea</h3>
        <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          A Travel Tours specialist will review your request and follow up within two business days with a custom quote.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${compact ? "" : "rounded-3xl border border-border bg-card p-8 sm:p-10 card-elevated"}`}
      aria-label="Plan your dream trip enquiry"
    >
      <div className={`grid gap-6 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-2"}`}>
        <FormField id="dream-name" label="Full name" required>
          <input
            id="dream-name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="form-field-accessible w-full glow-focus"
            autoComplete="name"
          />
        </FormField>
        <FormField id="dream-email" label="Email address" required>
          <input
            id="dream-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="form-field-accessible w-full glow-focus"
            autoComplete="email"
          />
        </FormField>
        {!compact && (
          <FormField id="dream-phone" label="Phone number">
            <input
              id="dream-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="form-field-accessible w-full glow-focus"
              autoComplete="tel"
            />
          </FormField>
        )}
        <FormField id="dream-destinations" label={compact ? "Destination" : "Preferred destination(s)"} required>
          <input
            id="dream-destinations"
            required
            value={form.destinations}
            onChange={(e) => update("destinations", e.target.value)}
            placeholder="e.g. Japan, Italy"
            className="form-field-accessible w-full glow-focus"
          />
        </FormField>
        {!compact && (
          <>
            <FormField id="dream-dates" label="Preferred travel dates">
              <input
                id="dream-dates"
                value={form.dates}
                onChange={(e) => update("dates", e.target.value)}
                placeholder="e.g. March 2027, flexible"
                className="form-field-accessible w-full glow-focus"
              />
            </FormField>
            <FormField id="dream-travelers" label="Number of travelers">
              <input
                id="dream-travelers"
                value={form.travelers}
                onChange={(e) => update("travelers", e.target.value)}
                placeholder="e.g. 2 adults, 1 child"
                className="form-field-accessible w-full glow-focus"
              />
            </FormField>
            <FormField id="dream-budget" label="Budget range">
              <select
                id="dream-budget"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className="form-field-accessible w-full glow-focus"
              >
                <option value="">Select a range</option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </FormField>
          </>
        )}
      </div>
      {!compact && (
        <FormField id="dream-description" label="Describe your dream itinerary" required>
          <textarea
            id="dream-description"
            required
            rows={6}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Tell us about the experiences, pace, and special occasions you're planning for..."
            className="form-field-accessible w-full glow-focus resize-y min-h-[160px]"
          />
        </FormField>
      )}
      {compact && (
        <FormField id="dream-description-compact" label="Brief description">
          <textarea
            id="dream-description-compact"
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="A few sentences about your ideal trip..."
            className="form-field-accessible w-full glow-focus resize-y"
          />
        </FormField>
      )}
      <div className={compact ? "" : "pt-2"}>
        <MagneticButton type="submit" className="w-full sm:w-auto">
          Submit your idea
        </MagneticButton>
      </div>
    </form>
  );
}
