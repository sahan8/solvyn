import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WishlistPage } from "@/components/wishlist/wishlist-page";
export const metadata = { title: "Wishlist" };
export default function Page() { return <><SiteHeader /><WishlistPage /><SiteFooter /></>; }
