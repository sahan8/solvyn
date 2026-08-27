import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ShopExperience } from "@/components/shop/shop-experience";
import { collectionMeta, collectionSlugs, productsForCollection } from "@/lib/commerce/products";
import { ProductGridSkeleton } from "@/components/feedback/skeletons";
export function generateStaticParams() { return collectionSlugs.map(collection => ({ collection })); }
export async function generateMetadata({ params }) { const { collection } = await params; return { title: collectionMeta[collection]?.title ?? "Collection" }; }
export default async function CollectionPage({ params }) { const { collection } = await params; if (!collectionSlugs.includes(collection))
    notFound(); const meta = collectionMeta[collection]; return <><SiteHeader /><Suspense fallback={<ProductGridSkeleton />}><ShopExperience products={productsForCollection(collection)} title={meta.title} description={meta.description}/></Suspense><SiteFooter /></>; }
