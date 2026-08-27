import Image from "next/image";
import { cn } from "@/lib/utils";
export function ProductImage({ src, alt, className, priority = false }) { return <div className={cn("relative aspect-[4/3] overflow-hidden bg-muted", className)}><Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 767px) 88vw, (max-width: 1279px) 45vw, 31vw" className="object-contain p-[6%] transition-transform duration-500 [@media(hover:hover)]:group-hover:-translate-y-[3%]"/></div>; }
