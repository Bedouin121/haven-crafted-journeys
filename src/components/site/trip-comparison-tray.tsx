import { motion, AnimatePresence } from "framer-motion";
import { X, GitCompare } from "lucide-react";
import type { Package } from "../../lib/data";

export function TripComparisonTray({
  items,
  open,
  onToggle,
  onRemove,
  onClear,
}: {
  items: Package[];
  open: boolean;
  onToggle: () => void;
  onRemove: (slug: string) => void;
  onClear: () => void;
}) {
  if (items.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-all duration-500 hover:bg-navy-soft glow-focus booking-tab-active"
        aria-expanded={open}
        aria-controls="comparison-tray-panel"
      >
        <GitCompare className="h-5 w-5" aria-hidden />
        Compare ({items.length})
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="comparison-tray-panel"
            role="dialog"
            aria-label="Trip comparison"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-deep glow-focus"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl text-navy">Compare journeys</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClear}
                  className="text-sm font-medium text-muted-foreground hover:text-navy transition-colors duration-500 glow-focus rounded-lg px-3 py-1"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={onToggle}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary transition-colors glow-focus"
                  aria-label="Close comparison"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-base">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 font-semibold text-navy">Journey</th>
                    {items.map((p) => (
                      <th key={p.slug} className="py-3 px-4 font-display text-lg text-navy min-w-[140px]">
                        <div className="flex items-start justify-between gap-2">
                          <span>{p.title}</span>
                          <button
                            type="button"
                            onClick={() => onRemove(p.slug)}
                            className="shrink-0 text-muted-foreground hover:text-navy glow-focus rounded p-1"
                            aria-label={`Remove ${p.title}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-4 pr-4 font-medium text-muted-foreground">Price</td>
                    {items.map((p) => (
                      <td key={p.slug} className="py-4 px-4 font-display text-xl text-navy">
                        ${p.price.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 pr-4 font-medium text-muted-foreground">Duration</td>
                    {items.map((p) => (
                      <td key={p.slug} className="py-4 px-4 text-navy">{p.nights} nights</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-medium text-muted-foreground align-top">Inclusions</td>
                    {items.map((p) => (
                      <td key={p.slug} className="py-4 px-4 align-top">
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {p.inclusions.slice(0, 4).map((inc) => (
                            <li key={inc}>• {inc}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
