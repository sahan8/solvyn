import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { mockProducts } from "@/data/mock-products";
import { ProductCard } from "@/components/product/product-card";
export function NewReleases() { return <section id="new-releases" className="container-shell py-[clamp(5rem,10vw,10rem)]"><div className="mb-10 flex items-end justify-between gap-5"><div><p className="eyebrow text-muted-foreground">Drop / 001</p><h2 className="section-title mt-3">New releases</h2></div><Link className="hidden items-center gap-2 border-b border-black pb-1 text-sm font-semibold uppercase sm:flex" href="/shop/new-releases">View all <ArrowRight size={16}/></Link></div><div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{mockProducts.slice(0, 3).map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}</div></section>; }
