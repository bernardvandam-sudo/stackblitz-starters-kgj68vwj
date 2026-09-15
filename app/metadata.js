import { SITE_URL } from "./components/JsonLd";
export function pageMetadata({ title, description, path = "" }) {
  const fullTitle = title.includes("ERE Market") ? title : `${title} | ERE Market`;
  const url = `${SITE_URL}${path}`;
  return { title: fullTitle, description, metadataBase: new URL(SITE_URL), alternates: { canonical: url, languages: { nl: url, en: `${SITE_URL}/en${path}` } }, openGraph: { type: "website", locale: "nl_NL", url, siteName: "ERE Market", title: fullTitle, description, images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "ERE Market — van energie naar ERE" }] }, twitter: { card: "summary_large_image", title: fullTitle, description, images: [`${SITE_URL}/og-image.png`] }, robots: { index: true, follow: true } };
}
