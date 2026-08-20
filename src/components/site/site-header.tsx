import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Shield, User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../lib/theme-context";
import { useAuth } from "../../lib/auth-context";

type NavItem =
  | { to: string; label: string; children?: undefined }
  | {
      to: string;
      label: string;
      children: { to: string; label: string; search?: Record<string, string> }[];
    };

const nav: NavItem[] = [
  {
    to: "/destinations",
    label: "Destinations",
    children: [
      { to: "/destinations", label: "International Tours", search: { category: "international" } },
      { to: "/destinations", label: "Domestic Tours", search: { category: "domestic" } },
      { to: "/destinations", label: "Honeymoon Packages", search: { category: "honeymoon" } },
      { to: "/destinations", label: "Group Tours", search: { category: "group" } },
    ],
  },
  {
    to: "/hajj-umrah",
    label: "Hajj & Umrah",
    children: [
      { to: "/hajj-umrah", label: "Hajj Packages", search: { type: "hajj" } },
      { to: "/hajj-umrah", label: "Umrah Packages", search: { type: "umrah" } },
    ],
  },
  { to: "/visa", label: "Tourist Visa" },
  { to: "/student-visa", label: "Student Visa" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];


export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { isLoggedIn, role, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  // Show white text only on homepage hero (not scrolled). Everywhere else use theme-aware foreground.
  const logoTextClass = (!scrolled && isHome) ? "text-white" : "text-foreground";

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
      <div className="container-editorial flex items-center gap-4 py-4">
        {/* Desktop logo */}
        <Link to="/" className="flex shrink-0 items-center gap-3 group" aria-label="Upscale Travel home">
          <div className="h-20 w-20 rounded-full bg-white p-2.5 shadow-soft overflow-hidden">
            <img
              src="/logo.jpeg"
              alt="Upscale Travel logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className={`font-display text-xl tracking-tight transition-colors duration-500 ${logoTextClass}`}>
            Upscale Travel
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex flex-1 items-center justify-center gap-2">
          {nav.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
            const baseClass =
              "rounded-full border px-5 py-2.5 text-base font-medium shadow-soft transition-all duration-500 whitespace-nowrap flex items-center gap-1.5";
            const activeClass = "border-navy bg-navy text-primary-foreground hover:bg-navy-soft";
            const inactiveClass =
              "border-border/60 bg-card/90 text-secondary-foreground hover:bg-card hover:border-border hover:shadow-lift hover:-translate-y-0.5";

            if (!item.children) {
              return (
                <Link
                  key={item.to + item.label}
                  to={item.to}
                  activeProps={{ className: `${baseClass} ${activeClass}` }}
                  inactiveProps={{ className: `${baseClass} ${inactiveClass}` }}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.to + item.label} className="relative group">
                <Link
                  to={item.to}
                  className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" aria-hidden />
                </Link>
                <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-3 group-hover:block group-focus-within:block">
                  <div className="min-w-[220px] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lift">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        search={child.search as never}
                        className="block px-5 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary hover:text-navy"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

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

        <div className="flex shrink-0 items-center gap-2">
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
                className="flex items-center gap-2 rounded-full border border-border/60 bg-card/90 px-3 py-2 text-sm font-medium text-secondary-foreground shadow-soft transition-colors hover:bg-card whitespace-nowrap"
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
              className="hidden sm:inline-flex items-center rounded-full border border-border/60 bg-card/90 px-5 py-2.5 text-base font-medium text-secondary-foreground shadow-soft transition-all duration-500 hover:bg-card hover:border-border hover:shadow-lift hover:-translate-y-0.5 whitespace-nowrap"
            >
              Sign in
            </Link>
          )}

          <Link
            to="/book"
            className="hidden sm:inline-flex items-center rounded-full border border-navy bg-navy px-5 py-2.5 text-base font-medium text-primary-foreground shadow-soft transition-all duration-500 hover:bg-navy-soft whitespace-nowrap"
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
              {/* Mobile menu logo */}
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <div className="h-20 w-20 rounded-full bg-white p-2.5 overflow-hidden">
                  <img
                    src="/logo.jpeg"
                    alt="Upscale Travel logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="font-display text-xl text-navy">Upscale Travel</span>
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
                  key={item.to + item.label}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl border border-border/60 bg-card px-5 py-5 font-display text-2xl text-secondary-foreground shadow-soft transition-all duration-500 hover:bg-secondary hover:border-border"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-1 mb-2 flex flex-col gap-1 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          search={child.search as never}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl border border-border/40 bg-card/60 px-4 py-3 text-base text-secondary-foreground transition-colors hover:bg-secondary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
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
                className="mt-8 flex flex-col gap-1"
              >
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/account"
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl border border-border/60 bg-card px-5 py-5 font-display text-2xl text-secondary-foreground shadow-soft transition-all duration-500 hover:bg-secondary hover:border-border"
                    >
                      Your account
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        setOpen(false);
                      }}
                      className="block w-full text-left rounded-2xl border border-destructive/40 bg-card px-5 py-5 font-display text-2xl text-destructive shadow-soft transition-all duration-500 hover:bg-destructive/10 hover:border-destructive/60"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl border border-border/60 bg-card px-5 py-5 font-display text-2xl text-secondary-foreground shadow-soft transition-all duration-500 hover:bg-secondary hover:border-border"
                  >
                    Sign in
                  </Link>
                )}
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl border border-navy bg-navy px-5 py-5 font-display text-2xl text-primary-foreground shadow-soft transition-all duration-500 hover:bg-navy-soft"
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
