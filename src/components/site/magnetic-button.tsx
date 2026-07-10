import { forwardRef } from "react";
import { useCursorLight, useMagnetic } from "../../hooks/use-interactions";
import { cn } from "../../lib/utils";

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, children, variant = "primary", onMouseMove, onMouseLeave, ...props }, forwardedRef) => {
    const magnetic = useMagnetic(0.2);
    const light = useCursorLight();

    return (
      <button
        ref={(node) => {
          (magnetic.ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          (light.ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        onMouseMove={(e) => {
          magnetic.onMove(e);
          light.onMove(e);
          onMouseMove?.(e);
        }}
        onMouseLeave={(e) => {
          magnetic.onLeave();
          onMouseLeave?.(e);
        }}
        className={cn(
          "magnetic-target cursor-light-surface relative overflow-hidden rounded-full px-8 py-4 text-lg font-medium transition-all duration-700 glow-focus",
          variant === "primary"
            ? "bg-navy text-primary-foreground hover:bg-navy-soft"
            : "border-2 border-border bg-card text-navy hover:bg-secondary",
          light.enabled &&
            "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:bg-[radial-gradient(circle_at_var(--light-x,50%)_var(--light-y,50%),oklch(1_0_0/0.18)_0%,transparent_55%)]",
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
