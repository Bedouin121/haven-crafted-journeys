import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PlanDreamTripForm } from "../components/site/plan-dream-trip-form";
import { ProcessStepper } from "../components/site/process-stepper";
import { Breadcrumbs } from "../components/site/breadcrumbs";

export const Route = createFileRoute("/plan-dream-trip")({
  head: () => ({
    meta: [
      { title: "Plan Your Dream Trip — Travel Tours" },
      {
        name: "description",
        content:
          "Submit your custom itinerary idea to Travel Tours. A specialist will review it personally and follow up with a tailored quote within two business days.",
      },
      { property: "og:title", content: "Plan Your Dream Trip — Travel Tours" },
      {
        property: "og:description",
        content:
          "Tell us about your dream trip. A Travel Tours specialist will design a custom itinerary and quote just for you.",
      },
    ],
  }),
  component: PlanDreamTripPage,
});

function PlanDreamTripPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-editorial">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Plan Your Dream Trip" }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-eyebrow text-teal">Plan your dream trip</p>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl leading-[1.02] text-navy">
            Tell us what you're imagining.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl">
            Have a destination in mind — or just a feeling? Share it with us. A Travel Tours specialist reads
            every submission personally and comes back with a custom itinerary and transparent pricing.
          </p>
        </motion.div>
      </div>

      {/* How it works stepper */}
      <section className="container-editorial py-16 sm:py-20" aria-labelledby="process-heading">
        <p className="text-eyebrow text-teal mb-2">How it works</p>
        <h2 id="process-heading" className="font-display text-3xl sm:text-4xl text-navy mb-12">
          Three steps to your custom trip
        </h2>
        <ProcessStepper activeStep={1} />
      </section>

      {/* Full form */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container-editorial max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-eyebrow text-teal mb-2">Step 1</p>
            <h2 className="font-display text-3xl sm:text-4xl text-navy mb-3">
              Submit your idea
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl">
              Fill in as much or as little as you know. The more detail you share, the more tailored
              our response will be — but a rough idea is plenty to start.
            </p>
            <PlanDreamTripForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
