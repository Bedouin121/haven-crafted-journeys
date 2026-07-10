import { useCallback, useEffect, useState } from "react";

export type SavedItemType = "destination" | "package" | "visa";

export type SavedItem = {
  id: string;
  type: SavedItemType;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  price?: number;
};

const STORAGE_KEY = "travel-tours-saved";

function readStorage(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedItem[]) : [];
  } catch {
    return [];
  }
}

export function useSavedItems() {
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    setItems(readStorage());
  }, []);

  const persist = useCallback((next: SavedItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("saved-items-changed"));
  }, []);

  useEffect(() => {
    const sync = () => setItems(readStorage());
    window.addEventListener("saved-items-changed", sync);
    return () => window.removeEventListener("saved-items-changed", sync);
  }, []);

  const isSaved = useCallback(
    (type: SavedItemType, slug: string) => items.some((i) => i.type === type && i.slug === slug),
    [items],
  );

  const toggle = useCallback(
    (item: SavedItem) => {
      const exists = items.some((i) => i.type === item.type && i.slug === item.slug);
      if (exists) {
        persist(items.filter((i) => !(i.type === item.type && i.slug === item.slug)));
      } else {
        persist([...items, item]);
      }
    },
    [items, persist],
  );

  const remove = useCallback(
    (type: SavedItemType, slug: string) => {
      persist(items.filter((i) => !(i.type === type && i.slug === slug)));
    },
    [items, persist],
  );

  return { items, isSaved, toggle, remove, count: items.length };
}
