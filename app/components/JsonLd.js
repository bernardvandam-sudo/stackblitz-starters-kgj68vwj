export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const SITE_URL = "https://eremarket.nl";

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "ERE Market",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description: "ERE Market neemt regie over zoveel mogelijk stappen in de ERE-keten: van technische beoordeling en meetdata tot registratie, inboeking en verkoop, zodat organisaties zonder extra gedoe waarde uit hun elektrische energie kunnen halen.",
  email: "bernardvandam@gmail.com",
  areaServed: "NL",
  knowsAbout: [
    "Emissiereductie-eenheden",
    "ERE",
    "LRE-E",
    "elektrische mobiele machines",
    "intern elektrisch transport",
    "inboeken elektriciteit",
    "REV",
    "MLOEA",
    "MID-meting"
  ]
};

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : SITE_URL
    }))
  };
}
