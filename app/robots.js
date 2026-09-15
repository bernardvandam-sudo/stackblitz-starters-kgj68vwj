import { SITE_URL } from "./components/JsonLd";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
