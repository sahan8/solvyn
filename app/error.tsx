"use client";
import { EmptyState } from "@/components/feedback/empty-state";
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className="grid min-h-dvh place-items-center p-6"><EmptyState eyebrow="System / 01" title="We lost the line." description="A temporary error interrupted this page. Your details are safe." actionLabel="Try again" onAction={reset}/></main>}
