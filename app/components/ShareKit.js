'use client';
import { useState } from "react";

export default function ShareKit({ locale = "nl", url = "https://eremarket.nl/", title = "ERE Market", compact = false }) {
  const en = locale === "en";
  const message = en
    ? `Your electric fleet consumes valuable energy. Are you capturing the ERE value behind it? ERE Market governs the chain — from technical assessment and measurement to booking and sale. See what your electric fleet could be worth: ${url}`
    : `Uw elektrische vloot verbruikt waardevolle energie. Haalt u ook de ERE-waarde daaruit? ERE Market neemt de keten uit handen — van technische beoordeling en bemeting tot inboeking en verkoop. Bekijk wat uw elektrische vloot kan opleveren: ${url}`;
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (_) {} };
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const email = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
  return <div className={compact ? "shareKit compact" : "shareKit"}>
    <div className="shareLabel">{en ? "SHARE / CAMPAIGN" : "DEEL / CAMPAGNE"}</div>
    {!compact && <p>{message}</p>}
    <div className="shareActions"><a href={linkedIn} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={email}>E-mail ↗</a><button type="button" onClick={copy}>{copied ? (en ? "Copied ✓" : "Gekopieerd ✓") : (en ? "Copy post" : "Kopieer bericht")}</button></div>
  </div>;
}
