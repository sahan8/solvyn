import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartPage } from "@/components/cart/cart-page";
export const metadata={title:"Your Bag",robots:{index:false,follow:false}};
export default function Page(){return <><SiteHeader/><CartPage/><SiteFooter/></>}