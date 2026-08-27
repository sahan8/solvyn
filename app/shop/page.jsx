import { Suspense } from "react";
import { ShopExperience } from "@/components/shop/shop-experience";
import { productsForCollection } from "@/lib/commerce/products";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProductGridSkeleton } from "@/components/feedback/skeletons";
export const metadata = { title: "All shoes" };
export default function Shop() { return <><SiteHeader /><Suspense fallback={<ProductGridSkeleton />}><ShopExperience products={productsForCollection()} title="All shoes" description="Performance and lifestyle footwear, built around movement."/></Suspense><SiteFooter /></>; }
