import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import { notFound } from "next/navigation";
import { ERE_PAGES } from "../data";
import { JsonLd, SITE_URL, breadcrumbSchema } from "../../components/JsonLd";
import { pageMetadata } from "../../metadata";

export function generateStaticParams() {
  return Object.keys(ERE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = ERE_PAGES[slug];
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: `/ere/${slug}` });
}

export default async function ERETopicPage({ params }) {
  const { slug } = await params;
  const page = ERE_PAGES[slug];
  if (!page) notFound();
  const url = `${SITE_URL}/ere/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${url}#article`, headline: page.title, description: page.description, mainEntityOfPage: url, datePublished: "2026-09-14", dateModified: "2026-09-14", author: { "@id": `${SITE_URL}/#organization` }, publisher: { "@id": `${SITE_URL}/#organization` } },
      breadcrumbSchema([{ name: "ERE Market", url: "" }, { name: "ERE kennis", url: "/ere" }, { name: page.title, url: `/ere/${slug}` }])
    ]
  };
  return <main>
    <JsonLd data={jsonLd} />
    <SiteNav />
    <article className="topicPage">
      <section className="knowledgeHero topicHero"><div className="sectionKicker">{page.kicker}</div><h1>{page.title}<br/><em>Wat u moet weten.</em></h1><p>{page.intro}</p><div className="answerBox"><span>KORT ANTWOORD</span><strong>{page.answer}</strong></div></section>
      <section className="section topicBody"><div className="twoCol"><div><div className="sectionKicker">PRAKTISCH</div><h2>Waar kijkt ERE Market<br/><em>naar?</em></h2></div><div><div className="topicList">{page.bullets.map((b,i)=><div key={b}><span>0{i+1}</span><p>{b}</p></div>)}</div><div className="sourceCards"><a href={page.sources[0]} target="_blank" rel="noreferrer"><span>OFFICIËLE BRON</span><strong>Nederlandse Emissieautoriteit · elektriciteit voor vervoer</strong><b>Bekijk de NEa-bron ↗</b></a></div></div></div></section>
      <section className="section darkSection topicCTA"><div className="twoCol"><div><div className="sectionKicker">VOLGENDE STAP</div><h2>Van informatie<br/><em>naar een echte beoordeling.</em></h2></div><div><p>Een inhoudelijke pagina kan uitleggen wat mogelijk is. De ERE Check kijkt vervolgens naar uw eigen machines en draaiuren. Daarna kunt u de technische en juridische aanvraag invullen.</p><Link href={page.next[0]} className="button buttonPrimary">{page.next[1]} →</Link><div className="topicLinks"><Link href="/ere">Alle ERE-onderwerpen →</Link><Link href="/ere-aanvraag">Stap 2: ERE-aanvraag →</Link></div></div></div></section>
    </article>
    <footer className="footer"><div className="brand"><span className="brandMark">ERE</span><span>MARKET</span></div><span>Van energie-expertise naar digitale ketenregie.</span><div className="footerShare"><span>DEEL</span><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`https://wa.me/?text=${encodeURIComponent(page.title + " — " + url)}`} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={`mailto:?subject=${encodeURIComponent(page.title)}&body=${encodeURIComponent(url)}`}>E-mail ↗</a></div><Link href="/ere-check">Doe de ERE Check →</Link></footer>
  </main>;
}
