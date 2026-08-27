import { SiteHeader } from "@/components/navigation/site-header";
import { Hero } from "@/components/home/hero";
import { NewReleases } from "@/components/home/new-releases";
import { CategorySplit, FoundationPlaceholders } from "@/components/home/sections";
import { FitCheckTeaser } from "@/components/fit-check/fit-check-teaser";
import { SiteFooter } from "@/components/layout/site-footer";
export default function Home(){return <><SiteHeader/><main id="main"><Hero/><NewReleases/><FoundationPlaceholders/><CategorySplit/><FitCheckTeaser/></main><SiteFooter/></>}
