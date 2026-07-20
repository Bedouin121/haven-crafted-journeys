import { useState, useId, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Calendar, Users, Plane, Hotel, FileText, Globe,
  ChevronDown, Plus, Minus,
} from "lucide-react";

// ─── Shared dismiss logic for dropdown style panels ─────────────────────────
// Closes on outside click, Escape, and page scroll, so an open panel can
// never linger and overlap content once the user has moved past it.
function useDismissableDropdown<T extends HTMLElement>(open: boolean, onDismiss: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onDismiss();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    const handleScroll = (e: Event) => {
      if (ref.current && ref.current.contains(e.target as Node)) return;
      onDismiss();
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, onDismiss]);

  return ref;
}

const TABS = [
  { id: "tour", label: "Tour", icon: MapPin },
  { id: "flight", label: "Flight", icon: Plane },
  { id: "hotel", label: "Hotel", icon: Hotel },
  { id: "visa", label: "Visa", icon: FileText },
  { id: "destination", label: "Destination", icon: Globe },
] as const;

type TabId = (typeof TABS)[number]["id"];

const DUMMY_DESTINATIONS = [
  "Kyoto, Japan",
  "Patagonia, Chile & Argentina",
  "Amalfi Coast, Italy",
  "Marrakech & Atlas, Morocco",
  "Iceland",
  "Kenya Safari",
  "Bali, Indonesia",
  "Santorini, Greece",
  "Maldives",
  "New Zealand",
  "Peru & Machu Picchu",
  "Safari — Tanzania",
];

const ALL_PLACES = ["Dhaka", ...DUMMY_DESTINATIONS];

// ─── Reusable label ──────────────────────────────────────────────────────────
function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-navy mb-2">
      {children}
    </label>
  );
}

function ControlledDropdown({ 
  id, label, placeholder, icon: Icon, options, value, onChange 
}: { 
  id: string; label: string; placeholder: string; 
  icon: React.ComponentType<{ className?: string }>; 
  options: string[]; value: string; onChange: (v: string) => void; 
}) {
  const [open, setOpen] = useState(false);
  const dismiss = useCallback(() => setOpen(false), []);
  const ref = useDismissableDropdown<HTMLDivElement>(open, dismiss);

  return (
    <div ref={ref} className="relative">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="form-field-accessible w-full flex items-center justify-between gap-2 text-left glow-focus"
      >
        <span className="flex items-center gap-2 min-w-0">
          <Icon className="h-4 w-4 text-navy/50 shrink-0" aria-hidden />
          <span className={`truncate ${value ? "text-navy" : "text-navy/40"}`}>
            {value || placeholder}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-navy/50 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full rounded-2xl border border-border bg-card shadow-lift max-h-64 overflow-y-auto"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full px-4 py-3 text-left text-base transition-colors hover:bg-secondary ${value === opt ? "text-teal font-semibold bg-teal/5" : "text-navy"
                    }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function DestinationDropdown({ id, label, options = DUMMY_DESTINATIONS }: { id: string; label: string; options?: string[] }) {
  const [selected, setSelected] = useState("");
  return (
    <ControlledDropdown
      id={id}
      label={label}
      placeholder="Where to?"
      icon={MapPin}
      options={options}
      value={selected}
      onChange={setSelected}
    />
  );
}

function FlightDropdowns({ baseId }: { baseId: string }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fromOptions = ALL_PLACES.filter((p) => p !== to);
  const toOptions = ALL_PLACES.filter((p) => p !== from);

  return (
    <>
      <ControlledDropdown id={`${baseId}-from`} label="Flying from" icon={Plane} placeholder="Departure city" options={fromOptions} value={from} onChange={setFrom} />
      <ControlledDropdown id={`${baseId}-to`} label="Flying to" icon={Plane} placeholder="Arrival city" options={toOptions} value={to} onChange={setTo} />
    </>
  );
}

// ─── Travelers counter ───────────────────────────────────────────────────────
function TravelersCounter({ id, label }: { id: string; label: string }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [open, setOpen] = useState(false);
  const dismiss = useCallback(() => setOpen(false), []);
  const ref = useDismissableDropdown<HTMLDivElement>(open, dismiss);

  const summary = `${adults} adult${adults !== 1 ? "s" : ""}${children > 0 ? `, ${children} child${children !== 1 ? "ren" : ""}` : ""}`;

  return (
    <div ref={ref} className="relative">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <button
        id={id}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="form-field-accessible w-full flex items-center justify-between gap-2 text-left glow-focus"
      >
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 text-navy/50 shrink-0" aria-hidden />
          <span className="text-navy">{summary}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-navy/50 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-72 rounded-2xl border border-border bg-card shadow-lift p-5 space-y-5"
          >
            <CounterRow
              label="Adults"
              sub="Age 18+"
              value={adults}
              onDec={() => setAdults(Math.max(1, adults - 1))}
              onInc={() => setAdults(Math.min(12, adults + 1))}
            />
            <CounterRow
              label="Children"
              sub="Age 2–17"
              value={children}
              onDec={() => setChildren(Math.max(0, children - 1))}
              onInc={() => setChildren(Math.min(8, children + 1))}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-full bg-navy text-primary-foreground py-2.5 text-sm font-medium hover:bg-navy-soft transition-colors duration-500"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CounterRow({
  label, sub, value, onDec, onInc,
}: {
  label: string; sub: string; value: number;
  onDec: () => void; onInc: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-base font-semibold text-navy">{label}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDec}
          className="grid h-9 w-9 place-items-center rounded-full border-2 border-border hover:border-navy hover:bg-secondary transition-colors glow-focus"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center font-display text-xl text-navy tabular-nums">{value}</span>
        <button
          type="button"
          onClick={onInc}
          className="grid h-9 w-9 place-items-center rounded-full border-2 border-border hover:border-navy hover:bg-secondary transition-colors glow-focus"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Plain text field ────────────────────────────────────────────────────────
function WidgetField({
  id, label, icon: Icon, type = "text", placeholder,
}: {
  id: string; label: string;
  icon: React.ComponentType<{ className?: string }>;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/50 pointer-events-none" aria-hidden />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="form-field-accessible w-full pl-11 glow-focus"
        />
      </div>
    </div>
  );
}

// ─── Select field ────────────────────────────────────────────────────────────
function WidgetSelect({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select id={id} className="form-field-accessible w-full glow-focus appearance-none">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Search button ───────────────────────────────────────────────────────────
function SearchBtn({ label }: { label: string }) {
  return (
    <div className="flex items-end">
      <button
        type="submit"
        className="w-full rounded-2xl bg-navy px-8 py-4 text-primary-foreground hover:bg-navy-soft transition-colors duration-500 glow-focus booking-tab-active flex items-center justify-center gap-2 text-base font-semibold"
        aria-label={label}
      >
        <Search className="h-5 w-5" /> Search
      </button>
    </div>
  );
}

// ─── Main widget ─────────────────────────────────────────────────────────────
export function HeroBookingWidget() {
  const [active, setActive] = useState<TabId>("tour");
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    setActive(TABS[next].id);
  }, []);

  return (
    <div className="group/widget relative rounded-[28px] p-[1px] max-w-4xl bg-gradient-to-br from-white/40 via-[color:var(--gold)]/25 to-[color:var(--teal)]/25 shadow-deep">
      <div className="glass-panel rounded-[27px] p-5 sm:p-7 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[color:var(--gold)]/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[color:var(--teal)]/15 blur-3xl" aria-hidden />

        {/* Tab strip */}
        <div role="tablist" aria-label="Booking type" className="relative flex flex-wrap gap-1.5 mb-6">
          {TABS.map((tab, i) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-[0.01em] transition-colors duration-500 glow-focus ${selected
                  ? "text-primary-foreground"
                  : "text-navy/80 hover:text-navy"
                  }`}
              >
                {selected && (
                  <motion.span
                    layoutId="booking-tab-pill"
                    className="absolute inset-0 rounded-full bg-navy shadow-[0_8px_24px_-8px_oklch(0.24_0.05_250/0.5),inset_0_1px_0_oklch(1_0_0/0.08)]"
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    aria-hidden
                  />
                )}
                <tab.icon className="relative h-4 w-4" aria-hidden />
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>

      {/* Panels */}
      <form onSubmit={(e) => e.preventDefault()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            id={`${baseId}-panel-${active}`}
            aria-labelledby={`${baseId}-tab-${active}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {active === "tour" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_auto]">
                <DestinationDropdown id={`${baseId}-tour-dest`} label="Destination" />
                <WidgetField id={`${baseId}-tour-dates`} label="Travel dates" icon={Calendar} type="date" />
                <TravelersCounter id={`${baseId}-tour-travelers`} label="Travelers" />
                <SearchBtn label="Search tours" />
              </div>
            )}
            {active === "flight" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FlightDropdowns baseId={baseId} />
                <WidgetField id={`${baseId}-depart`} label="Depart date" icon={Calendar} type="date" />
                <WidgetField id={`${baseId}-return`} label="Return date" icon={Calendar} type="date" />
                <WidgetSelect id={`${baseId}-class`} label="Class" options={["Economy", "Premium Economy", "Business", "First"]} />
                <SearchBtn label="Search flights" />
              </div>
            )}
            {active === "hotel" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <DestinationDropdown id={`${baseId}-hotel-place`} label="Place" options={ALL_PLACES} />
                <WidgetField id={`${baseId}-checkin`} label="Check in" icon={Calendar} type="date" />
                <WidgetField id={`${baseId}-checkout`} label="Check out" icon={Calendar} type="date" />
                <TravelersCounter id={`${baseId}-hotel-guests`} label="Guests" />
                <SearchBtn label="Search hotels" />
              </div>
            )}
            {active === "visa" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
                <DestinationDropdown id={`${baseId}-visa-country`} label="Destination country" />
                <WidgetSelect id={`${baseId}-visa-type`} label="Visa type" options={["Tourist", "Business", "Transit", "Student"]} />
                <SearchBtn label="Search visa services" />
              </div>
            )}
            {active === "destination" && (
              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <DestinationDropdown id={`${baseId}-dest-search`} label="Destination" />
                <SearchBtn label="Search destinations" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </form>
      </div>
    </div>
  );
}