import Link from "next/link";
export default function NotFound() { return <main className="grid min-h-dvh place-items-center bg-[#0a0a0a] p-6 text-white"><div><p className="eyebrow text-[#c7ff2f]">404 / Off route</p><h1 className="section-title mt-4">Nothing landed here.</h1><Link className="mt-8 inline-block border-b border-[#c7ff2f] pb-1" href="/">Return home →</Link></div></main>; }
