import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Journeys" },
  { to: "/visa", label: "Visa" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-secondary/95 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between gap-6 py-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Travel Tours home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-primary-foreground font-display text-lg leading-none">
            T
          </span>
          <span className={`font-display text-xl tracking-tight transition-colors duration-500 ${scrolled ? "text-navy" : "text-white"}`}>
            Travel Tours
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{
                className:
                  "rounded-full border border-navy bg-navy px-5 py-2.5 text-base font-medium text-primary-foreground shadow-soft transition-all duration-500 hover:bg-navy-soft",
              }}
              inactiveProps={{
                className:
                  "rounded-full border border-border/60 bg-card/90 px-5 py-2.5 text-base font-medium text-secondary-foreground shadow-soft transition-all duration-500 hover:bg-card hover:border-border hover:shadow-lift hover:-translate-y-0.5",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/book"
            className="hidden sm:inline-flex items-center rounded-full bg-navy px-5 py-2.5 text-base font-medium text-primary-foreground shadow-soft transition-all duration-500 hover:bg-navy-soft hover:shadow-lift"
          >
            Plan a trip
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden grid place-items-center h-11 w-11 rounded-full border border-border/60 bg-card/90 shadow-soft transition-all duration-300 hover:bg-card hover:border-border"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background lg:hidden"
          >
            <div className="container-editorial flex items-center justify-between py-4">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-primary-foreground font-display">T</span>
                <span className="font-display text-xl text-navy">Travel Tours</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid place-items-center h-11 w-11 rounded-full border border-border/60 bg-card/90 shadow-soft transition-all duration-300 hover:bg-card hover:border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="container-editorial mt-8 flex flex-col gap-1"
              aria-label="Mobile"
            >
              {nav.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl border border-border/60 bg-card px-5 py-5 font-display text-2xl text-secondary-foreground shadow-soft transition-all duration-500 hover:bg-secondary hover:border-border"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8"
              >
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-navy px-6 py-4 text-base font-medium text-primary-foreground shadow-soft transition-all duration-300 hover:bg-navy-soft hover:shadow-lift"
                >
                  Plan a trip
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
