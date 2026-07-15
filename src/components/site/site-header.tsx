import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Shield, User as UserIcon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../lib/theme-context";
import { useAuth } from "../../lib/auth-context";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { isLoggedIn, role, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onLogout = () => {
    logout();
    setMenuOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-secondary/95 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between gap-6 py-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Diganta Overseas home">
          <img
            src="/logo.jpeg"
            alt="Haven Crafted Journeys Logo"
            className="h-16 w-16 rounded-full object-cover object-top"
          />
          <span
            className={`font-display text-xl tracking-tight transition-colors duration-500 ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            Diganta Overseas
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
          {role === "admin" && (
            <Link
              to="/admin"
              className="rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10 px-4 py-2.5 text-sm font-medium text-[color:var(--gold)] shadow-soft transition-all duration-500 hover:bg-[color:var(--gold)]/20 flex items-center gap-1.5"
            >
              <Shield className="h-3.5 w-3.5" />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-11 w-11 place-items-center rounded-full border border-border/60 bg-card/90 shadow-soft transition-all duration-300 hover:bg-card hover:border-border"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isLoggedIn ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-border/60 bg-card/90 px-3 py-2 text-sm font-medium text-secondary-foreground shadow-soft transition-colors hover:bg-card"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-[11px] font-semibold uppercase text-primary-foreground">
                  {(user?.name || "?").slice(0, 1)}
                </span>
                <span className="max-w-[100px] truncate">{user?.name.split(" ")[0]}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lift"
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <Link
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-secondary"
                    >
                      <UserIcon className="h-4 w-4" /> Your account
                    </Link>
                    {role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-secondary"
                      >
                        <Shield className="h-4 w-4" /> Admin panel
                      </Link>
                    )}
                    <button
                      onClick={onLogout}
                      className="flex w-full items-center gap-3 border-t border-border/60 px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center rounded-full border border-border/60 bg-card/90 px-4 py-2.5 text-sm font-medium text-secondary-foreground shadow-soft transition-all hover:bg-card"
            >
              Sign in
            </Link>
          )}

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
            className="fixed inset-0 z-50 bg-background lg:hidden overflow-y-auto"
          >
            <div className="container-editorial flex items-center justify-between py-4">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <img
                  src="/logo.jpeg"
                  alt="Haven Crafted Journeys Logo"
                  className="h-16 w-16 rounded-full object-cover object-top"
                />
                <span className="font-display text-xl text-navy">Diganta Overseas</span>
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
              className="container-editorial mt-8 flex flex-col gap-1 pb-16"
              aria-label="Mobile"
            >
              {nav.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
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
              {role === "admin" && (
                <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl border border-[color:var(--gold)]/50 bg-[color:var(--gold)]/10 px-5 py-5 font-display text-2xl text-[color:var(--gold)] shadow-soft"
                  >
                    Admin
                  </Link>
                </motion.div>
              )}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8 flex flex-col gap-3"
              >
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/account"
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-full border border-border/60 bg-card px-6 py-4 text-base font-medium text-foreground"
                    >
                      Your account
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        setOpen(false);
                      }}
                      className="inline-flex w-full items-center justify-center rounded-full border border-destructive/40 px-6 py-4 text-base font-medium text-destructive"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-border/60 bg-card px-6 py-4 text-base font-medium text-foreground"
                  >
                    Sign in
                  </Link>
                )}
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
