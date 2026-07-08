import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string; category?: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-3xl border border-border bg-card">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-6 px-6 py-6 text-left sm:px-8"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
            >
              <div className="flex-1 min-w-0">
                {it.category && (
                  <p className="text-xs uppercase tracking-[0.16em] text-teal">{it.category}</p>
                )}
                <p className="mt-1 font-display text-xl text-navy leading-snug">{it.q}</p>
              </div>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background transition-transform ${
                  isOpen ? "rotate-45 bg-navy text-primary-foreground border-navy" : ""
                }`}
                aria-hidden
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-7 pr-16 text-base leading-relaxed text-muted-foreground sm:px-8">
                    {it.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
