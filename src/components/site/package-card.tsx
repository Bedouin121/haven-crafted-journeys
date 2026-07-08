import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Clock, ArrowRight } from "lucide-react";
import type { Package } from "../../lib/data";

export function PackageCard({ pkg, index = 0 }: { pkg: Package; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-3xl bg-card overflow-hidden card-elevated hover-lift"
    >
      <Link
        to="/packages/$slug"
        params={{ slug: pkg.slug }}
        className="flex flex-col h-full focus:outline-none"
      >
        <div className="relative aspect-[16/11] overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
          <span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium text-navy">
            {pkg.style}
          </span>
          <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium text-navy">
            <Star className="h-3 w-3 fill-gold text-gold" /> {pkg.rating}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 flex-1">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{pkg.destination}</p>
            <h3 className="mt-2 font-display text-2xl text-navy leading-tight">{pkg.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{pkg.summary}</p>
          <div className="mt-auto flex items-end justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {pkg.nights} nights
              </p>
              <p className="font-display text-2xl text-navy mt-1">
                ${pkg.price.toLocaleString()}
                <span className="text-xs text-muted-foreground ml-1 font-sans">/ person</span>
              </p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-navy transition-all group-hover:bg-navy group-hover:text-primary-foreground">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
