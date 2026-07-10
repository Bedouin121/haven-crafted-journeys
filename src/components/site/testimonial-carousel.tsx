import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../../lib/data";

export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((v) => (v + 1) % testimonials.length);

  return (
    <div className="relative rounded-4xl bg-navy text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-teal blur-3xl" />
      </div>
      <div className="relative grid gap-10 p-8 sm:p-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:p-20">
        <div>
          <Quote className="h-12 w-12 text-gold" aria-hidden />
          <p className="mt-6 text-eyebrow text-primary-foreground/70">Client stories</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.05]">
            Trusted by discerning travelers.
          </h2>
        </div>
        <div className="min-h-[280px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-1 text-gold" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 font-display text-2xl sm:text-3xl leading-[1.3] text-primary-foreground">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-primary-foreground/70">
                    {t.location} · {t.trip}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/30 hover:bg-white/15 transition-colors duration-700 glow-focus"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/30 hover:bg-white/15 transition-colors duration-700 glow-focus"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="ml-3 flex gap-1.5" role="tablist">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={k === i}
                  aria-label={`Go to testimonial ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all ${
                    k === i ? "w-8 bg-gold" : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
