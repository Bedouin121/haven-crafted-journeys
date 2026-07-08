import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end ${
        align === "center" ? "text-center md:justify-center md:flex-col md:items-center" : "md:justify-between"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
      >
        {eyebrow && <p className="text-eyebrow text-teal">{eyebrow}</p>}
        <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-navy leading-[1.05]">
          {title}
        </h2>
        {intro && <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{intro}</p>}
      </motion.div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
