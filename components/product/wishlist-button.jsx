"use client";
import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useWishlist } from "@/lib/commerce/wishlist-store";
export function WishlistButton({ id, name }) { const w = useWishlist(), active = w.has(id), reduced = useReducedMotion(); return <motion.button whileTap={reduced ? undefined : { scale: .88 }} type="button" onClick={e => { e.preventDefault(); e.stopPropagation(); w.toggle(id); }} aria-pressed={active} aria-label={`${active ? "Remove" : "Add"} ${name} ${active ? "from" : "to"} wishlist`} className="grid size-11 place-items-center rounded-full bg-white/90 shadow-sm"><Heart size={19} fill={active ? "currentColor" : "none"}/></motion.button>; }
