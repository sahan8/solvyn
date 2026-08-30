import { notFound } from "next/navigation";
import { ProductExperience } from "@/components/pdp/product-experience";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getProduct } from "@/lib/commerce/products";
import { mockProducts } from "@/data/mock-products";

export function generateStaticParams() { return mockProducts.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  const title = `${product.name} — ${product.subtitle}`;
  return {
    title,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title, description: product.description, type: "website", url: `/product/${product.slug}`, images: [{ url: "/assets/solvyn-drop-01/shoe-side-profile.jpeg", alt: `${product.name} side profile` }] }
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <><SiteHeader/><ProductExperience product={product}/><SiteFooter/></>;
}