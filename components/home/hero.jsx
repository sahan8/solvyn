"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";

const assetRoot = "/assets/solvyn-drop-01";

export function Hero() {
  const reduced = useReducedMotion();
  return <section className="relative min-h-[clamp(43rem,100svh,68rem)] overflow-hidden bg-[#0a0a0a] text-white">
    {reduced ? <Image src={`${assetRoot}/hero-dark-sneaker.jpeg`} alt="SOLVYN performance sneaker in a dark campaign setting" fill priority sizes="100vw" className="object-cover object-center opacity-80"/> : <video autoPlay muted loop playsInline preload="metadata" poster={`${assetRoot}/hero-dark-sneaker.jpeg`} aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-80"><source src={`${assetRoot}/shoe-camera-reveal.mp4`} type="video/mp4"/></video>}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40"/>
    <div className="container-shell relative flex min-h-[clamp(43rem,100svh,68rem)] flex-col justify-end pb-9 pt-28 md:pb-12">
      <motion.div initial={{opacity:0,y:reduced?0:16}} animate={{opacity:1,y:0}} transition={{duration:reduced?.1:.7}} className="relative z-10"><p className="eyebrow mb-4 text-[#c7ff2f]">Running / 01 — New season</p><h1 className="display"><span className="block">MOVE</span><span className="block">BEYOND.</span></h1></motion.div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced?0:.35,duration:.45}} className="relative z-20 mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink href="#new-releases">Shop new releases</ButtonLink><ButtonLink href="/fit-check" variant="secondary">Find your fit</ButtonLink></motion.div>
      <p className="absolute right-[var(--gutter)] top-28 hidden max-w-48 text-right text-sm text-white/70 md:block">Engineered traction. Responsive form. Built to cross the line and keep moving.</p>
    </div>
  </section>;
}