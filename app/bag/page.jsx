import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BagPage } from "@/components/bag/bag-page";
export const metadata = { title: "Bag" };
export default function Page(){return <><SiteHeader/><BagPage/><SiteFooter/></>}