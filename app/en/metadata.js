import { SITE_URL } from "../components/JsonLd";
export function englishMetadata({ title, description, path = "" }) {
  const fullTitle = title.includes("ERE Market") ? title : `${title} | ERE Market`;
  const url = `${SITE_URL}/en${path}`;
  return { title: fullTitle, description, alternates: { canonical: url, languages: { nl: `${SITE_URL}${path || "/"}`, en: url } }, openGraph: { type: "website", locale: "en_GB", url, siteName: "ERE Market", title: fullTitle, description, images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "ERE Market" }] }, twitter: { card: "summary_large_image", title: fullTitle, description, images: [`${SITE_URL}/og-image.png`] }, robots: { index: true, follow: true } };
}
