import { useCallback, useState } from "react";
import type { Package } from "../lib/data";

const MAX_COMPARE = 3;

export function useComparisonTray() {
  const [items, setItems] = useState<Package[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((pkg: Package) => {
    setItems((prev) => {
      if (prev.some((p) => p.slug === pkg.slug)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      const next = [...prev, pkg];
      setOpen(true);
      return next;
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setOpen(false);
  }, []);

  const isInTray = useCallback((slug: string) => items.some((p) => p.slug === slug), [items]);

  return { items, add, remove, clear, open, setOpen, isInTray, max: MAX_COMPARE, canAdd: items.length < MAX_COMPARE };
}
