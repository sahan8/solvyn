import { FitCheckFlow } from "@/components/fit-check/fit-check-flow";
import { SiteHeader } from "@/components/navigation/site-header";
import { getProduct } from "@/lib/commerce/products";

export const metadata = { title: "Fit Check", description: "A transparent SOLVYN starting-size recommendation based on your sizing profile and optional measurements." };

export default async function FitCheckPage({ searchParams }) {
  const params = await searchParams;
  const slug = typeof params?.product === "string" && /^[a-z0-9-]{1,40}$/.test(params.product) ? params.product : "";
  const product = slug ? getProduct(slug) : null;
  return <><SiteHeader/><FitCheckFlow product={product || null}/></>;
}