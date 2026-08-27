"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "motion/react";
export function BrandLoader() { const ref = useRef(null); const reduced = useReducedMotion(); useEffect(() => { if (reduced || !ref.current)
    return; const root = ref.current; const line = root.querySelector("[data-line]"); animate(root.querySelectorAll("[data-letter]"), { opacity: [0, 1], translateY: [8, 0], delay: stagger(45), duration: 280, ease: "out(3)" }); if (line)
    animate(line, { scaleX: [0, 1], duration: 420, delay: 160, ease: "out(3)" }); }, [reduced]); return <div ref={ref} role="status" aria-label="Loading SOLVYN" className="fixed inset-0 z-[80] grid place-items-center bg-[#0a0a0a] text-white"><div><div aria-hidden className="font-display text-3xl font-bold tracking-[.22em]">{"SOLVYN".split("").map((l, i) => <span data-letter key={i} className="inline-block">{l}</span>)}</div><span data-line aria-hidden className="mt-3 block h-px origin-left bg-[#c7ff2f]"/></div></div>; }
