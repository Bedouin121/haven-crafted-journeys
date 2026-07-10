import { Heart } from "lucide-react";
import { useSavedItems, type SavedItem } from "../../hooks/use-saved-items";

export function SaveButton({ item }: { item: SavedItem }) {
  const { isSaved, toggle } = useSavedItems();
  const saved = isSaved(item.type, item.slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      className={`grid h-11 w-11 place-items-center rounded-full border-2 transition-all duration-500 glow-focus ${
        saved
          ? "border-teal bg-teal/10 text-teal booking-tab-active"
          : "border-border/80 bg-background/90 text-navy hover:border-teal/50"
      }`}
      aria-label={saved ? `Remove ${item.title} from saved` : `Save ${item.title} for later`}
      aria-pressed={saved}
    >
      <Heart className={`h-5 w-5 ${saved ? "fill-teal" : ""}`} />
    </button>
  );
}
