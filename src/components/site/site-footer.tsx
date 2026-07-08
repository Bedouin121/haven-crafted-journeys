import { Link } from "@tanstack/react-router";
import { AtSign, Send, Share2, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-navy text-primary-foreground">
      <div className="container-editorial py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2" aria-label="Aeris home">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand text-navy font-display text-xl">A</span>
              <span className="font-display text-2xl">Aeris</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Bespoke travel, quietly considered. Designed in London, delivered on six continents.
            </p>
            <form className="mt-8 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Your email"
                className="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-medium text-navy hover:bg-gold-soft transition-colors">
                <Mail className="h-4 w-4" /> Subscribe
              </button>
            </form>
          </div>

          <FooterCol title="Discover" links={[
            ["Destinations", "/destinations"],
            ["Journeys", "/packages"],
            ["Journal", "/blog"],
            ["Client stories", "/testimonials"],
          ]} />
          <FooterCol title="Company" links={[
            ["About Aeris", "/about"],
            ["Plan a trip", "/book"],
            ["Contact", "/contact"],
            ["FAQ", "/faq"],
          ]} />
          <FooterCol title="Considerations" links={[
            ["Privacy", "/"],
            ["Terms", "/"],
            ["Responsible travel", "/about"],
            ["Press", "/"],
          ]} />
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Aeris Travel Studio. A fictional showcase.
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: AtSign, label: "Instagram" },
              { icon: Send, label: "Twitter" },
              { icon: Share2, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/10 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-eyebrow text-primary-foreground/60">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-primary-foreground/85 hover:text-gold transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
