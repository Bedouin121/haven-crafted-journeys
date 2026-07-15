import { useEffect, useRef, useState } from "react";

/**
 * Minimal, tasteful custom cursor.
 * Two elements: a small dot that follows exactly, and a soft ring
 * that lags gently. On interactive hover (a, button, [role="button"], input,
 * [data-cursor]) the ring grows a little. Disabled for touch and reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      return !!el.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor], summary'
      );
    };

    const onOver = (e: MouseEvent) => setHovering(isInteractive(e.target as Element));
    const onOut = () => setHovering(false);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.documentElement.classList.add("has-custom-cursor");
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border transition-[width,height,border-color,background-color,opacity] duration-200 ease-out ${
          hovering
            ? "h-10 w-10 border-transparent bg-[color:var(--teal)]/15 backdrop-blur-[1px]"
            : "h-8 w-8 border-[color:var(--foreground)]/25"
        }`}
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
