import { SiteHeader } from "@/components/navigation/site-header";
import { AccountNav } from "@/components/account/account-nav";
export const metadata={title:{default:"Account",template:"%s — SOLVYN"},robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default function AccountLayout({children}){return <><SiteHeader/><main id="main" className="min-h-dvh pt-24"><div className="container-shell grid gap-10 py-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-14"><AccountNav/><div className="min-w-0">{children}</div></div></main></>}
