"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Expand, Play, Rotate3D, X } from "lucide-react";
import { useState } from "react";

const root = "/assets/solvyn-drop-01";
const slides = [
  { src: `${root}/shoe-side-profile.jpeg`, label: "Side view" },
  { src: `${root}/shoe-studio-angle.jpeg`, label: "Front angle" },
  { src: `${root}/shoe-rear.jpeg`, label: "Rear angle" },
  { src: `${root}/shoe-top.jpeg`, label: "Top view" },
  { src: `${root}/shoe-outsole.jpeg`, label: "Outsole view" },
  { src: `${root}/shoe-material-macro.jpeg`, label: "Material detail" },
  { type: "video", src: `${root}/shoe-seamless-loop.mp4`, poster: `${root}/shoe-performance.jpeg`, label: "Product motion loop" },
  { type: "video", src: `${root}/shoe-macro-motion.mp4`, poster: `${root}/shoe-material-macro.jpeg`, label: "Material motion detail" },
  { type: "3d", label: "360° view" }
];

export function ProductGallery({ product, color }) {
  const [zoom, setZoom] = useState(null);
  const [notice, setNotice] = useState(false);
  const reduced = useReducedMotion();
  return <div>
    <div className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto lg:grid lg:grid-cols-2 lg:overflow-visible">
      {slides.map((slide,index) => {
        if (slide.type === "3d") return <button type="button" key={slide.label} onClick={()=>setNotice(true)} className="grid aspect-[4/5] min-w-[88vw] snap-center place-items-center bg-[#161616] text-white sm:min-w-[70vw] lg:min-w-0"><span className="text-center"><Rotate3D className="mx-auto" size={38}/><strong className="mt-4 block font-display text-3xl">360° VIEW</strong><small className="mt-2 block text-white/55">Interactive view coming soon</small></span></button>;
        if (slide.type === "video") return <div key={slide.src} className="relative aspect-[4/5] min-w-[88vw] snap-center overflow-hidden bg-black sm:min-w-[70vw] lg:min-w-0"><video controls muted loop playsInline preload="metadata" poster={slide.poster} aria-label={`${product.name} ${slide.label}`} className="size-full object-cover"><source src={slide.src} type="video/mp4"/></video><span className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 bg-black/75 px-3 py-2 text-xs font-semibold text-white"><Play size={14}/> MOTION</span></div>;
        return <motion.button type="button" key={slide.src} onClick={()=>setZoom(slide)} initial={false} animate={{opacity:1}} className={`group relative aspect-[4/5] min-w-[88vw] snap-center overflow-hidden bg-muted sm:min-w-[70vw] lg:min-w-0 ${index===0?"lg:col-span-2":""}`} aria-label={`Expand ${slide.label}`}><Image src={slide.src} alt={`${product.name} ${slide.label.toLowerCase()} in ${color.name}`} fill priority={index===0} sizes="(max-width: 1023px) 88vw, 50vw" className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.015]"/><span className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white/90"><Expand size={18}/></span></motion.button>;
      })}
    </div>
    <div className="mt-3 flex items-center justify-between lg:hidden"><span className="eyebrow">Swipe gallery</span><span className="eyebrow">1 / {slides.length}</span></div>
    <Dialog.Root open={Boolean(zoom)} onOpenChange={(open)=>!open&&setZoom(null)}><AnimatePresence>{zoom&&<Dialog.Portal forceMount><Dialog.Overlay asChild><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black/80"/></Dialog.Overlay><Dialog.Content asChild><motion.div initial={reduced?{opacity:0}:{opacity:0,scale:.98}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="fixed inset-4 z-[81] bg-black md:inset-10"><Dialog.Title className="sr-only">{zoom.label}</Dialog.Title><Image src={zoom.src} alt={`${product.name} ${zoom.label.toLowerCase()}`} fill sizes="100vw" className="object-contain"/><Dialog.Close className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white" aria-label="Close expanded media"><X/></Dialog.Close></motion.div></Dialog.Content></Dialog.Portal>}</AnimatePresence></Dialog.Root>
    <Dialog.Root open={notice} onOpenChange={setNotice}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-[80] bg-black/60"/><Dialog.Content className="fixed left-1/2 top-1/2 z-[81] w-[min(30rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 bg-background p-8"><Dialog.Title className="font-display text-3xl font-semibold">360° VIEW</Dialog.Title><Dialog.Description className="mt-3 text-muted-foreground">Interactive 3D view coming soon. The gallery is ready for the future viewer.</Dialog.Description><Dialog.Close className="mt-6 min-h-11 bg-black px-5 text-white">CLOSE</Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>;
}