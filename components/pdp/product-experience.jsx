"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, Star, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGallery } from "@/components/pdp/product-gallery";
import { ProductCard } from "@/components/product/product-card";
import { ProductPrice } from "@/components/product/product-price";
import { ProductSwatches } from "@/components/product/product-swatches";
import { WishlistButton } from "@/components/product/wishlist-button";
import { useBag } from "@/lib/commerce/bag-store";
import { useRecentlyViewed } from "@/lib/commerce/recently-viewed";
import { mockProducts } from "@/data/mock-products";
import { calculateCartTotals, resolveCartItems } from "@/lib/commerce/cart";
import { formatMoney } from "@/lib/commerce/money";

const reviews = [
  { id: 1, initials: "AR", rating: 5, date: "2026-08-18", size: 9, usual: 9, fit: "True to size", text: "Balanced cushioning with a secure heel. It stayed comfortable through a full day on foot.", helpful: 24 },
  { id: 2, initials: "MK", rating: 4, date: "2026-08-09", size: 8, usual: 8, fit: "Regular", text: "Clean profile and a stable ride. The upper relaxed slightly after the first wear.", helpful: 17 },
  { id: 3, initials: "JL", rating: 5, date: "2026-07-26", size: 10, usual: 10, fit: "True to size", text: "Responsive without feeling harsh, and the shape works beyond training days.", helpful: 31 }
];

export function ProductExperience({ product }) {
  const searchParams = useSearchParams();
  const requestedFitSize = Number(searchParams.get("fitSize"));
  const fitVariant = Number.isFinite(requestedFitSize) ? product.variants.find((item) => item.sizes.some((entry) => entry.value === requestedFitSize && entry.inStock)) : null;
  const validatedFitSize = fitVariant ? requestedFitSize : null;
  const [variantId, setVariantId] = useState(fitVariant?.id || product.variants[0]?.id || "");
  const variant = product.variants.find((item) => item.id === variantId) || product.variants[0];
  const [size, setSize] = useState(validatedFitSize);
  const [error, setError] = useState("");
  const [guide, setGuide] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [message, setMessage] = useState("");
  const [reviewSort, setReviewSort] = useState("helpful");
  const sizeRef = useRef(null);
  const bag = useBag();
  const recentIds = useRecentlyViewed(product.id);
  const soldOut = !variant?.sizes.some((item) => item.inStock);
  const related = useMemo(() => mockProducts.filter((item) => item.id !== product.id && (item.category === product.category || item.collection === product.collection)).slice(0, 4), [product]);
  const recent = recentIds.map((id) => mockProducts.find((item) => item.id === id)).filter(Boolean).slice(0, 4);
  const sortedReviews = [...reviews].sort((a, b) => reviewSort === "newest" ? Date.parse(b.date) - Date.parse(a.date) : reviewSort === "highest" ? b.rating - a.rating : reviewSort === "lowest" ? a.rating - b.rating : b.helpful - a.helpful);

  function chooseVariant(id) { setVariantId(id); setSize(null); setError(""); }
  function addToBag() {
    if (soldOut) return;
    if (!size) { setError("Choose your size before adding to bag."); sizeRef.current?.focus(); return; }
    const validSize = variant.sizes.find((item) => item.value === size && item.inStock);
    if (!validSize) { setError("That size is currently unavailable."); return; }
    const saved = bag.add({ productId: product.id, slug: product.slug, name: product.name, variantId: variant.id, colorId: variant.color.id, colorName: variant.color.name, size, price: product.price });
    setMessage(saved ? `${product.name}, ${variant.color.name}, US ${size} added to bag.` : "Added for this session, but local storage is unavailable.");
    setDrawer(true);
  }

  return <>
    <main id="main" className="pb-28 pt-20 md:pt-24">
      <div className="container-shell grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,.75fr)] lg:items-start">
        <ProductGallery product={product} color={variant.color}/>
        <section className="lg:sticky lg:top-24 lg:py-8" aria-labelledby="product-title">
          <p className="eyebrow text-muted-foreground">{product.collection} / {product.category}</p>
          <h1 id="product-title" className="mt-3 font-display text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[.86] tracking-[-.065em]">{product.name}</h1>
          <p className="mt-3 text-muted-foreground">{product.subtitle}</p>
          <div className="mt-5 flex items-center justify-between gap-4"><ProductPrice product={product}/><p className="flex items-center gap-2 text-sm"><Star size={15} fill="currentColor"/> {product.rating} <span className="text-muted-foreground">({product.reviewCount || 0})</span></p></div>
          <div className="mt-8"><p className="eyebrow mb-2">Color / {variant.color.name}</p><ProductSwatches variants={product.variants} selected={variant.id} onSelect={chooseVariant}/></div>
          {validatedFitSize && size === validatedFitSize && <div className="mt-6 border-l-4 border-[#c7ff2f] bg-[#c7ff2f]/15 p-4"><p className="eyebrow">Your fit</p><strong className="mt-1 block">Recommended starting size: US {validatedFitSize}</strong><p className="mt-1 text-xs text-muted-foreground">Guidance based on your Fit Check profile, not a guarantee.</p></div>}
          <fieldset className="mt-7"><div className="flex items-center justify-between"><legend className="eyebrow">Select size</legend><button type="button" onClick={() => setGuide(true)} className="min-h-11 text-xs font-semibold underline underline-offset-4">SIZE GUIDE</button></div><div ref={sizeRef} tabIndex={-1} className={`grid grid-cols-4 gap-2 outline-none sm:grid-cols-5 ${error ? "ring-2 ring-red-700 ring-offset-2" : ""}`}>{variant.sizes.map((item) => <button type="button" key={item.value} disabled={!item.inStock} aria-pressed={size === item.value} onClick={() => {setSize(item.value);setError("");}} className={`relative min-h-12 border text-sm ${size === item.value ? "border-black bg-black text-white" : "border-border"} disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:line-through`}>US {item.value}{item.inStock && (item.value + product.id.length) % 4 === 0 && <span className="absolute inset-x-0 -bottom-4 text-[.58rem] font-semibold text-amber-800 no-underline">LOW</span>}</button>)}</div><p className="mt-5 min-h-5 text-sm font-medium text-red-800" role="alert">{error}</p></fieldset>
          <div className="mt-4 border-y border-border py-5"><p className="eyebrow">Not sure?</p><Link href={`/fit-check?product=${encodeURIComponent(product.slug)}&gender=${encodeURIComponent(product.gender)}&color=${encodeURIComponent(variant.color.id)}`} className="mt-2 inline-block font-display text-2xl font-semibold underline decoration-[#c7ff2f] decoration-4 underline-offset-4">FIND MY FIT →</Link><p className="mt-2 text-sm text-muted-foreground">Get a size recommendation based on your measurements and fit preference.</p></div>
          {soldOut ? <div className="mt-5 bg-muted p-4"><strong>CURRENTLY UNAVAILABLE</strong><p className="mt-1 text-sm text-muted-foreground">No sizes are available in this color.</p></div> : null}
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2"><button type="button" disabled={soldOut} onClick={addToBag} className="min-h-14 bg-black px-6 text-sm font-semibold text-white disabled:opacity-40">{soldOut ? "CURRENTLY UNAVAILABLE" : "ADD TO BAG"}</button><div className="border border-black"><WishlistButton id={product.id} name={product.name}/></div></div>
          <p className="sr-only" aria-live="polite">{message}</p>
          <DeliveryReturns/>
        </section>
      </div>
      <div className="container-shell mt-20"><ProductDetails product={product}/><Reviews product={product} reviews={sortedReviews} sort={reviewSort} onSort={setReviewSort}/><ProductRail title="YOU MAY ALSO LIKE" products={related}/>{recent.length > 0 && <ProductRail title="RECENTLY VIEWED" products={recent}/>}</div>
    </main>
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden"><ProductPrice product={product}/><button type="button" disabled={soldOut} onClick={addToBag} className="min-h-12 bg-black px-6 text-sm font-semibold text-white disabled:opacity-40">ADD TO BAG</button></div>
    <SizeGuide open={guide} onOpenChange={setGuide}/><BagDrawer open={drawer} onOpenChange={setDrawer} bag={bag}/>
  </>;
}

function DeliveryReturns() { return <div className="mt-7 grid gap-3 text-sm sm:grid-cols-2"><div className="border border-border p-4"><strong className="eyebrow">Standard delivery</strong><p className="mt-2 text-muted-foreground">Estimated 3–5 business days. Timing is general until shipping is configured.</p></div><div className="border border-border p-4"><strong className="eyebrow">Returns</strong><p className="mt-2 text-muted-foreground">Eligible unworn items may be returned within the configured period. Final policy is pending.</p></div></div>; }
function ProductDetails({ product }) { const sections=[['DESCRIPTION',product.description],['MATERIALS','Engineered mesh upper, responsive foam platform and durable rubber contact zones.'],['CARE','Wipe clean with a soft damp cloth. Air dry away from direct heat.'],['DETAILS',`Model ${product.modelCode}. Designed for ${product.category} movement with a ${product.collection} collection profile.`]]; return <section aria-labelledby="details-heading" className="max-w-4xl border-t border-black"><h2 id="details-heading" className="sr-only">Product details</h2>{sections.map(([title,body])=><details key={title} className="group border-b border-border"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between font-semibold"><span>{title}</span><ChevronDown className="transition-transform group-open:rotate-180"/></summary><p className="max-w-2xl pb-6 leading-7 text-muted-foreground">{body}</p></details>)}</section>; }
function Reviews({ product, reviews: list, sort, onSort }) { return <section className="py-20" aria-labelledby="reviews-title"><div className="flex flex-col justify-between gap-5 border-b border-black pb-6 sm:flex-row sm:items-end"><div><p className="eyebrow text-muted-foreground">Community / Mock preview</p><h2 id="reviews-title" className="section-title mt-3">REVIEWS</h2></div><label className="text-xs font-semibold">SORT <select value={sort} onChange={(e)=>onSort(e.target.value)} className="ml-2 min-h-11 border border-border bg-transparent px-3"><option value="helpful">Most Helpful</option><option value="newest">Newest</option><option value="highest">Highest Rating</option><option value="lowest">Lowest Rating</option></select></label></div><div className="grid gap-8 py-8 lg:grid-cols-[.7fr_1.3fr]"><div><strong className="font-display text-6xl">{product.rating}</strong><p className="mt-2 tracking-widest" aria-label={`${product.rating} out of 5 stars`}>★★★★★</p><p className="mt-2 text-sm text-muted-foreground">{product.reviewCount || 0} reviews</p><div className="mt-8 space-y-4"><FitScale label="FIT" left="Runs Small" center="True to Size" right="Runs Large"/><FitScale label="WIDTH" left="Narrow" center="Regular" right="Wide"/></div></div><div className="divide-y divide-border">{list.map((review)=><article key={review.id} className="py-6 first:pt-0"><div className="flex justify-between"><strong>{review.initials}</strong><span aria-label={`${review.rating} stars`}>{'★'.repeat(review.rating)}</span></div><p className="mt-2 text-xs text-muted-foreground">Purchased US {review.size} · Usually US {review.usual} · {review.fit} · {review.date}</p><p className="mt-4 leading-7">{review.text}</p></article>)}</div></div></section>; }
function FitScale({label,left,center,right}) { return <div><p className="eyebrow">{label}</p><div className="relative mt-3 h-1 bg-border"><span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"/></div><div className="mt-2 flex justify-between text-[.65rem] text-muted-foreground"><span>{left}</span><span>{center}</span><span>{right}</span></div></div>; }
function ProductRail({title,products}) { return <section className="py-14" aria-labelledby={title.replaceAll(' ','-')}><h2 id={title.replaceAll(' ','-')} className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-.055em]">{title}</h2><div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{products.map((item,index)=><ProductCard key={item.id} product={item} index={index}/>)}</div></section>; }
function SizeGuide({open,onOpenChange}) { const rows=[[7,6,40,25],[8,7,41,26],[9,8,42,27],[10,9,43,28],[11,10,44,29],[12,11,45,30]]; return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-[80] bg-black/55"/><Dialog.Content className="fixed inset-x-0 bottom-0 z-[81] max-h-[90dvh] overflow-auto bg-background p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:inset-y-0 md:left-auto md:right-0 md:w-[34rem]"><div className="flex items-center justify-between"><Dialog.Title className="font-display text-4xl font-semibold">SIZE GUIDE</Dialog.Title><Dialog.Close className="grid size-11 place-items-center" aria-label="Close size guide"><X/></Dialog.Close></div><Dialog.Description className="mt-3 text-muted-foreground">General conversion reference. Size conversion does not guarantee fit.</Dialog.Description><table className="mt-8 w-full border-collapse text-center"><thead><tr>{['US','UK','EU','CM'].map((h)=><th className="border border-border p-3" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row)=><tr key={row[0]}>{row.map((cell)=><td className="border border-border p-3" key={cell}>{cell}</td>)}</tr>)}</tbody></table><p className="mt-6">For a more personalized recommendation, use <Link href="/fit-check" className="font-semibold underline">Fit Check</Link>.</p></Dialog.Content></Dialog.Portal></Dialog.Root>; }
function BagDrawer({open,onOpenChange,bag}) { const reduced=useReducedMotion(); const resolved=resolveCartItems(bag.items); const totals=calculateCartTotals(resolved.lines); return <Dialog.Root open={open} onOpenChange={onOpenChange}><AnimatePresence>{open&&<Dialog.Portal forceMount><Dialog.Overlay asChild><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black/55"/></Dialog.Overlay><Dialog.Content asChild><motion.aside initial={reduced?{opacity:0}:{x:'100%'}} animate={{x:0,opacity:1}} exit={reduced?{opacity:0}:{x:'100%'}} className="fixed inset-y-0 right-0 z-[81] flex w-full max-w-md flex-col bg-background p-5"><div className="flex items-center justify-between"><Dialog.Title className="font-display text-3xl font-semibold">YOUR BAG ({bag.count})</Dialog.Title><Dialog.Close className="grid size-11 place-items-center" aria-label="Close bag"><X/></Dialog.Close></div><p className="mt-2 flex items-center gap-2 text-sm text-green-800" aria-live="polite"><Check size={16}/> Added to bag</p><div className="mt-6 flex-1 divide-y divide-border overflow-y-auto">{resolved.lines.map((line)=><div className="py-5" key={line.key}><div className="flex justify-between gap-3"><div><strong>{line.product.name}</strong><p className="mt-1 text-sm text-muted-foreground">{line.variant.color.name} · US {line.size} · Qty {line.quantity}</p></div><span>{formatMoney(line.unitPriceCents*line.quantity)}</span></div><button onClick={()=>bag.remove(line.key)} className="mt-3 text-xs underline">REMOVE</button></div>)}</div><div className="border-t border-black pt-5"><div className="flex justify-between font-semibold"><span>SUBTOTAL</span><span>{formatMoney(totals.subtotalCents)}</span></div><p className="mt-2 text-xs text-muted-foreground">Displayed totals are not authoritative. Checkout revalidates current catalog prices server-side.</p><Link href="/cart" className="mt-5 flex min-h-12 items-center justify-center border border-black font-semibold">VIEW BAG</Link><Link href="/checkout" className="mt-2 flex min-h-12 items-center justify-center bg-black text-white">CHECKOUT</Link></div></motion.aside></Dialog.Content></Dialog.Portal>}</AnimatePresence></Dialog.Root>; }