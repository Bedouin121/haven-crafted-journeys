import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  { num: 1, title: "Submit your idea", body: "Tell us where you'd like to go, when, and what matters most to you." },
  { num: 2, title: "We review & design", body: "A Travel Tours specialist studies your request and crafts a tailored proposal." },
  { num: 3, title: "Follow-up & quote", body: "We reach out with a custom itinerary and transparent pricing." },
];

export function ProcessStepper({ activeStep = 1 }: { activeStep?: number }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-3" aria-label="How it works">
      {steps.map((step, i) => {
        const done = step.num < activeStep;
        const current = step.num === activeStep;
        return (
          <motion.li
            key={step.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative text-center"
          >
            {i < steps.length - 1 && (
              <span
                className="absolute top-7 left-[calc(50%+2rem)] hidden h-0.5 w-[calc(100%-4rem)] bg-border sm:block"
                aria-hidden
              />
            )}
            <span
              className={`mx-auto grid h-14 w-14 place-items-center rounded-full border-2 font-display text-xl transition-all duration-500 ${
                done
                  ? "border-teal bg-teal text-primary-foreground"
                  : current
                    ? "border-teal bg-teal/10 text-teal booking-tab-active"
                    : "border-border bg-card text-muted-foreground"
              }`}
              aria-current={current ? "step" : undefined}
            >
              {done ? <Check className="h-6 w-6" aria-hidden /> : step.num}
            </span>
            <h3 className="mt-5 font-display text-xl text-navy">{step.title}</h3>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">{step.body}</p>
          </motion.li>
        );
      })}
    </ol>
  );
}
