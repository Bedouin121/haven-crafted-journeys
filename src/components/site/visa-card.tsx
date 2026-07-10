import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import type { VisaPackage } from "../../lib/data";
import { SaveButton } from "./save-button";
import { useTilt } from "../../hooks/use-interactions";

export function VisaCard({ visa, index = 0 }: { visa: VisaPackage; index?: number }) {
  const tilt = useTilt(3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      ref={tilt.ref as React.RefObject<HTMLElement>}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      className="tilt-card group flex flex-col rounded-3xl bg-card overflow-hidden card-elevated hover-lift"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={visa.image}
          alt={`${visa.country} visa`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-sm font-semibold text-navy">
          {visa.visaType}
        </span>
        <div className="absolute top-4 right-4">
          <SaveButton
            item={{
              id: `visa-${visa.slug}`,
              type: "visa",
              slug: visa.slug,
              title: `${visa.country} ${visa.visaType}`,
              subtitle: visa.turnaround,
              image: visa.image,
              price: visa.price,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground">{visa.country}</p>
          <h3 className="mt-2 font-display text-2xl text-navy leading-tight">{visa.title}</h3>
        </div>
        <p className="text-base text-muted-foreground line-clamp-2 flex-1">{visa.summary}</p>
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden /> {visa.turnaround}
            </p>
            <p className="font-display text-2xl text-navy mt-1">
              ${visa.price.toLocaleString()}
              <span className="text-sm text-muted-foreground ml-1 font-sans">/ application</span>
            </p>
          </div>
          <Link
            to="/visa"
            className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-navy transition-all duration-500 group-hover:bg-navy group-hover:text-primary-foreground glow-focus"
            aria-label={`Learn more about ${visa.title}`}
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
