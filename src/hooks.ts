import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue } from "framer-motion";
const RM = () => matchMedia("(prefers-reduced-motion:reduce)").matches;
const FOCUSABLE = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex='-1'])";

export function useMagnet(force = 0.25) {
  const r = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const e = r.current; if (!e || RM()) return;
    const m = (ev: PointerEvent) => {
      const b = e.getBoundingClientRect();
      x.set((ev.clientX - b.left - b.width / 2) * force);
      y.set((ev.clientY - b.top - b.height / 2) * force);
    };
    const l = () => { x.set(0); y.set(0); };
    e.addEventListener("pointermove", m); e.addEventListener("pointerleave", l);
    return () => { e.removeEventListener("pointermove", m); e.removeEventListener("pointerleave", l); };
  }, [force, x, y]);
  return { r, x, y };
}
export function useTilt<T extends HTMLElement>(max = 14, open = false) {
  const r = useRef<T>(null);
  useEffect(() => {
    const e = r.current; if (!e || RM() || open) { if (e) e.style.transform = ""; return; }
    const m = (ev: PointerEvent) => { const b = e.getBoundingClientRect(), px = (ev.clientX - b.left) / b.width, py = (ev.clientY - b.top) / b.height; e.style.transform = `rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) scale(1.04)`; e.style.setProperty("--gx", px * 100 + "%"); e.style.setProperty("--gy", py * 100 + "%"); };
    const l = () => { e.style.transform = ""; };
    e.addEventListener("pointermove", m); e.addEventListener("pointerleave", l);
    return () => { e.removeEventListener("pointermove", m); e.removeEventListener("pointerleave", l); };
  }, [max, open]);
  return r;
}
export function useFocusTrap(actif: boolean, boite: RefObject<HTMLElement | null>, fermer: () => void, retour?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!actif) return;
    const prev = (retour?.current ?? document.activeElement) as HTMLElement | null;
    const items = () => [...(boite.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter((el) => !el.hasAttribute("disabled"));
    const id = requestAnimationFrame(() => {
      const auto = boite.current?.querySelector<HTMLElement>("[data-autofocus]");
      (auto ?? items()[0])?.focus();
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); fermer(); return; }
      if (e.key !== "Tab") return;
      const list = items(); if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [actif, boite, fermer, retour]);
}
