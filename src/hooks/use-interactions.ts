import { useCallback, useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return touch;
}

export function useInteractionsEnabled() {
  const reduced = usePrefersReducedMotion();
  const touch = useIsTouchDevice();
  return !reduced && !touch;
}

/** Magnetic pull toward cursor — disabled on touch / reduced motion */
export function useMagnetic(strength = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useInteractionsEnabled();

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [enabled, strength],
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
  }, []);

  return { ref, onMove, onLeave, enabled };
}

/** Subtle tilt following cursor — disabled on touch / reduced motion */
export function useTilt(maxDeg = 4) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useInteractionsEnabled();

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ref.current.style.transform = `perspective(800px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)`;
    },
    [enabled, maxDeg],
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
  }, []);

  return { ref, onMove, onLeave, enabled };
}

/** Soft cursor-following light on button surfaces */
export function useCursorLight() {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const enabled = useInteractionsEnabled();

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty("--light-x", `${x}%`);
      ref.current.style.setProperty("--light-y", `${y}%`);
    },
    [enabled],
  );

  return { ref, onMove, enabled };
}
