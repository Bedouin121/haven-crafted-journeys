import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./brand-icons";

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/digantaoverseas" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/diganta_overseas" },
  { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@diganta_overseas3" },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-brand-navy text-white">
      <div className="container-editorial py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2" aria-label="Diganta Overseas home">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand text-navy font-display text-xl">D</span>
              <span className="font-display text-2xl">Diganta Overseas</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Bespoke travel, quietly considered. Diganta Overseas designs meticulously planned journeys and handles visas end to end, for travelers who value the finer details.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" aria-hidden />
                <span>4/A Indira Road, Mahabub Plaza (4th Floor), Room No-503, Farmgate, Dhaka – 1215</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href="tel:+8801840519083" className="hover:text-gold transition-colors">+8801840-519083</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href="mailto:hello@digantaoverseas.com" className="hover:text-gold transition-colors">hello@digantaoverseas.com</a>
              </li>
            </ul>
          </div>

          <FooterCol title="Discover" links={[
            ["Destinations", "/destinations"],
            ["Journeys", "/packages"],
            ["Tourist Visa", "/visa"],
            ["Student Visa", "/student-visa"],
            ["Client stories", "/testimonials"],
          ]} />
          <FooterCol title="Company" links={[
            ["About", "/about"],
            ["Plan your dream trip", "/plan-dream-trip"],
            ["Book a trip", "/book"],
            ["Contact", "/contact"],
            ["FAQ", "/faq"],
          ]} />
          <FooterCol title="Considerations" links={[
            ["Privacy", "/"],
            ["Terms", "/"],
            ["Responsible travel", "/about"],
          ]} />
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Diganta Overseas. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/10 hover:border-gold/60 hover:text-gold transition-colors"
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
      <h3 className="text-eyebrow text-white/60">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-white/85 hover:text-gold transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
