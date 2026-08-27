"use client";
import { mockProducts } from "@/data/mock-products";
import { useWishlist } from "@/lib/commerce/wishlist-store";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";
export function WishlistPage() { const w = useWishlist(), products = mockProducts.filter(p => w.ids.includes(p.id)); return <main id="main" className="container-shell min-h-[70vh] pb-20 pt-28"><p className="eyebrow text-muted-foreground">Saved / Anonymous</p><h1 className="mt-3 font-display text-[clamp(3rem,8vw,7rem)] font-semibold leading-none tracking-[-.07em]">WISHLIST</h1>{products.length ? <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">{products.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}</div> : <div className="grid min-h-72 place-items-center text-center"><div><h2 className="font-display text-3xl font-semibold">NOTHING SAVED YET.</h2><p className="mt-2 text-muted-foreground">Keep the forms you want to revisit here.</p><Link href="/shop" className="mt-6 inline-flex min-h-12 items-center bg-black px-6 text-sm font-semibold text-white">EXPLORE ALL SHOES</Link></div></div>}</main>; }
