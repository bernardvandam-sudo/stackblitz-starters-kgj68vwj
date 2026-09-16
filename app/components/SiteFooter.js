import Link from "next/link";
import ShareKit from "./ShareKit";

export default function SiteFooter({ locale = "nl", shareUrl = "https://eremarket.nl/", shareTitle }) {
  const en = locale === "en";
  const prefix = en ? "/en" : "";
  return <footer className="footer">
    <div className="brand"><span className="brandMark">ERE</span><span>MARKET</span></div>
    <span>{en ? "Chain control, all is set by ERE market." : "Ketenregie, alles geregeld door ERE market."}</span>
    <ShareKit locale={locale} url={shareUrl} title={shareTitle} compact />
    <div className="footerLinks">
      <Link href={`${prefix}/ere`}>{en ? "ERE knowledge →" : "ERE kennis →"}</Link>
      <Link href={`${prefix}/hoe-het-werkt`}>{en ? "How it works →" : "Hoe het werkt →"}</Link>
      <Link href={`${prefix}/ere-aanvraag`}>{en ? "Step 2: ERE application →" : "Stap 2: ERE-aanvraag →"}</Link>
    </div>
  </footer>;
}
