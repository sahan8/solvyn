import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const assetRoot = "/assets/solvyn-drop-01";

export function FoundationPlaceholders() {
  return (
    <>
      <section aria-label="Featured shoe campaign" className="container-shell">
        <div className="relative grid min-h-[28rem] overflow-hidden p-6 text-center text-white">
          <Image src={`${assetRoot}/shoe-architectural.jpeg`} alt="SOLVYN sneaker floating in an architectural campaign environment" fill sizes="(max-width: 1536px) 100vw, 1536px" className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 m-auto">
            <p className="eyebrow text-[#c7ff2f]">Campaign / Drop 01</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,6rem)] font-semibold tracking-[-.06em]">FORM IN MOTION</h2>
          </div>
        </div>
      </section>
      <section className="container-shell grid gap-4 py-4 md:grid-cols-2">
        <CampaignCard title="Performance collection" code="Run / 02" image="runner-acceleration.jpeg" alt="Athlete accelerating in SOLVYN running campaign" />
        <CampaignCard title="Lifestyle collection" code="City / 03" image="vx01-on-foot.jpeg" alt="Model wearing SOLVYN VX-01 sneakers" />
      </section>
    </>
  );
}

function CampaignCard({ title, code, image, alt }) {
  return <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden p-[clamp(1.25rem,4vw,3rem)] text-white"><Image src={`${assetRoot}/${image}`} alt={alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" /><p className="eyebrow relative z-10">{code}</p><h2 className="relative z-10 font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[.9] tracking-[-.055em]">{title}</h2></div>;
}

export function CategorySplit() {
  return <section aria-labelledby="shop-by-category" className="container-shell py-[clamp(5rem,10vw,10rem)]"><p className="eyebrow text-muted-foreground">Choose your line</p><h2 id="shop-by-category" className="sr-only">Shop by category</h2><div className="mt-5 grid gap-px bg-border md:grid-cols-2"><Category href="/shop/men" label="Shop men" n="01" image="runner-urban-men.jpeg" /><Category href="/shop/women" label="Shop women" n="02" image="runner-campaign-women.jpeg" /></div></section>;
}

function Category({ href, label, n, image }) {
  return <Link href={href} className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden p-[clamp(1.5rem,5vw,4rem)] text-white"><Image src={`${assetRoot}/${image}`} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/35" /><span className="eyebrow relative z-10 opacity-70">Category / {n}</span><span className="relative z-10 flex items-end justify-between gap-4 font-display text-[clamp(2.7rem,7vw,6.5rem)] font-semibold leading-none tracking-[-.06em]">{label}<ArrowUpRight className="mb-1 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></Link>;
}