import { useState, useId, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Calendar, Users, Plane, Hotel, FileText, Globe,
  ChevronDown, Plus, Minus,
} from "lucide-react";

// ─── Shared dismiss logic for dropdown style panels ─────────────────────────
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

const ICON_STROKE = 1.5;

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
    <label
      htmlFor={htmlFor}
      className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/55 mb-2.5"
    >
      {children}
    </label>
  );
}

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ControlledDropdown({
  id, label, placeholder, icon: Icon, options, value, onChange,
}: {
  id: string; label: string; placeholder: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dismiss = useCallback(() => setOpen(false), []);
  const ref = useDismissableDropdown<HTMLDivElement>(open, dismiss);

  return (
    <div ref={ref} className="relative w-full">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="form-field-accessible w-full flex items-center justify-between gap-2 text-left glow-focus h-[52px]"
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <Icon className="h-4 w-4 text-[color:var(--gold)] shrink-0" strokeWidth={ICON_STROKE} aria-hidden />
          <span className={`truncate font-display ${value ? "text-navy" : "text-navy/40"}`}>
            {value || placeholder}
          </span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-navy/40 shrink-0 transition-transform duration-500 ease-out ${open ? "rotate-180" : ""}`}
          strokeWidth={ICON_STROKE}
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 mt-2 w-full rounded-2xl border border-border bg-card shadow-lift max-h-64 overflow-y-auto"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full px-4 py-3 text-left text-base font-display transition-colors hover:bg-secondary ${value === opt ? "text-[color:var(--gold)] font-semibold bg-[color:var(--gold)]/5" : "text-navy"
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
      placeholder="Where shall we take you?"
      icon={MapPin}
      options={options}
      value={selected}
      onChange={setSelected}
    />
  );
}

function useFlightCities() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const fromOptions = ALL_PLACES.filter((p) => p !== to);
  const toOptions = ALL_PLACES.filter((p) => p !== from);
  return { from, setFrom, to, setTo, fromOptions, toOptions };
}

function FlightPanel({ baseId, fieldVariants }: { baseId: string; fieldVariants: Record<string, unknown> }) {
  const { from, setFrom, to, setTo, fromOptions, toOptions } = useFlightCities();
  return (
    <>
      {/* Row 1: Flying from, Flying to, Class */}
      <div className="grid gap-5 sm:grid-cols-3">
        <motion.div custom={0} variants={fieldVariants}>
          <ControlledDropdown id={`${baseId}-from`} label="Flying from" icon={Plane} placeholder="Departure city" options={fromOptions} value={from} onChange={setFrom} />
        </motion.div>
        <motion.div custom={1} variants={fieldVariants}>
          <ControlledDropdown id={`${baseId}-to`} label="Flying to" icon={Plane} placeholder="Arrival city" options={toOptions} value={to} onChange={setTo} />
        </motion.div>
        <motion.div custom={2} variants={fieldVariants}>
          <WidgetSelect id={`${baseId}-class`} label="Class" options={["Economy", "Premium Economy", "Business", "First"]} />
        </motion.div>
      </div>
      {/* Row 2: Depart date, Return date */}
      <div className="grid gap-5 sm:grid-cols-2">
        <motion.div custom={3} variants={fieldVariants}>
          <WidgetField id={`${baseId}-depart`} label="Depart date" icon={Calendar} type="date" />
        </motion.div>
        <motion.div custom={4} variants={fieldVariants}>
          <WidgetField id={`${baseId}-return`} label="Return date" icon={Calendar} type="date" />
        </motion.div>
      </div>
      <motion.div custom={5} variants={fieldVariants} className="flex justify-end">
        <SearchBtn label="Search flights" className="w-full sm:w-auto sm:min-w-[200px]" />
      </motion.div>
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
    <div ref={ref} className="relative w-full">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <button
        id={id}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="form-field-accessible w-full flex items-center justify-between gap-2 text-left glow-focus h-[52px]"
      >
        <span className="flex items-center gap-2.5">
          <Users className="h-4 w-4 text-[color:var(--gold)] shrink-0" strokeWidth={ICON_STROKE} aria-hidden />
          <span className="text-navy font-display">{summary}</span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-navy/40 shrink-0 transition-transform duration-500 ease-out ${open ? "rotate-180" : ""}`}
          strokeWidth={ICON_STROKE}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 mt-2 w-72 rounded-2xl border border-border bg-card shadow-lift p-6 space-y-6"
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
              className="w-full rounded-full bg-navy text-primary-foreground py-2.5 text-sm font-medium tracking-wide hover:bg-navy-soft transition-colors duration-500"
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
        <p className="text-base font-semibold text-navy font-display">{label}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDec}
          className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-[color:var(--gold)] hover:bg-secondary transition-colors glow-focus"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
        </button>
        <span className="w-5 text-center font-display text-xl text-navy tabular-nums">{value}</span>
        <button
          type="button"
          onClick={onInc}
          className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-[color:var(--gold)] hover:bg-secondary transition-colors glow-focus"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={ICON_STROKE} />
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
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  type?: string; placeholder?: string;
}) {
  return (
    <div className="w-full">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--gold)] pointer-events-none" strokeWidth={ICON_STROKE} aria-hidden />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="form-field-accessible w-full pl-11 font-display glow-focus h-[52px]"
        />
      </div>
    </div>
  );
}

// ─── Select field (custom dropdown — no native <select> so font is consistent) ─
function WidgetSelect({ id, label, options }: { id: string; label: string; options: string[] }) {
  const [value, setValue] = useState(options[0] ?? "");
  return (
    <ControlledDropdown
      id={id}
      label={label}
      placeholder={options[0] ?? "Select…"}
      icon={ChevronDown}
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}

// ─── Search button ───────────────────────────────────────────────────────────
function SearchBtn({ label, className = "" }: { label: string; className?: string }) {
  return (
    <motion.button
      type="submit"
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl bg-navy px-8 py-4 text-primary-foreground hover:bg-navy-soft transition-colors duration-500 glow-focus booking-tab-active flex items-center justify-center gap-2 text-base font-semibold tracking-wide shadow-[0_10px_30px_-12px_oklch(0.24_0.05_250/0.55)] h-[52px] ${className}`}
      aria-label={label}
    >
      <Search className="h-4 w-4" strokeWidth={ICON_STROKE} /> Search
    </motion.button>
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
    <div className="group/widget relative rounded-[28px] p-[1px] max-w-4xl bg-gradient-to-br from-white/40 via-[color:var(--gold)]/25 to-[color:var(--teal)]/12 shadow-deep">
      <div className="glass-panel rounded-[27px] p-6 sm:p-9 relative">
        {/* Decorations clipped independently — overflow-hidden here so dropdowns can escape the panel */}
        <div className="pointer-events-none absolute inset-0 rounded-[27px] overflow-hidden" aria-hidden>
          <div className="absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[color:var(--gold)]/12 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[color:var(--teal)]/8 blur-3xl" />
          {/* Fine grain overlay */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
            <filter id={`${baseId}-grain`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${baseId}-grain)`} />
          </svg>
        </div>

        {/* Tab strip */}
        <div role="tablist" aria-label="Booking type" className="relative flex flex-wrap gap-1.5 mb-7">
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
                className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold font-display tracking-[0.02em] transition-colors duration-500 glow-focus ${selected
                  ? "text-primary-foreground"
                  : "text-navy/70 hover:text-navy"
                  }`}
              >
                {selected && (
                  <motion.span
                    layoutId="booking-tab-pill"
                    className="absolute inset-0 rounded-full bg-navy shadow-[0_8px_24px_-8px_oklch(0.24_0.05_250/0.5),inset_0_1px_0_oklch(1_0_0/0.08)]"
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    aria-hidden
                  />
                )}
                <tab.icon className="relative h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden />
                <span className="relative">{tab.label}</span>
                {selected && (
                  <motion.span
                    layout
                    className="relative h-1 w-1 rounded-full bg-[color:var(--gold)]"
                    aria-hidden
                  />
                )}
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
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, x: -12, transition: { duration: 0.25 } }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="space-y-5"
            >
              {/* 
                Unified 4-column grid system.
                Inputs go in the grid. Search button gets its own row below 
                to prevent asymmetric squeezing.
              */}

              {active === "tour" && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <motion.div custom={0} variants={fieldVariants} className="sm:col-span-2"><DestinationDropdown id={`${baseId}-tour-dest`} label="Destination" /></motion.div>
                    <motion.div custom={1} variants={fieldVariants} className="sm:col-span-2 lg:col-span-2"><WidgetField id={`${baseId}-tour-dates`} label="Travel dates" icon={Calendar} type="date" /></motion.div>
                    <motion.div custom={2} variants={fieldVariants} className="sm:col-span-2 lg:col-span-2"><TravelersCounter id={`${baseId}-tour-travelers`} label="Travelers" /></motion.div>
                  </div>
                  <motion.div custom={3} variants={fieldVariants} className="flex justify-end">
                    <SearchBtn label="Search tours" className="w-full sm:w-auto sm:min-w-[200px]" />
                  </motion.div>
                </>
              )}

              {active === "flight" && (
                <FlightPanel baseId={baseId} fieldVariants={fieldVariants} />
              )}

              {active === "hotel" && (
                <>
                  {/* Row 1: Place (full width) */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <motion.div custom={0} variants={fieldVariants} className="sm:col-span-2 lg:col-span-4"><DestinationDropdown id={`${baseId}-hotel-place`} label="Place" options={ALL_PLACES} /></motion.div>
                  </div>
                  {/* Row 2: Check-in, Check-out, Guests */}
                  <div className="grid gap-5 sm:grid-cols-3">
                    <motion.div custom={1} variants={fieldVariants}><WidgetField id={`${baseId}-checkin`} label="Check in" icon={Calendar} type="date" /></motion.div>
                    <motion.div custom={2} variants={fieldVariants}><WidgetField id={`${baseId}-checkout`} label="Check out" icon={Calendar} type="date" /></motion.div>
                    <motion.div custom={3} variants={fieldVariants}><TravelersCounter id={`${baseId}-hotel-guests`} label="Guests" /></motion.div>
                  </div>
                  <motion.div custom={4} variants={fieldVariants} className="flex justify-end">
                    <SearchBtn label="Search hotels" className="w-full sm:w-auto sm:min-w-[200px]" />
                  </motion.div>
                </>
              )}

              {active === "visa" && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <motion.div custom={0} variants={fieldVariants} className="lg:col-span-2"><DestinationDropdown id={`${baseId}-visa-country`} label="Destination country" /></motion.div>
                    <motion.div custom={1} variants={fieldVariants} className="lg:col-span-2"><WidgetSelect id={`${baseId}-visa-type`} label="Visa type" options={["Tourist", "Business", "Transit", "Student"]} /></motion.div>
                  </div>
                  <motion.div custom={2} variants={fieldVariants} className="flex justify-end">
                    <SearchBtn label="Search visa services" className="w-full sm:w-auto sm:min-w-[200px]" />
                  </motion.div>
                </>
              )}

              {active === "destination" && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <motion.div custom={0} variants={fieldVariants} className="lg:col-span-4"><DestinationDropdown id={`${baseId}-dest-search`} label="Destination" /></motion.div>
                  </div>
                  <motion.div custom={1} variants={fieldVariants} className="flex justify-end">
                    <SearchBtn label="Search destinations" className="w-full sm:w-auto sm:min-w-[200px]" />
                  </motion.div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}