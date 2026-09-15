'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteNav({ locale = "nl" }) {
  const pathname = usePathname() || "/";
  const en = locale === "en";
  const t = en ? { knowledge: "ERE knowledge", how: "How it works", market: "ERE Market", about: "About ERE Market", cta: "Run the ERE Check →" } : { knowledge: "ERE kennis", how: "Hoe het werkt", market: "ERE Market", about: "Over ERE Market", cta: "Doe de ERE Check →" };
  const prefix = en ? "/en" : "";
  const nlPath = en ? (pathname.replace(/^\/en(?=\/|$)/, "") || "/") : pathname;
  const enPath = en ? pathname : `/en${pathname === "/" ? "" : pathname}`;
  return <nav className="nav">
    <Link href={prefix || "/"} className="brand"><span className="brandMark">ERE</span><span>MARKET</span></Link>
    <div className="navLinks"><Link href={`${prefix}/ere`}>{t.knowledge}</Link><Link href={`${prefix}/hoe-het-werkt`}>{t.how}</Link><Link href={`${prefix}/markt`}>{t.market}</Link><Link href={`${prefix}/over-ons`}>{t.about}</Link></div>
    <div className="navRight"><div className="languageSwitch" aria-label="Language"><Link href={nlPath} className={!en ? "active" : ""}>NL</Link><span>/</span><Link href={enPath} className={en ? "active" : ""}>ENG</Link></div><Link href={`${prefix}/ere-check`} className="navCta">{t.cta}</Link></div>
  </nav>;
}
