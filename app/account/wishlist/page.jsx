import { requireUser } from "@/lib/auth/session";
import { PageFrame } from "@/components/account/page-frame";import { AccountWishlist } from "@/components/account/account-wishlist";
export const metadata={title:"Wishlist"};export default async function Page(){await requireUser('/account/wishlist');return <PageFrame eyebrow="Wishlist" title="SAVED PAIRS."><AccountWishlist/></PageFrame>}
