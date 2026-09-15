import "./globals.css";
import { JsonLd, organizationSchema, SITE_URL } from "./components/JsonLd";
import LanguageAttribute from "./components/LanguageAttribute";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ERE Market | ERE's uit elektrische mobiliteit",
    template: "%s | ERE Market"
  },
  description: "ERE Market neemt de ERE-keten zoveel mogelijk uit handen: van beoordeling en bemeting tot registratie, inboeking, administratie en verkoop.",
  applicationName: "ERE Market",
  authors: [{ name: "ERE Market" }],
  creator: "ERE Market",
  publisher: "ERE Market",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "ERE Market",
    title: "ERE Market | ERE's uit elektrische mobiliteit",
    description: "Van elektrische machines en meetdata naar ERE's en marktwaarde.",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "ERE Market" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "ERE Market | ERE's uit elektrische mobiliteit",
    description: "Van elektrische machines en meetdata naar ERE's en marktwaarde.",
    images: [`${SITE_URL}/og-image.png`]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return <html lang="nl"><body><LanguageAttribute /><JsonLd data={{ "@context": "https://schema.org", ...organizationSchema }} />{children}</body></html>;
}
